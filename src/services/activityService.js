// src/services/activityService.js
import { supabase } from '../config/supabaseClient'

export const activityService = {
  // Registrar cambio de rol de usuario
  async logRoleChange(adminId, userId, oldRole, newRole) {
    try {
      const { data, error } = await supabase
        .from('activity_log')
        .insert([
          {
            admin_id: adminId,
            user_id: userId,
            action: 'role_change',
            description: `Role changed from ${oldRole} to ${newRole}`,
            timestamp: new Date().toISOString()
          }
        ])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      // Si la tabla no existe, simplemente continuamos sin error
      console.warn('Activity log not available:', error.message)
      return { success: true, data: null }
    }
  },

  // Obtener historial de actividades
  async getActivityLog(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('activity_log')
        .select(`
          *,
          admin:admin_id(nombre),
          user:user_id(nombre)
        `)
        .order('timestamp', { ascending: false })
        .limit(limit)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Registrar acción administrativa general
  async logAdminAction(adminId, action, description, targetId = null) {
    try {
      const { data, error } = await supabase
        .from('activity_log')
        .insert([
          {
            admin_id: adminId,
            user_id: targetId,
            action: action,
            description: description,
            timestamp: new Date().toISOString()
          }
        ])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      console.warn('Activity log not available:', error.message)
      return { success: true, data: null }
    }
  }
}