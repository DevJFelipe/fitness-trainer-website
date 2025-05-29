// src/services/authService.js
import { supabase } from '../config/supabaseClient'

export const authService = {  // Registrar nuevo usuario
  async register(userData) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .insert([
          {
            nombre: userData.nombre,
            correo: userData.correo,
            contrasena: userData.contrasena, // En producción, deberías hashear esto
            fecha_nacimiento: userData.fechaNacimiento,
            rol: userData.rol || 11 // 11 es el ID del rol 'usuario' según tu base de datos
          }
        ])
        .select()

      if (error) throw error
      return { success: true, user: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Iniciar sesión
  async login(correo, contrasena) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select(`
          *,
          rol!inner(nombre_rol, descripcion)
        `)
        .eq('correo', correo)
        .eq('contrasena', contrasena) // En producción, compararías el hash
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return { success: false, error: 'Credenciales incorrectas' }
        }
        throw error
      }

      // Guardar usuario en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(data))
      
      return { success: true, user: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Cerrar sesión
  logout() {
    localStorage.removeItem('user')
    return { success: true }
  },
  // Obtener usuario actual desde localStorage
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch {
      return null
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    return this.getCurrentUser() !== null
  },

  // Verificar email disponible
  async isEmailAvailable(correo) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select('correo')
        .eq('correo', correo)

      if (error) throw error
      return data.length === 0    } catch {
      console.error('Error checking email')
      return false
    }
  }
}
