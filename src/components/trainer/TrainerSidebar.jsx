// src/components/trainer/TrainerSidebar.jsx
import React from 'react'
import { 
  ChartBarIcon, 
  PlusCircleIcon, 
  UserGroupIcon,
  HomeIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const menuItems = [
  {
    key: 'stats',
    name: 'Estadísticas',
    icon: ChartBarIcon,
    description: 'Vista general del progreso'
  },
  {
    key: 'create-plan',
    name: 'Crear Plan',
    icon: PlusCircleIcon,
    description: 'Crear nuevos planes de entrenamiento'
  },
  {
    key: 'assign-plan',
    name: 'Asignar Planes',
    icon: UserGroupIcon,
    description: 'Asignar planes a usuarios'
  },
  {
    key: 'manage-plans',
    name: 'Gestionar Planes',
    icon: CogIcon,
    description: 'Administrar y eliminar planes'
  }
]

export default function TrainerSidebar({ activeTab, onTabChange }) {
  return (
    <div className="bg-white w-64 shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-[#ff6600] rounded-lg p-2">
            <HomeIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FitTracker</h1>
            <p className="text-sm text-gray-500">Panel Entrenador</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.key
          
          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`w-full flex items-start space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                isActive
                  ? 'bg-[#ff6600] text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                isActive ? 'text-white' : 'text-gray-400'
              }`} />
              <div>
                <div className={`font-medium ${
                  isActive ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.name}
                </div>
                <div className={`text-sm ${
                  isActive ? 'text-orange-100' : 'text-gray-500'
                }`}>
                  {item.description}
                </div>
              </div>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Panel Entrenador v1.0
        </div>
      </div>
    </div>
  )
}
