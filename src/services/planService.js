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
  },

  // Obtener planes creados por un entrenador
  async getTrainerPlans(trainerId) {
    try {
      const { data, error } = await supabase
        .from('plan')
        .select(`
          *,
          plan_precio(*)
        `)
        .eq('id_usuario', trainerId)
        .order('fecha_inicio', { ascending: false })

      if (error) throw error
      return { success: true, plans: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },  // Asignar plan a usuario
  async assignPlanToUser(planId, userId) {
    try {
      // Obtener el plan original del entrenador
      const { data: originalPlan, error: fetchError } = await supabase
        .from('plan')
        .select('*')
        .eq('id_plan', planId)
        .single()

      if (fetchError) throw fetchError

      // Crear un nuevo plan para el usuario basado en el plan del entrenador
      const { data, error } = await supabase
        .from('plan')
        .insert({
          id_usuario: userId, // Usuario al que se asigna el plan
          tipo: originalPlan.tipo,
          nivel: originalPlan.nivel,
          frecuencia: originalPlan.frecuencia,
          descripcion: originalPlan.descripcion,
          duracion_sesion: originalPlan.duracion_sesion,
          activo: true,
          fecha_inicio: new Date().toISOString().split('T')[0], // Fecha actual
          fecha_fin: null // Se puede establecer más tarde
        })
        .select()

      if (error) throw error
      return { success: true, assignment: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
