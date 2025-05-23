import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Background from '../layout/Background'
import Navbar from '../layout/Navbar'
import backgroundImage from '../../assets/background-image.png'
import { supabase } from '../../config/supabaseClient'

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    fecha_nacimiento: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }
    
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido'
    }
    
    if (!formData.fecha_nacimiento) {
      newErrors.fecha_nacimiento = 'La fecha de nacimiento es requerida'
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setErrors({})

    try {
      // 1. Crear usuario en Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nombre: formData.nombre,
            apellido: formData.apellido,
          }
        }
      })

      if (signUpError) {
        setErrors({ submit: signUpError.message })
        setIsLoading(false)
        return
      }

      // 2. Insertar datos adicionales en la tabla Usuario
      // data.user puede ser null si requiere verificación de email, así que usamos data.user?.id o data.session?.user.id
      const userId = data.user?.id || data.session?.user.id
      if (!userId) {
        setErrors({ submit: 'No se pudo obtener el ID del usuario.' })
        setIsLoading(false)
        return
      }

      const { error: insertError } = await supabase
        .from('Usuario')
        .insert([{
          id_usuario: userId,
          nombre: formData.nombre,
          correo: formData.email,
          fecha_nacimiento: formData.fecha_nacimiento,
          fecha_registro: new Date().toISOString(),
          rol: 2, // 2 = usuario normal (ajusta según tu tabla de roles)
          // Puedes agregar más campos aquí según tu modelo, por ejemplo:
          // apellido: formData.apellido,
        }])

      if (insertError) {
        setErrors({ submit: insertError.message })
        setIsLoading(false)
        return
      }

      // Redirigir al login
      navigate('/login')
    } catch {
      setErrors({ submit: 'Error inesperado. Intenta nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <Background image={backgroundImage} />

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
          
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] ${
                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium mb-1">
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] ${
                    errors.apellido ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.apellido && (
                  <p className="mt-1 text-sm text-red-600">{errors.apellido}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="fecha_nacimiento" className="block text-sm font-medium mb-1">
                Fecha de nacimiento
              </label>
              <input
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                type="date"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] ${
                  errors.fecha_nacimiento ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.fecha_nacimiento && (
                <p className="mt-1 text-sm text-red-600">{errors.fecha_nacimiento}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#ff6600] text-white font-bold py-2 rounded-lg transition
                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'}`}
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-[#ff6600] hover:underline">
                Iniciar Sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
} 