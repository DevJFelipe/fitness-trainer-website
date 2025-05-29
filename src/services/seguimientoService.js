// src/services/seguimientoService.js
import { supabase } from '../config/supabaseClient'

export const seguimientoService = {
  // Obtener seguimientos de un usuario
  async getSeguimientosUsuario(idUsuario) {
    try {
      const { data, error } = await supabase
        .from('seguimiento')
        .select('*')
        .eq('id_usuario', idUsuario)
        .order('fecha', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear nuevo seguimiento
  async createSeguimiento(seguimientoData) {
    try {
      const { data, error } = await supabase
        .from('seguimiento')
        .insert([seguimientoData])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener último seguimiento de un usuario
  async getUltimoSeguimiento(idUsuario) {
    try {
      const { data, error } = await supabase
        .from('seguimiento')
        .select('*')
        .eq('id_usuario', idUsuario)
        .order('fecha', { ascending: false })
        .limit(1)

      if (error) throw error
      return { success: true, data: data[0] || null }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Actualizar seguimiento
  async updateSeguimiento(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('seguimiento')
        .update(updateData)
        .eq('id_seguimiento', id)
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Eliminar seguimiento
  async deleteSeguimiento(id) {
    try {
      const { error } = await supabase
        .from('seguimiento')
        .delete()
        .eq('id_seguimiento', id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener progreso de peso en rango de fechas
  async getProgresoWeight(idUsuario, fechaInicio, fechaFin) {
    try {
      const { data, error } = await supabase
        .from('seguimiento')
        .select('fecha, peso')
        .eq('id_usuario', idUsuario)
        .not('peso', 'is', null)
        .gte('fecha', fechaInicio)
        .lte('fecha', fechaFin)
        .order('fecha', { ascending: true })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
