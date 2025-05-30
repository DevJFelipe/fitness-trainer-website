// src/components/auth/Register.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../layout/Background'
import Navbar from '../layout/Navbar'
import backgroundImage from '../../assets/background-image.png'
import { authService } from '../../services'

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    fechaNacimiento: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validaciones básicas
    if (formData.contrasena !== formData.confirmarContrasena) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (formData.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      // Verificar si el email ya existe
      const emailAvailable = await authService.isEmailAvailable(formData.correo)
      if (!emailAvailable) {
        setError('Este correo electrónico ya está registrado')
        setLoading(false)
        return
      }

      const result = await authService.register({
        nombre: formData.nombre,
        correo: formData.correo,
        contrasena: formData.contrasena, // En producción, hashear antes de enviar
        fechaNacimiento: formData.fechaNacimiento,
        rol: 11 // Rol de usuario normal (ID 11 en la tabla rol)
      })
      
      if (result.success) {
        setSuccess('¡Registro exitoso! Redirigiendo al login...')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(result.error)
      }    } catch {
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
      </div>

      {/* Formulario centrado */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                Nombre Completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="correo" className="block text-sm font-medium mb-1">
                Correo Electrónico
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium mb-1">
                Fecha de Nacimiento
              </label>
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="contrasena" className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                id="contrasena"
                name="contrasena"
                type="password"
                value={formData.contrasena}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmarContrasena" className="block text-sm font-medium mb-1">
                Confirmar Contraseña
              </label>
              <input
                id="confirmarContrasena"
                name="confirmarContrasena"
                type="password"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff6600] text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>

            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-[#ff6600] hover:underline"
                  disabled={loading}
                >
                  Inicia sesión aquí
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
