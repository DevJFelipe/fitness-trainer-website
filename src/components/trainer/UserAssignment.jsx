// src/components/trainer/UserAssignment.jsx
import React, { useState } from 'react'
import { planService } from '../../services'
import { 
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function UserAssignment({ plans, users, onPlanAssigned }) {
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedUser, setSelectedUser] = useState('')
  
  // Debug: Log props
  console.log('🔍 UserAssignment Debug:')
  console.log('Plans:', plans)
  console.log('Users:', users)// Filtrar usuarios basado en el término de búsqueda
  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.correo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Obtener planes activos y disponibles
  const availablePlans = plans.filter(plan => plan.activo)
  // Selección de un solo usuario
  const handleUserSelect = (userId) => {
    setSelectedUser(userId)
  }

  const handleAssignPlan = async () => {
    if (!selectedPlan || !selectedUser) {
      setErrorMessage('Debes seleccionar un plan y un usuario')
      return
    }

    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const result = await planService.assignPlanToUser(selectedPlan, selectedUser)
      if (!result.success) throw new Error(result.error || 'Error asignando plan')

      const usuario = users.find(u => u.id_usuario === selectedUser)
      const plan = plans.find(p => p.id_plan === selectedPlan)
        setSuccessMessage(
        `🎉 ¡Plan "${plan?.tipo?.replace('_', ' ') || 'Plan'}" (${plan?.nivel}) asignado exitosamente a ${usuario?.nombre || 'usuario'}! 
        
        ✅ El usuario podrá ver su nuevo plan en su dashboard.
        📊 Las estadísticas se han actualizado automáticamente.
        🎯 Duración del plan: 30 días desde hoy.`
      )
      
      // Resetear selecciones
      setSelectedUser('')
      setSelectedPlan('')
      
      // Notificar al componente padre para actualizar estadísticas
      if (onPlanAssigned) {
        onPlanAssigned()
      }

      // Clear success message after 7 seconds (más tiempo para leer el mensaje completo)
      setTimeout(() => {
        setSuccessMessage('')
      }, 7000)

    } catch (error) {
      setErrorMessage(`❌ Error al asignar plan: ${error.message}`)
      // Clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Asignar Planes a Usuarios</h2>
        <p className="text-gray-600">Asigna planes de entrenamiento a tus usuarios</p>
      </div>

      {/* Messages */}      {successMessage && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start">
            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                ¡Asignación Exitosa! 🎉
              </h3>
              <div className="text-green-700 whitespace-pre-line">
                {successMessage}
              </div>
              <div className="mt-3 p-3 bg-green-100 rounded-lg">
                <p className="text-sm text-green-600 font-medium">
                  💡 <strong>Próximos pasos:</strong>
                </p>
                <ul className="text-sm text-green-600 mt-1 space-y-1">
                  <li>• El usuario puede acceder a su plan desde el dashboard</li>
                  <li>• Puedes ver el progreso en la sección de usuarios asignados</li>
                  <li>• Las estadísticas se actualizaron automáticamente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-red-800">{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Seleccionar Plan</h3>
          </div>
          
          <div className="p-6">
            {availablePlans.length > 0 ? (
              <div className="space-y-3">
                {availablePlans.map((plan) => (
                  <label
                    key={plan.id_plan}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPlan === plan.id_plan
                        ? 'border-[#ff6600] bg-orange-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedPlan"
                      value={plan.id_plan}
                      checked={selectedPlan === plan.id_plan}
                      onChange={() => setSelectedPlan(plan.id_plan)}
                      className="mr-3 text-[#ff6600] focus:ring-[#ff6600]"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {plan.tipo} - {plan.nivel}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Frecuencia: {plan.frecuencia} veces/semana
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(plan.fecha_inicio).toLocaleDateString('es-ES')} - {new Date(plan.fecha_fin).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <UserGroupIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay planes disponibles</h3>
                <p className="text-gray-500">Crea un plan primero para poder asignarlo</p>
              </div>
            )}
          </div>
        </div>

        {/* User Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Seleccionar Usuario</h3>
            <p className="text-sm text-gray-500 mt-1">
              {selectedUser
                ? `Usuario seleccionado: ${users.find(u => u.id_usuario === selectedUser)?.nombre}`
                : 'Ningún usuario seleccionado'}
            </p>
          </div>
          
          <div className="p-6">
            {/* Search */}
            <div className="relative mb-4">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
              />
            </div>

            {/* User List */}
            {filteredUsers.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <label
                    key={user.id_usuario}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedUser === user.id_usuario
                        ? 'border-[#ff6600] bg-orange-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedUser"
                      value={user.id_usuario}
                      checked={selectedUser === user.id_usuario}
                      onChange={() => handleUserSelect(user.id_usuario)}
                      className="mr-3 text-[#ff6600] focus:ring-[#ff6600]"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{user.nombre}</h4>
                      <p className="text-sm text-gray-500">{user.correo}</p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
               <div className="text-center py-8">
                <UserGroupIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios disponibles'}
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Intenta con otro término de búsqueda' : 'No hay usuarios registrados en el sistema'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={handleAssignPlan}
          disabled={loading || !selectedPlan || !selectedUser}
          className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <CheckCircleIcon className="h-5 w-5" />
          )}
          <span>
            {loading ? 'Asignando...' : 'Asignar Plan'}
          </span>
        </button>
      </div>
    </div>
  )
}
