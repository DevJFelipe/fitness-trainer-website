// src/services/testimonioService.js
import { supabase } from '../config/supabaseClient'

export const testimonioService = {
  // Obtener todos los testimonios
  async getAllTestimonios() {
    try {
      const { data, error } = await supabase
        .from('testimonio')
        .select(`
          *,
          usuario!inner(nombre)
        `)
        .order('fecha', { ascending: false })

      if (error) throw error
      return { success: true, testimonios: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear nuevo testimonio
  async createTestimonio(testimonioData) {
    try {
      const { data, error } = await supabase
        .from('testimonio')
        .insert([
          {
            id_usuario: testimonioData.id_usuario,
            contenido: testimonioData.contenido
          }
        ])
        .select()

      if (error) throw error
      return { success: true, testimonio: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener testimonios de un usuario
  async getUserTestimonios(userId) {
    try {
      const { data, error } = await supabase
        .from('testimonio')
        .select('*')
        .eq('id_usuario', userId)
        .order('fecha', { ascending: false })

      if (error) throw error
      return { success: true, testimonios: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
