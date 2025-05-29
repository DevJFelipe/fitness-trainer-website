// src/services/rolService.js
import { supabase } from '../config/supabaseClient'

export const rolService = {
  // Obtener todos los roles
  async getAllRoles() {
    try {
      const { data, error } = await supabase
        .from('rol')
        .select('*')
        .order('id_rol', { ascending: true })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener rol por ID
  async getRolById(id) {
    try {
      const { data, error } = await supabase
        .from('rol')
        .select('*')
        .eq('id_rol', id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear nuevo rol
  async createRol(rolData) {
    try {
      const { data, error } = await supabase
        .from('rol')
        .insert([rolData])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
