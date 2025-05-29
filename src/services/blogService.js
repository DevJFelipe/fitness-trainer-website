// src/services/blogService.js
import { supabase } from '../config/supabaseClient'

export const blogService = {
  // Obtener todos los contenidos de tipo blog
  async getAllPosts() {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .select(`
          *,
          autor!inner(nombre)
        `)
        .eq('tipo', 'blog')
        .eq('visibilidad', 'publico')
        .order('fecha_publicacion', { ascending: false })

      if (error) throw error
      return { success: true, posts: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener un post por ID
  async getPostById(id) {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .select(`
          *,
          autor!inner(nombre)
        `)
        .eq('id_contenido', id)
        .eq('tipo', 'blog')
        .single()

      if (error) throw error
      return { success: true, post: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener posts por tema/categoría
  async getPostsByCategory(tema) {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .select(`
          *,
          autor!inner(nombre)
        `)
        .eq('tipo', 'blog')
        .eq('tema', tema)
        .eq('visibilidad', 'publico')
        .order('fecha_publicacion', { ascending: false })

      if (error) throw error
      return { success: true, posts: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear nuevo post (para administradores)
  async createPost(postData) {
    try {
      const { data, error } = await supabase
        .from('contenido')
        .insert([
          {
            tipo: 'blog',
            titulo: postData.titulo,
            visibilidad: postData.visibilidad || 'publico',
            autor: postData.autor,
            fecha_publicacion: new Date().toISOString(),
            url_recurso: postData.url_recurso,
            tema: postData.tema
          }
        ])
        .select()

      if (error) throw error
      return { success: true, post: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
