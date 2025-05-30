// src/components/user/UserSidebar.jsx
import { 
  FiHome, 
  FiTarget, 
  FiStar, 
  FiActivity, 
  FiUser, 
  FiTrendingUp,
  FiHeart,
  FiCalendar,
  FiMenu,
  FiX,
  FiChevronRight
} from 'react-icons/fi'

const sidebarItems = [
  { 
    id: 'overview', 
    label: 'Mi Progreso', 
    icon: FiTrendingUp,
    gradient: 'from-blue-500 to-blue-600',
    description: 'Vista general de tu evolución'
  },
  { 
    id: 'plans', 
    label: 'Mis Planes', 
    icon: FiTarget,
    gradient: 'from-green-500 to-green-600',
    description: 'Planes de entrenamiento activos'
  },
  { 
    id: 'workouts', 
    label: 'Entrenamientos', 
    icon: FiActivity,
    gradient: 'from-orange-500 to-red-500',
    description: 'Historial y rutinas'
  },
  { 
    id: 'nutrition', 
    label: 'Nutrición', 
    icon: FiHeart,
    gradient: 'from-pink-500 to-rose-500',
    description: 'Seguimiento nutricional'
  },
  { 
    id: 'testimonials', 
    label: 'Testimonios', 
    icon: FiStar,
    gradient: 'from-yellow-500 to-amber-500',
    description: 'Tus reseñas y experiencias'
  },
  { 
    id: 'profile', 
    label: 'Mi Perfil', 
    icon: FiUser,
    gradient: 'from-purple-500 to-purple-600',
    description: 'Configuración personal'
  },
]

export default function UserSidebar({ 
  activeSection, 
  setActiveSection, 
  sidebarOpen, 
  setSidebarOpen 
}) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20
        fixed lg:relative inset-y-0 left-0 z-50
        w-80 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:w-20 lg:hover:w-80 lg:transition-all lg:duration-300
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100/50">
            <div className="flex items-center justify-between">
              {sidebarOpen ? (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-2xl flex items-center justify-center shadow-lg">
                    <FiTrendingUp className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent">
                      Victor's Health
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">Panel Personal</p>
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-2xl flex items-center justify-center shadow-lg mx-auto">
                  <FiTrendingUp className="text-white text-xl" />
                </div>
              )}
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 lg:hidden group"
              >
                {sidebarOpen ? (
                  <FiX size={20} className="text-gray-600 group-hover:text-[#ff6600]" />
                ) : (
                  <FiMenu size={20} className="text-gray-600 group-hover:text-[#ff6600]" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    group w-full flex items-center rounded-2xl text-left transition-all duration-300 relative overflow-hidden
                    ${isActive 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl shadow-${item.gradient.split('-')[1]}-500/25 transform scale-105` 
                      : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 hover:scale-105'
                    }
                    ${sidebarOpen ? 'p-4' : 'p-3 justify-center'}
                  `}
                  title={!sidebarOpen ? item.label : ''}
                >
                  {/* Background gradient effect */}
                  {!isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  )}
                  
                  <div className={`relative z-10 flex items-center ${sidebarOpen ? 'w-full' : ''}`}>
                    <div className={`
                      ${sidebarOpen ? 'mr-4' : ''}
                      ${isActive ? 'text-white' : `text-gray-400 group-hover:text-${item.gradient.split('-')[1]}-500`}
                      transition-colors duration-300
                    `}>
                      <Icon size={22} />
                    </div>
                    
                    {sidebarOpen && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'} transition-colors duration-300`}>
                              {item.label}
                            </p>
                            <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-600'} transition-colors duration-300`}>
                              {item.description}
                            </p>
                          </div>
                          
                          {isActive && (
                            <FiChevronRight className="text-white/80 animate-pulse" size={16} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </nav>

          {/* User Stats Preview */}
          {sidebarOpen && (
            <div className="p-4 border-t border-gray-100/50">
              <div className="bg-gradient-to-br from-[#ff6600]/5 via-[#ff8533]/5 to-[#ff6600]/10 rounded-2xl p-5 backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 text-sm">Tu Progreso</h3>
                  <div className="w-6 h-6 bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="text-white text-xs" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-600 font-medium">Racha actual</span>
                    </div>
                    <span className="font-bold text-sm bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent">7 días</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-600 font-medium">Entrenamientos</span>
                    </div>
                    <span className="font-bold text-sm bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent">45</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-600 font-medium">Planes completados</span>
                    </div>
                    <span className="font-bold text-sm bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent">3</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 pt-3 border-t border-gray-200/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600 font-medium">Progreso semanal</span>
                    <span className="text-xs font-bold text-[#ff6600]">75%</span>
                  </div>
                  <div className="w-full bg-gray-200/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] h-2 rounded-full transition-all duration-500 shadow-sm" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
