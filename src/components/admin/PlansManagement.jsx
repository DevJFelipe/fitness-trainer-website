// src/components/admin/PlansManagement.jsx
import { useState } from 'react'
import { FiSearch, FiEdit3, FiTrash2, FiPlus, FiTarget } from 'react-icons/fi'

export default function PlansManagement({ plans }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPlans = plans.filter(plan => 
    plan.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Planes</h1>
        <button className="bg-[#ff6600] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
          <FiPlus className="w-4 h-4" />
          <span>Nuevo Plan</span>
        </button>
      </div>

      {/* Búsqueda */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar planes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* Lista de planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id_plan} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#ff6600] rounded-lg flex items-center justify-center">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{plan.nombre}</h3>
                <p className="text-sm text-gray-500">Plan de entrenamiento</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {plan.descripcion || 'Sin descripción disponible'}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#ff6600]">
                ${plan.precio || '0'}
              </span>
              <div className="flex space-x-2">
                <button className="text-gray-600 hover:text-[#ff6600] p-1">
                  <FiEdit3 className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-red-600 p-1">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <FiTarget className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron planes</h3>
          <p className="text-gray-500">Comienza creando tu primer plan de entrenamiento.</p>
        </div>
      )}
    </div>
  )
}
