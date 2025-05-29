// src/components/admin/AdminHeader.jsx
import { useState, useRef, useEffect } from 'react'
import { 
  FiBell, 
  FiSearch, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiMenu,
  FiChevronDown
} from 'react-icons/fi'

export default function AdminHeader({ 
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
    function handleClickOutside(event) {
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
      title: 'Nuevo usuario registrado',
      message: 'Juan Pérez se ha registrado en la plataforma',
      time: '5 min',
      unread: true
    },
    {
      id: 2,
      title: 'Nuevo comentario en blog',
      message: 'Comentario en "Ejercicios para principiantes"',
      time: '1 hora',
      unread: true
    },
    {
      id: 3,
      title: 'Plan actualizado',
      message: 'El plan "Fuerza y Resistencia" fue actualizado',
      time: '2 horas',
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left section - Mobile menu button & Search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiMenu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Search bar */}
          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar usuarios, contenido..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none w-64"
            />
          </div>
        </div>

        {/* Right section - Notifications & User menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-[#ff6600] hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {notification.time}
                        </span>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-[#ff6600] rounded-full mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 text-center">
                  <button className="text-[#ff6600] hover:text-orange-600 text-sm font-medium">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-[#ff6600] rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.nombre?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.nombre || 'Administrator'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.rol?.nombre_rol || 'admin'}
                </p>
              </div>
              <FiChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-medium text-gray-900">{user?.nombre}</p>
                  <p className="text-sm text-gray-500">{user?.correo}</p>
                </div>
                
                <div className="py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors">
                    <FiUser className="w-4 h-4" />
                    <span className="text-sm">Mi Perfil</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors">
                    <FiSettings className="w-4 h-4" />
                    <span className="text-sm">Configuración</span>
                  </button>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span className="text-sm">Cerrar Sesión</span>
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
