// src/components/trainer/DetailedViews.jsx
import React from 'react'
import { 
  DocumentTextIcon, 
  CheckCircleIcon, 
  UserGroupIcon,
  ClockIcon,
  ArrowLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// Vista detallada de todos los planes
export function TotalPlansView({ plans, onBack }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Todos los Planes</h2>
            <p className="text-gray-600">Lista completa de planes creados</p>
          </div>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          Total: {plans.length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frecuencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Inicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Fin
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plans.map((plan) => (
                <tr key={plan.id_plan} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {plan.tipo} - {plan.nivel}
                        </div>
                        <div className="text-sm text-gray-500">
                          {plan.descripcion?.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      plan.activo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {plan.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {plan.frecuencia} veces/semana
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(plan.fecha_inicio).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {plan.fecha_fin ? new Date(plan.fecha_fin).toLocaleDateString('es-ES') : 'Sin fecha'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Vista detallada de planes activos
export function ActivePlansView({ plans, onBack }) {
  const activePlans = plans.filter(p => p.activo)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Planes Activos</h2>
            <p className="text-gray-600">Planes en progreso actualmente</p>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Activos: {activePlans.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePlans.map((plan) => (
          <div key={plan.id_plan} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium text-green-700">Activo</span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(plan.fecha_inicio).toLocaleDateString('es-ES')}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {plan.tipo} - {plan.nivel}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              {plan.descripcion?.substring(0, 100)}...
            </p>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Frecuencia:</span>
              <span className="font-medium">{plan.frecuencia} veces/semana</span>
            </div>
          </div>
        ))}
      </div>

      {activePlans.length === 0 && (
        <div className="text-center py-12">
          <CheckCircleIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay planes activos</h3>
          <p className="text-gray-500">Crea nuevos planes y actívalos para verlos aquí</p>
        </div>
      )}
    </div>
  )
}

// Vista detallada de usuarios asignados
export function AssignedUsersView({ plans, users, onBack }) {
  // Obtener usuarios únicos que tienen planes asignados
  const assignedUserIds = new Set(plans.map(p => p.id_usuario))
  const assignedUsers = users.filter(u => assignedUserIds.has(u.id_usuario))

  // Contar planes por usuario
  const userPlanCounts = {}
  plans.forEach(plan => {
    userPlanCounts[plan.id_usuario] = (userPlanCounts[plan.id_usuario] || 0) + 1
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Usuarios Asignados</h2>
            <p className="text-gray-600">Usuarios con planes de entrenamiento</p>
          </div>
        </div>
        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
          Asignados: {assignedUsers.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignedUsers.map((user) => (
          <div key={user.id_usuario} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500 rounded-full p-2 mr-3">
                <UserGroupIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.nombre} {user.apellido}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Planes asignados:</span>
                <span className="font-medium text-purple-600">
                  {userPlanCounts[user.id_usuario] || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Registro:</span>
                <span className="text-gray-600">
                  {new Date(user.fecha_registro).toLocaleDateString('es-ES')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {assignedUsers.length === 0 && (
        <div className="text-center py-12">
          <UserGroupIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay usuarios asignados</h3>
          <p className="text-gray-500">Asigna planes a usuarios para verlos aquí</p>
        </div>
      )}
    </div>
  )
}

// Vista detallada de usuarios disponibles
export function AvailableUsersView({ users, plans, onBack }) {
  // Usuarios que NO tienen planes asignados
  const assignedUserIds = new Set(plans.map(p => p.id_usuario))
  const availableUsers = users.filter(u => !assignedUserIds.has(u.id_usuario))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Usuarios Disponibles</h2>
            <p className="text-gray-600">Usuarios sin planes asignados</p>
          </div>
        </div>
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
          Disponibles: {availableUsers.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableUsers.map((user) => (
          <div key={user.id_usuario} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-500 rounded-full p-2 mr-3">
                <ClockIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.nombre} {user.apellido}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estado:</span>
                <span className="font-medium text-orange-600">
                  Sin plan asignado
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Registro:</span>
                <span className="text-gray-600">
                  {new Date(user.fecha_registro).toLocaleDateString('es-ES')}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Listo para asignar
              </span>
            </div>
          </div>
        ))}
      </div>

      {availableUsers.length === 0 && (
        <div className="text-center py-12">
          <ClockIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Todos los usuarios tienen planes</h3>
          <p className="text-gray-500">¡Excelente! Todos los usuarios tienen planes asignados</p>
        </div>
      )}
    </div>
  )
}
