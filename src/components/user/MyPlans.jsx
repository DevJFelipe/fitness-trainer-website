// src/components/user/MyPlans.jsx
import { useState } from 'react'
import { 
  FiTarget, 
  FiPlay, 
  FiPause, 
  FiCheck, 
  FiCalendar,
  FiClock,
  FiTrendingUp,
  FiPlus,
  FiFilter
} from 'react-icons/fi'

export default function MyPlans({ plans }) {
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedPlan, setSelectedPlan] = useState(null)

  const statusColors = {
    'activo': 'bg-green-100 text-green-800 border-green-200',
    'pausado': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'completado': 'bg-blue-100 text-blue-800 border-blue-200',
    'cancelado': 'bg-red-100 text-red-800 border-red-200'
  }

  const typeColors = {
    'perdida_peso': 'from-red-500 to-pink-500',
    'ganancia_muscular': 'from-blue-500 to-indigo-500',
    'resistencia': 'from-green-500 to-teal-500',
    'fuerza': 'from-purple-500 to-violet-500',
    'general': 'from-orange-500 to-red-500'
  }

  const filteredPlans = plans.filter(plan => {
    if (filterStatus === 'all') return true
    return plan.estado === filterStatus
  })

  const getProgressPercentage = (plan) => {
    if (!plan.fecha_inicio || !plan.fecha_fin) return 0
    
    const start = new Date(plan.fecha_inicio)
    const end = new Date(plan.fecha_fin)
    const now = new Date()
    
    const totalDuration = end.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    
    return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mis Planes de Entrenamiento</h1>
          <p className="text-gray-600 mt-2">Gestiona y sigue el progreso de tus planes personalizados</p>
        </div>
        
        <button className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center space-x-2">
          <FiPlus size={20} />
          <span className="font-medium">Nuevo Plan</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <FiFilter className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filtrar por estado:</span>
          
          {['all', 'activo', 'pausado', 'completado'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-[#ff6600] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status === 'all' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Planes Activos</p>
              <p className="text-3xl font-bold">{plans.filter(p => p.estado === 'activo').length}</p>
            </div>
            <FiPlay size={24} className="text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Completados</p>
              <p className="text-3xl font-bold">{plans.filter(p => p.estado === 'completado').length}</p>
            </div>
            <FiCheck size={24} className="text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Planes</p>
              <p className="text-3xl font-bold">{plans.length}</p>
            </div>
            <FiTarget size={24} className="text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Promedio Progreso</p>
              <p className="text-3xl font-bold">
                {plans.length > 0 
                  ? Math.round(plans.reduce((acc, plan) => acc + getProgressPercentage(plan), 0) / plans.length)
                  : 0
                }%
              </p>
            </div>
            <FiTrendingUp size={24} className="text-orange-200" />
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      {filteredPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => {
            const progress = getProgressPercentage(plan)
            const daysRemaining = getDaysRemaining(plan.fecha_fin)
            
            return (
              <div 
                key={plan.id_plan} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {/* Plan Header */}
                <div className={`bg-gradient-to-r ${typeColors[plan.tipo] || typeColors.general} p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{plan.nombre || `Plan ${plan.tipo?.replace('_', ' ')}`}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[plan.estado] || statusColors.activo}`}>
                      {plan.estado}
                    </span>
                  </div>
                  <p className="text-sm text-white/90">{plan.descripcion || 'Plan personalizado de entrenamiento'}</p>
                </div>

                {/* Plan Content */}
                <div className="p-6">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progreso</span>
                      <span className="text-sm font-bold text-[#ff6600]">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCalendar size={16} className="mr-2" />
                      <span>Inicio: {formatDate(plan.fecha_inicio)}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FiClock size={16} className="mr-2" />
                      <span>
                        {daysRemaining > 0 
                          ? `${daysRemaining} días restantes`
                          : 'Plan completado'
                        }
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <FiTarget size={16} className="mr-2" />
                      <span>Nivel: {plan.nivel || 'Intermedio'}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <FiTrendingUp size={16} className="mr-2" />
                      <span>Frecuencia: {plan.frecuencia || '3-4 veces/semana'}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-2">
                    <button 
                      onClick={() => setSelectedPlan(plan)}
                      className="flex-1 bg-[#ff6600] text-white py-2 px-4 rounded-lg hover:bg-[#ff8533] transition-colors font-medium"
                    >
                      Ver Detalles
                    </button>
                    
                    {plan.estado === 'activo' && (
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <FiPause size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <FiTarget size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            {filterStatus === 'all' ? 'No tienes planes aún' : `No hay planes ${filterStatus}s`}
          </h3>
          <p className="text-gray-500 mb-6">
            {filterStatus === 'all' 
              ? 'Comienza tu viaje fitness creando tu primer plan personalizado'
              : 'Intenta cambiar el filtro para ver otros planes'
            }
          </p>
          <button className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg">
            Crear Mi Primer Plan
          </button>
        </div>
      )}

      {/* Plan Detail Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`bg-gradient-to-r ${typeColors[selectedPlan.tipo] || typeColors.general} p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedPlan.nombre || `Plan ${selectedPlan.tipo?.replace('_', ' ')}`}
                  </h2>
                  <p className="text-white/90">{selectedPlan.descripcion}</p>
                </div>
                <button 
                  onClick={() => setSelectedPlan(null)}
                  className="text-white/80 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Información del Plan</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-medium">{selectedPlan.tipo?.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nivel:</span>
                      <span className="font-medium">{selectedPlan.nivel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frecuencia:</span>
                      <span className="font-medium">{selectedPlan.frecuencia}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedPlan.estado]}`}>
                        {selectedPlan.estado}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4">Progreso</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Completado</span>
                        <span className="font-bold text-[#ff6600]">{Math.round(getProgressPercentage(selectedPlan))}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] h-3 rounded-full transition-all duration-500"
                          style={{ width: `${getProgressPercentage(selectedPlan)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Tiempo restante: <strong>{getDaysRemaining(selectedPlan.fecha_fin)} días</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        Fecha fin: <strong>{formatDate(selectedPlan.fecha_fin)}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-[#ff6600] text-white py-3 px-6 rounded-xl hover:bg-[#ff8533] transition-colors font-medium">
                  Continuar Entrenamiento
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  Pausar Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
