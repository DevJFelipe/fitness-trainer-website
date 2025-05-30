// src/components/user/UserHeader.jsx
import { useState, useRef, useEffect } from 'react'
import { 
  FiMenu, 
  FiBell, 
  FiLogOut, 
  FiSettings, 
  FiUser,
  FiChevronDown,
  FiAward,
  FiTrendingUp,
  FiMapPin
} from 'react-icons/fi'

export default function UserHeader({ 
  user, 
  onLogout, 
  sidebarOpen, 
  setSidebarOpen 
}) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const userMenuRef = useRef(null)
  const notificationsRef = useRef(null)

  // Cerrar menús al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Notificaciones simuladas
  const notifications = [
    {
      id: 1,
      title: '¡Nuevo plan disponible!',
      message: 'Hemos creado un plan personalizado para ti',
      time: '5 min',
      type: 'info',
      unread: true,
      icon: FiAward,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Racha de 7 días',
      message: '¡Felicidades! Has completado 7 días consecutivos',
      time: '1 hora',
      type: 'success',
      unread: true,
      icon: FiTrendingUp,
      color: 'green'
    },
    {
      id: 3,
      title: 'Recordatorio de entrenamiento',
      message: 'Es hora de tu sesión de entrenamiento diaria',
      time: '2 horas',
      type: 'reminder',
      unread: false,
      icon: FiBell,
      color: 'orange'
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  // Obtener saludo según la hora
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return '¡Buenos días'
    if (hour < 18) return '¡Buenas tardes'
    return '¡Buenas noches'
  }

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 rounded-2xl hover:bg-gray-100/80 transition-all duration-200 lg:hidden group"
          >
            <FiMenu size={20} className="text-gray-600 group-hover:text-[#ff6600]" />
          </button>

          {/* Desktop toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-3 rounded-2xl hover:bg-gray-100/80 transition-all duration-200 group"
          >
            <FiMenu size={20} className="text-gray-600 group-hover:text-[#ff6600]" />
          </button>

          {/* Welcome message */}
          <div className="hidden sm:block">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-800">
                {getGreeting()}, <span className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent">{user?.nombre?.split(' ')[0]}</span>!
              </h1>
              <div className="text-2xl">
                {new Date().getHours() < 18 ? '☀️' : '🌙'}
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium flex items-center space-x-1">
              <FiMapPin size={14} />
              <span>
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Quick stats */}
          <div className="hidden lg:flex items-center space-x-4 bg-gradient-to-r from-[#ff6600]/10 via-[#ff8533]/10 to-[#ff6600]/5 px-5 py-3 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <FiTrendingUp className="text-white" size={16} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-800">7</p>
                <p className="text-xs text-gray-600">Días</p>
              </div>
            </div>
            
            <div className="w-px h-8 bg-gray-200"></div>
            
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <FiAward className="text-white" size={16} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-800">45</p>
                <p className="text-xs text-gray-600">Entrenamientos</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 rounded-2xl hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <FiBell size={20} className="text-gray-600 group-hover:text-[#ff6600]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
                <div className="px-6 py-4 border-b border-gray-100/50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">Notificaciones</h3>
                    <span className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white text-xs px-2 py-1 rounded-full font-bold">
                      {unreadCount} nuevas
                    </span>
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon
                    return (
                      <div
                        key={notification.id}
                        className={`px-6 py-4 hover:bg-gray-50/80 border-l-4 cursor-pointer transition-all duration-200 ${
                          notification.unread 
                            ? 'bg-blue-50/50 border-l-blue-500' 
                            : 'border-l-transparent hover:border-l-gray-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="text-white" size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-gray-800 text-sm">{notification.title}</p>
                                <p className="text-gray-600 text-xs mt-1 leading-relaxed">{notification.message}</p>
                              </div>
                              <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="px-6 py-3 border-t border-gray-100/50">
                  <button className="text-sm bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent hover:from-[#ff8533] hover:to-[#ff6600] font-bold transition-all duration-200">
                    Ver todas las notificaciones →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 pr-4 rounded-2xl hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-sm">
                  {user?.nombre?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="font-bold text-gray-800 text-sm">{user?.nombre?.split(' ')[0]}</p>
                <p className="text-xs text-gray-500 font-medium">{user?.rol?.nombre_rol}</p>
              </div>
              <FiChevronDown size={16} className="text-gray-400 hidden md:block group-hover:text-[#ff6600] transition-colors duration-200" />
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
                <div className="px-6 py-4 border-b border-gray-100/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user?.nombre?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{user?.nombre}</p>
                      <p className="text-sm text-gray-500">{user?.correo}</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#ff6600]/10 to-[#ff8533]/10 text-[#ff6600] mt-1">
                        {user?.rol?.nombre_rol}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50/80 transition-all duration-200 group">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-blue-500/20">
                      <FiUser size={16} className="text-blue-600" />
                    </div>
                    <span className="font-medium">Mi Perfil</span>
                  </button>
                  <button className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50/80 transition-all duration-200 group">
                    <div className="w-8 h-8 bg-gray-500/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-gray-500/20">
                      <FiSettings size={16} className="text-gray-600" />
                    </div>
                    <span className="font-medium">Configuración</span>
                  </button>
                </div>
                
                <div className="border-t border-gray-100/50 pt-2">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50/80 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-red-500/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-red-500/20">
                      <FiLogOut size={16} className="text-red-600" />
                    </div>
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
