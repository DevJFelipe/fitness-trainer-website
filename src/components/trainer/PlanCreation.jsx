// src/components/trainer/PlanCreation.jsx
import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { planService } from '../../services'
import { 
  PlusCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function PlanCreation({ onPlanCreated }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
    tipo: '',
    nivel: '',
    frecuencia: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
    duracion_sesion: 60,
    // Campos de precio
    precio_cop: '',
    precio_usd: '',
    duracion: 30,
    incluye_consulta: false,
    acceso_premium: false
  })

  const planTypes = [
    { value: 'fuerza', label: 'Entrenamiento de Fuerza' },
    { value: 'cardio', label: 'Entrenamiento Cardiovascular' },
    { value: 'hiit', label: 'HIIT (Alta Intensidad)' },
    { value: 'funcional', label: 'Entrenamiento Funcional' },
    { value: 'yoga', label: 'Yoga y Flexibilidad' },
    { value: 'mixto', label: 'Entrenamiento Mixto' }
  ]

  const levels = [
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' }
  ]

  const frequencies = [
    { value: '2', label: '2 veces por semana' },
    { value: '3', label: '3 veces por semana' },
    { value: '4', label: '4 veces por semana' },
    { value: '5', label: '5 veces por semana' },
    { value: '6', label: '6 veces por semana' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      // Crear el plan
      const planResult = await planService.createTrainerPlan({
        id_usuario: user.id_usuario,
        tipo: formData.tipo,
        nivel: formData.nivel,
        frecuencia: parseInt(formData.frecuencia),
        fecha_inicio: formData.fecha_inicio,
        fecha_fin: formData.fecha_fin,
        descripcion: formData.descripcion,
        duracion_sesion: parseInt(formData.duracion_sesion) || 60,
        activo: true
      })

      if (!planResult.success) {
        throw new Error(planResult.error)
      }

      // Si se especificó un precio, crear el registro en plan_precio
      if (formData.precio && formData.precio > 0) {
        const priceResult = await planService.createPlanPrice({
          id_plan: planResult.plan.id_plan,
          precio: parseFloat(formData.precio),
          moneda: 'COP'
        })

        if (!priceResult.success) {
          console.warn('Error creando precio del plan:', priceResult.error)
        }
      }

      setSuccessMessage('Plan creado exitosamente')
      setFormData({
        tipo: '',
        nivel: '',
        frecuencia: '',
        fecha_inicio: '',
        fecha_fin: '',
        descripcion: '',
        precio: '',
        duracion_sesion: ''
      })

      if (onPlanCreated) {
        onPlanCreated()
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)

    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Crear Nuevo Plan</h2>
        <p className="text-gray-600">Diseña un plan de entrenamiento personalizado</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Información del Plan</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-green-800">{successMessage}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-800">{errorMessage}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Plan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Plan *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              >
                <option value="">Seleccionar tipo</option>
                {planTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Nivel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel *
              </label>
              <select
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              >
                <option value="">Seleccionar nivel</option>
                {levels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Frecuencia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frecuencia *
              </label>
              <select
                name="frecuencia"
                value={formData.frecuencia}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              >
                <option value="">Seleccionar frecuencia</option>
                {frequencies.map(freq => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Duración de Sesión */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración por Sesión (minutos)
              </label>
              <input
                type="number"
                name="duracion_sesion"
                value={formData.duracion_sesion}
                onChange={handleChange}
                placeholder="60"
                min="15"
                max="180"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              />
            </div>

            {/* Fecha de Inicio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              />
            </div>

            {/* Fecha de Fin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Fin *
              </label>
              <input
                type="date"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              />
            </div>            {/* Duración de Sesión */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración de Sesión (minutos)
              </label>
              <input
                type="number"
                name="duracion_sesion"
                value={formData.duracion_sesion}
                onChange={handleChange}
                placeholder="60"
                min="15"
                max="180"
                step="15"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              />
            </div>

            {/* Precio COP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (COP) - Opcional
              </label>
              <input
                type="number"
                name="precio_cop"
                value={formData.precio_cop}
                onChange={handleChange}
                placeholder="100000"
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              />
            </div>

            {/* Precio USD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (USD) - Opcional
              </label>
              <input
                type="number"
                name="precio_usd"
                value={formData.precio_usd}
                onChange={handleChange}
                placeholder="25"
                min="0"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              />
            </div>

            {/* Duración del Plan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración del Plan (días)
              </label>
              <select
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              >
                <option value={30}>30 días (1 mes)</option>
                <option value={60}>60 días (2 meses)</option>
                <option value={90}>90 días (3 meses)</option>
                <option value={180}>180 días (6 meses)</option>
                <option value={365}>365 días (1 año)</option>
              </select>
            </div>

            {/* Opciones adicionales */}
            <div className="md:col-span-2 space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opciones Adicionales
              </label>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="incluye_consulta"
                  checked={formData.incluye_consulta}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#ff6600] focus:ring-[#ff6600] border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  Incluye consulta personalizada
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="acceso_premium"
                  checked={formData.acceso_premium}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#ff6600] focus:ring-[#ff6600] border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  Acceso premium a contenido exclusivo
                </label>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del Plan
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Describe los objetivos, ejercicios principales y beneficios del plan..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#ff6600] text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <PlusCircleIcon className="h-5 w-5" />
              )}
              <span>{loading ? 'Creando...' : 'Crear Plan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
