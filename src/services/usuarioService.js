// src/services/usuarioService.js
import { supabase } from '../config/supabaseClient'

export const usuarioService = {  // Obtener todos los usuarios
  async getAllUsuarios() {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select(`
          *,
          rol!inner(nombre_rol, descripcion)
        `)
        .order('fecha_registro', { ascending: false })

      if (error) throw error
      return { success: true, users: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener usuario por ID
  async getUsuarioById(id) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select(`
          *,
          rol!inner(nombre_rol, descripcion)
        `)
        .eq('id_usuario', id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Actualizar perfil de usuario
  async updateUsuario(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .update(updateData)
        .eq('id_usuario', id)
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Eliminar usuario
  async deleteUsuario(id) {
    try {
      const { error } = await supabase
        .from('usuario')
        .delete()
        .eq('id_usuario', id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Buscar usuarios por nombre o correo
  async searchUsuarios(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select(`
          *,
          rol!inner(nombre_rol, descripcion)
        `)
        .or(`nombre.ilike.%${searchTerm}%,correo.ilike.%${searchTerm}%`)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },  // Actualizar rol de usuario (solo para administradores)
  async updateUserRole(userId, newRoleId) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .update({ rol: newRoleId })
        .eq('id_usuario', userId)
        .select(`
          *,
          rol!inner(nombre_rol, descripcion)
        `)

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Obtener estadísticas de usuarios por rol
  async getUserStats() {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select(`
          id_usuario,
          rol!inner(nombre_rol)
        `)

      if (error) throw error
      
      const stats = data.reduce((acc, user) => {
        const roleName = user.rol.nombre_rol
        acc[roleName] = (acc[roleName] || 0) + 1
        return acc
      }, {})

      return { success: true, stats }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
