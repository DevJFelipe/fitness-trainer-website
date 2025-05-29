// src/services/contenidoService.js
import { supabase } from '../config/supabaseClient'

export const contenidoService = {
  // Obtener todos los contenidos
  async getAllContenidos() {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)
        .order('fecha_publicacion', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener contenidos públicos
  async getContenidosPublicos() {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)
        .eq('visibilidad', 'publico')
        .order('fecha_publicacion', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener contenido por ID
  async getContenidoById(id) {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)
        .eq('id_contenido', id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener contenidos por tipo
  async getContenidosByTipo(tipo) {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)
        .eq('tipo', tipo)
        .eq('visibilidad', 'publico')
        .order('fecha_publicacion', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener contenidos por tema
  async getContenidosByTema(tema) {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)
        .eq('tema', tema)
        .eq('visibilidad', 'publico')
        .order('fecha_publicacion', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear nuevo contenido
  async createContenido(contenidoData) {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .insert([contenidoData])
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

  // Actualizar contenido
  async updateContenido(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .update(updateData)
        .eq('id_contenido', id)
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

  // Eliminar contenido
  async deleteContenido(id) {
    try {
      const { error } = await supabase
        .from('contenido')
        .delete()
        .eq('id_contenido', id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Buscar contenidos
  async searchContenidos(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .select(`
          *,
          usuario!inner(nombre, correo)
        `)
        .or(`titulo.ilike.%${searchTerm}%,tema.ilike.%${searchTerm}%`)
        .eq('visibilidad', 'publico')
        .order('fecha_publicacion', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
