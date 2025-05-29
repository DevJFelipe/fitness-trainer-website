// src/services/eventoService.js
import { supabase } from '../config/supabaseClient'

export const eventoService = {
  // Obtener todos los eventos
  async getAllEventos() {
    try {
      const { data, error } = await supabase
        .from('evento_webinar')
        .select('*')
        .order('fecha', { ascending: true })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener eventos próximos
  async getEventosProximos() {
    try {
      const now = new Date().toISOString()
      const { data, error } = await supabase
        .from('evento_webinar')
        .select('*')
        .gte('fecha', now)
        .order('fecha', { ascending: true })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener evento por ID
  async getEventoById(id) {
    try {
      const { data, error } = await supabase
        .from('evento_webinar')
        .select('*')
        .eq('id_evento', id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear nuevo evento
  async createEvento(eventoData) {
    try {
      const { data, error } = await supabase
        .from('evento_webinar')
        .insert([eventoData])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Inscribir usuario a evento
  async inscribirUsuarioEvento(idUsuario, idEvento) {
    try {
      const { data, error } = await supabase
        .from('usuario_evento_webinar')
        .insert([{
          id_usuario: idUsuario,
          id_evento: idEvento,
          fecha_inscripcion: new Date().toISOString()
        }])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener eventos de un usuario
  async getEventosUsuario(idUsuario) {
    try {
      const { data, error } = await supabase
        .from('usuario_evento_webinar')
        .select(`
          *,
          evento_webinar!inner(*)
        `)
        .eq('id_usuario', idUsuario)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Verificar si usuario está inscrito en evento
  async isUsuarioInscrito(idUsuario, idEvento) {
    try {
      const { data, error } = await supabase
        .from('usuario_evento_webinar')
        .select('*')
        .eq('id_usuario', idUsuario)
        .eq('id_evento', idEvento)

      if (error) throw error
      return { success: true, inscrito: data.length > 0 }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
