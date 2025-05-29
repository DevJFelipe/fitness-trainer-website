// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services'

const AuthContext = createContext()

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage al cargar la app
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password)
      if (result.success) {
        setUser(result.user)
      }
      return result
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const result = await authService.register(userData)
      return result
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.rol?.nombre_rol === 'admin'
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth }
