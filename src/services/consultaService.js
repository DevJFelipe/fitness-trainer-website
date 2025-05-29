// src/services/consultaService.js
import { supabase } from '../config/supabaseClient'

export const consultaService = {
  // Obtener todas las consultas
  async getAllConsultas() {
    try {
      const { data, error } = await supabase
        .from('consulta_personalizada')
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)
        .order('fecha', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener consultas de un usuario
  async getConsultasUsuario(idUsuario) {
    try {
      const { data, error } = await supabase
        .from('consulta_personalizada')
        .select('*')
        .eq('id_usuario', idUsuario)
        .order('fecha', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear nueva consulta
  async createConsulta(consultaData) {
    try {
      const { data, error } = await supabase
        .from('consulta_personalizada')
        .insert([consultaData])
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Actualizar estado de consulta
  async updateConsulta(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('consulta_personalizada')
        .update(updateData)
        .eq('id_consulta', id)
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener consultas por estado
  async getConsultasByEstado(estado) {
    try {
      const { data, error } = await supabase
        .from('consulta_personalizada')
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)
        .eq('estado', estado)
        .order('fecha', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Eliminar consulta
  async deleteConsulta(id) {
    try {
      const { error } = await supabase
        .from('consulta_personalizada')
        .delete()
        .eq('id_consulta', id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
