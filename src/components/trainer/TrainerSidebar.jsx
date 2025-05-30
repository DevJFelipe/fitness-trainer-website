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

export default function TrainerSidebar({ activeTab, onTabChange, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        bg-white shadow-lg flex flex-col
        fixed lg:relative inset-y-0 left-0 z-50
        w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-[#ff6600] rounded-lg p-2">
                <HomeIcon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">FitTracker</h1>
                <p className="text-xs lg:text-sm text-gray-500">Panel Entrenador</p>
              </div>
            </div>
            
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.key
            
            return (
              <button
                key={item.key}
                onClick={() => {
                  onTabChange(item.key)
                  if (onClose) onClose() // Close mobile menu when item is clicked
                }}
                className={`w-full flex items-start space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-left transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#ff6600] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`} />
                <div>
                  <div className={`text-sm lg:text-base font-medium ${
                    isActive ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.name}
                  </div>
                  <div className={`text-xs lg:text-sm ${
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
        <div className="p-3 lg:p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Panel Entrenador v1.0
          </div>
        </div>
      </div>
    </>
  )
}
