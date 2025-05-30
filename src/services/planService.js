// src/services/planService.js
import { supabase } from '../config/supabaseClient'

export const planService = {
  // Obtener todos los planes disponibles
  async getAllPlans() {
    try {
      const { data, error } = await supabase
        .from('plan')
        .select(`
          *,
          plan_precio(*),
          usuario!inner(nombre)
        `)
        .eq('activo', true)
        .order('fecha_inicio', { ascending: false })

      if (error) throw error
      return { success: true, plans: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener planes por tipo
  async getPlansByType(tipo) {
    try {
      const { data, error } = await supabase
        .from('plan')
        .select(`
          *,
          plan_precio(*),
          usuario!inner(nombre)
        `)
        .eq('tipo', tipo)
        .eq('activo', true)
        .order('fecha_inicio', { ascending: false })

      if (error) throw error
      return { success: true, plans: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener plan por ID
  async getPlanById(id) {
    try {
      const { data, error } = await supabase
        .from('plan')
        .select(`
          *,
          plan_precio(*),
          usuario!inner(nombre)
        `)
        .eq('id_plan', id)
        .single()

      if (error) throw error
      return { success: true, plan: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener planes de un usuario específico
  async getUserPlans(userId) {
    try {
      const { data, error } = await supabase
        .from('plan')
        .select(`
          *,
          plan_precio(*)
        `)
        .eq('id_usuario', userId)
        .order('fecha_inicio', { ascending: false })

      if (error) throw error
      return { success: true, plans: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear nuevo plan
  async createPlan(planData) {
    try {
      const { data, error } = await supabase
        .from('plan')
        .insert([
          {
            id_usuario: planData.id_usuario,
            tipo: planData.tipo,
            nivel: planData.nivel,
            frecuencia: planData.frecuencia,
            fecha_inicio: planData.fecha_inicio,
            fecha_fin: planData.fecha_fin
          }
        ])
        .select()

      if (error) throw error
      return { success: true, plan: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },  // Crear plan para entrenador (con campos adicionales)
  async createTrainerPlan(planData) {
    try {
      // 1. Crear el plan principal
      const { data: planResult, error: planError } = await supabase
        .from('plan')
        .insert([
          {
            id_usuario: planData.id_usuario,
            tipo: planData.tipo,
            nivel: planData.nivel,
            frecuencia: planData.frecuencia,
            fecha_inicio: planData.fecha_inicio,
            fecha_fin: planData.fecha_fin,
            descripcion: planData.descripcion,
            duracion_sesion: planData.duracion_sesion || 60,
            activo: planData.activo !== false
          }
        ])
        .select()

      if (planError) throw planError

      const createdPlan = planResult[0]

      // 2. Si se proporcionan datos de precio, crear el registro en plan_precio
      if (planData.precio_cop || planData.precio_usd) {
        const { error: priceError } = await supabase
          .from('plan_precio')
          .insert([
            {
              id_plan: createdPlan.id_plan,
              duracion: planData.duracion || 30, // duracion en días
              precio_cop: planData.precio_cop || 0,
              precio_usd: planData.precio_usd || 0,
              incluye_consulta: planData.incluye_consulta || false,
              acceso_premium: planData.acceso_premium || false
            }
          ])

        if (priceError) {
          console.warn('Error creando precio del plan:', priceError.message)
          // No lanzamos error aquí para que el plan se cree aunque falle el precio
        }
      }

      return { success: true, plan: createdPlan }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear precio para un plan
  async createPlanPrice(priceData) {
    try {
      const { data, error } = await supabase
        .from('plan_precio')
        .insert([
          {
            id_plan: priceData.id_plan,
            precio: priceData.precio,
            moneda: priceData.moneda || 'COP'
          }
        ])
        .select()

      if (error) throw error
      return { success: true, price: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },  // Obtener planes creados por un entrenador (plantillas)
  async getTrainerPlans(trainerId) {
    try {
      // Obtener el usuario entrenador para verificar que es entrenador
      const { data: trainerData, error: trainerError } = await supabase
        .from('usuario')
        .select('rol')
        .eq('id_usuario', trainerId)
        .single()

      if (trainerError) throw trainerError
      
      // Verificar que el usuario es entrenador (rol = 12)
      if (trainerData.rol !== 12) {
        throw new Error('El usuario no es un entrenador')
      }

      // Obtener planes creados por el entrenador
      const { data, error } = await supabase
        .from('plan')
        .select(`
          *,
          plan_precio(*)
        `)
        .eq('id_usuario', trainerId) // Planes donde el entrenador es el "usuario"
        .order('fecha_inicio', { ascending: false })

      if (error) throw error
      return { success: true, plans: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },  // Obtener todos los planes asignados por un entrenador
  async getTrainerAssignedPlans(trainerId) {
    try {
      console.log('🔍 getTrainerAssignedPlans - Trainer ID:', trainerId)
      
      // Obtener información del entrenador para identificar sus planes
      const { data: trainerData, error: trainerError } = await supabase
        .from('usuario')
        .select('nombre')
        .eq('id_usuario', trainerId)
        .single()

      if (trainerError) throw trainerError
      
      console.log('🔍 Trainer data:', trainerData)
        // Primero, verificar qué planes existen en la base de datos
      const { data: allPlans, error: _allPlansError } = await supabase
        .from('plan')
        .select('*')
        .order('fecha_inicio', { ascending: false })
      
      console.log('🔍 All plans in database:', allPlans?.length || 0)
      console.log('🔍 Plans with descriptions:', allPlans?.filter(p => p.descripcion) || [])
      console.log('🔍 Plans containing assignment pattern:', 
        allPlans?.filter(p => p.descripcion && p.descripcion.includes('[Asignado por:')) || []
      )
        // Crear patrón de búsqueda más flexible
      const searchPattern = `%[Asignado por: ${trainerData.nombre}]%`
      console.log('🔍 Search pattern:', searchPattern)
        // NUEVO ENFOQUE: Buscar planes que contengan el patrón específico de asignación
      // en la descripción Y que NO pertenezcan al entrenador (id_usuario != trainerId)
      const { data: assignedPlans, error: assignedError } = await supabase
        .from('plan')
        .select(`
          *,
          usuario:id_usuario(
            id_usuario, 
            nombre, 
            correo,
            rol(nombre_rol)
          )
        `)
        .neq('id_usuario', trainerId) // NO son del entrenador
        .ilike('descripcion', searchPattern) // Contienen el patrón de asignación
        .order('fecha_inicio', { ascending: false })

      console.log('🔍 Assigned plans query result:', { assignedPlans, assignedError })
      
      if (assignedError) {
        console.error('🔍 Error querying assigned plans:', assignedError)
        return { success: false, error: assignedError.message }
      }
        console.log('🔍 Found assigned plans:', assignedPlans?.length || 0)
      console.log('🔍 Assigned plans details:', assignedPlans)
      
      // Verificar cada plan encontrado
      if (assignedPlans && assignedPlans.length > 0) {
        assignedPlans.forEach((plan, index) => {
          console.log(`🔍 Plan ${index + 1}:`, {
            id: plan.id_plan,
            tipo: plan.tipo,
            id_usuario: plan.id_usuario,
            descripcion: plan.descripcion,
            usuario: plan.usuario
          })
        })
      }
      
      return { success: true, plans: assignedPlans || [] }
    } catch (error) {
      console.error('🔍 Error in getTrainerAssignedPlans:', error)
      return { success: false, error: error.message }
    }
  },
  // Método alternativo simple para debug - obtener planes que no son del entrenador
  async getTrainerAssignedPlansSimple(trainerId) {
    try {
      console.log('🔍 getTrainerAssignedPlansSimple - Trainer ID:', trainerId)
      
      // Obtener TODOS los planes que NO pertenecen al entrenador
      const { data: allNonTrainerPlans, error } = await supabase
        .from('plan')
        .select(`
          *,
          usuario:id_usuario(
            id_usuario, 
            nombre, 
            correo
          )
        `)
        .neq('id_usuario', trainerId)
        .order('fecha_inicio', { ascending: false })

      if (error) {
        console.error('🔍 Error in simple query:', error)
        return { success: false, error: error.message }
      }
      
      console.log('🔍 All non-trainer plans:', allNonTrainerPlans?.length || 0)
      console.log('🔍 Non-trainer plans details:', allNonTrainerPlans)
      
      return { success: true, plans: allNonTrainerPlans || [] }
    } catch (error) {
      console.error('🔍 Error in getTrainerAssignedPlansSimple:', error)
      return { success: false, error: error.message }
    }
  },// Asignar plan a usuario
  async assignPlanToUser(planId, userId) {
    try {
      console.log('🔍 assignPlanToUser - Plan ID:', planId, 'User ID:', userId)
      
      // Obtener el plan original del entrenador
      const { data: originalPlan, error: fetchError } = await supabase
        .from('plan')
        .select('*')
        .eq('id_plan', planId)
        .single()

      if (fetchError) throw fetchError
      console.log('🔍 Original plan:', originalPlan)

      // Obtener información del entrenador
      const { data: trainerData, error: trainerError } = await supabase
        .from('usuario')
        .select('nombre')
        .eq('id_usuario', originalPlan.id_usuario)
        .single()

      if (trainerError) throw trainerError
      console.log('🔍 Trainer data:', trainerData)      // Calcular fecha de fin (30 días desde hoy por defecto)
      const fechaInicio = new Date();
      const fechaFin = new Date();
      fechaFin.setDate(fechaFin.getDate() + 30);const newPlanData = {
        id_usuario: userId, // Usuario al que se asigna el plan
        tipo: originalPlan.tipo,
        nivel: originalPlan.nivel,
        frecuencia: originalPlan.frecuencia,
        descripcion: `${originalPlan.descripcion || ''} [Asignado por: ${trainerData.nombre}]`.trim(),
        duracion_sesion: originalPlan.duracion_sesion,
        activo: true,
        fecha_inicio: fechaInicio.toISOString().split('T')[0],
        fecha_fin: fechaFin.toISOString().split('T')[0]
      }
      
      console.log('🔍 New plan data to insert:', newPlanData)

      // Crear un nuevo plan para el usuario basado en el plan del entrenador
      const { data, error } = await supabase
        .from('plan')
        .insert(newPlanData)
        .select()

      if (error) throw error
      console.log('🔍 Assigned plan created:', data[0])
      
      // También copiar los precios si existen
      const { data: planPrecio } = await supabase
        .from('plan_precio')
        .select('*')
        .eq('id_plan', planId)
        .single()

      if (planPrecio) {
        await supabase
          .from('plan_precio')
          .insert({
            id_plan: data[0].id_plan,
            duracion: planPrecio.duracion,
            precio_cop: planPrecio.precio_cop,
            precio_usd: planPrecio.precio_usd,
            incluye_consulta: planPrecio.incluye_consulta,
            acceso_premium: planPrecio.acceso_premium
          })
      }      return { success: true, assignment: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Eliminar plan (plantilla del entrenador)
  async deletePlan(planId, trainerId) {
    try {
      console.log('🗑️ Deleting plan:', planId, 'by trainer:', trainerId)

      // Verificar que el plan pertenece al entrenador
      const { data: plan, error: fetchError } = await supabase
        .from('plan')
        .select('id_plan, id_usuario, tipo, nivel')
        .eq('id_plan', planId)
        .eq('id_usuario', trainerId)
        .single()

      if (fetchError || !plan) {
        return { success: false, error: 'Plan no encontrado o no autorizado' }
      }

      // Eliminar primero los precios asociados
      const { error: priceError } = await supabase
        .from('plan_precio')
        .delete()
        .eq('id_plan', planId)

      if (priceError) {
        console.error('Error deleting plan prices:', priceError)
      }

      // Eliminar el plan
      const { error: deleteError } = await supabase
        .from('plan')
        .delete()
        .eq('id_plan', planId)
        .eq('id_usuario', trainerId)

      if (deleteError) {
        return { success: false, error: deleteError.message }
      }

      console.log('✅ Plan deleted successfully')
      return { success: true, message: 'Plan eliminado correctamente' }
    } catch (error) {
      console.error('Error in deletePlan:', error)
      return { success: false, error: error.message }
    }
  },

  // Eliminar asignación de plan (plan asignado a usuario)
  async removeAssignment(planId, trainerId) {
    try {
      console.log('🗑️ Removing assignment:', planId, 'by trainer:', trainerId)

      // Obtener información del entrenador para verificar la asignación
      const { data: trainerData, error: trainerError } = await supabase
        .from('usuario')
        .select('nombre')
        .eq('id_usuario', trainerId)
        .single()

      if (trainerError || !trainerData) {
        return { success: false, error: 'Entrenador no encontrado' }
      }

      // Verificar que el plan fue asignado por este entrenador
      const { data: plan, error: fetchError } = await supabase
        .from('plan')
        .select('id_plan, id_usuario, descripcion, tipo, nivel')
        .eq('id_plan', planId)
        .ilike('descripcion', `%[Asignado por: ${trainerData.nombre}]%`)
        .single()

      if (fetchError || !plan) {
        return { success: false, error: 'Plan asignado no encontrado o no autorizado' }
      }

      // Eliminar primero los precios asociados
      const { error: priceError } = await supabase
        .from('plan_precio')
        .delete()
        .eq('id_plan', planId)

      if (priceError) {
        console.error('Error deleting assignment prices:', priceError)
      }

      // Eliminar el plan asignado
      const { error: deleteError } = await supabase
        .from('plan')
        .delete()
        .eq('id_plan', planId)

      if (deleteError) {
        return { success: false, error: deleteError.message }
      }

      console.log('✅ Assignment removed successfully')
      return { 
        success: true, 
        message: 'Asignación eliminada correctamente',
        removedUserId: plan.id_usuario
      }    } catch (error) {
      console.error('Error in removeAssignment:', error)
      return { success: false, error: error.message }
    }
  }
}
