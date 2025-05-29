// src/services/planService.js
import { supabase } from '../config/supabaseClient'

export const planService = {
  // Obtener todos los planes disponibles
  async getAllPlanes() {
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
      return { success: true, data: data }
    } catch (error) {
      return { success: false, error: error.message }
    }  },

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
  }
}
