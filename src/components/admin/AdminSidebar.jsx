// src/components/admin/AdminSidebar.jsx
import { 
  FiHome, 
  FiUsers, 
  FiFileText, 
  FiTarget, 
  FiStar, 
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiX
} from 'react-icons/fi'

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome },
  { id: 'users', label: 'Usuarios', icon: FiUsers },
  { id: 'content', label: 'Contenido', icon: FiFileText },
  { id: 'plans', label: 'Planes', icon: FiTarget },
  { id: 'testimonials', label: 'Testimonios', icon: FiStar },
  { id: 'analytics', label: 'Analíticas', icon: FiBarChart2 },
  { id: 'settings', label: 'Configuración', icon: FiSettings },
]

export default function AdminSidebar({ 
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
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        bg-white shadow-lg border-r border-gray-200
        fixed inset-y-0 left-0 z-30
        w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:relative lg:translate-x-0 lg:w-16
      `}>
        {/* Header del sidebar */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#ff6600] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>              <h2 className="text-xl font-bold text-gray-900">
                <span className="text-[#ff6600]">Victor's</span> Health Synergy
              </h2>
            </div>
          )}
          
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? (
              <FiX className="w-5 h-5 text-gray-600" />
            ) : (
              <FiMenu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg 
                  transition-all duration-200 text-left
                  ${isActive 
                    ? 'bg-[#ff6600] text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#ff6600]'
                  }
                  ${!sidebarOpen && 'justify-center'}
                `}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon className={`w-5 h-5 ${!sidebarOpen && 'w-6 h-6'}`} />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer del sidebar */}
        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gradient-to-r from-[#ff6600] to-orange-600 rounded-lg p-4 text-white">
              <h3 className="font-semibold text-sm">Panel Admin</h3>
              <p className="text-xs opacity-90 mt-1">
                Gestiona tu plataforma fitness
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
