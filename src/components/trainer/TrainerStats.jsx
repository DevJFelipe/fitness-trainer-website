// src/components/trainer/TrainerStats.jsx
import React from 'react'
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function TrainerStats({ data }) {
  const { stats, plans } = data

  const statCards = [
    {
      title: 'Total de Planes',
      value: stats.totalPlans || 0,
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      description: 'Planes creados'
    },
    {
      title: 'Planes Activos',
      value: stats.activePlans || 0,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      description: 'Planes en progreso'
    },
    {
      title: 'Usuarios Asignados',
      value: stats.assignedUsers || 0,
      icon: UserGroupIcon,
      color: 'bg-purple-500',
      description: 'Usuarios con planes'
    },
    {
      title: 'Usuarios Disponibles',
      value: stats.totalUsers || 0,
      icon: ClockIcon,
      color: 'bg-orange-500',
      description: 'Sin planes asignados'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Estadísticas del Dashboard</h2>
        <p className="text-gray-600">Resumen de tu actividad como entrenador</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Plans */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Planes Recientes</h3>
          <p className="text-sm text-gray-500">Últimos planes creados</p>
        </div>
        
        <div className="p-6">
          {plans && plans.length > 0 ? (
            <div className="space-y-4">
              {plans.slice(0, 5).map((plan) => (
                <div key={plan.id_plan} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      plan.activo ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Plan {plan.tipo} - {plan.nivel}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Frecuencia: {plan.frecuencia} veces por semana
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(plan.fecha_inicio).toLocaleDateString('es-ES')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {plan.activo ? 'Activo' : 'Inactivo'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay planes creados</h3>
              <p className="text-gray-500">Comienza creando tu primer plan de entrenamiento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
