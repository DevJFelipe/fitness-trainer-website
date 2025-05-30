// src/components/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import Background from '../layout/Background'
import Navbar from '../layout/Navbar'
import backgroundImage from '../../assets/background-image.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(email, password)
        if (result.success) {
        console.log('Usuario autenticado:', result.user)
        // Redirigir según el rol del usuario
        const userRole = result.user.rol.nombre_rol
        
        switch (userRole) {
          case 'admin':
            navigate('/admin')
            break
          case 'entrenador':
            navigate('/trainer')
            break
          case 'usuario':
          default:
            navigate('/blog')
            break
        }
      } else {
        setError(result.error)
      }} catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Fondo */}
      <Background image={backgroundImage} />

      {/* Navbar siempre al top, ancho full */}
      <div className="relative z-10">
        <Navbar />
      </div>      {/* Formulario centrado */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent text-sm sm:text-base"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent text-sm sm:text-base"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff6600] text-white font-bold py-2.5 sm:py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>

            <div className="text-center mt-4">
              <span className="text-xs sm:text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-[#ff6600] hover:underline"
                  disabled={loading}
                >
                  Regístrate aquí
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
