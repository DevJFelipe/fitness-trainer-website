// src/components/admin/UsersManagement.jsx
import { useState, useEffect } from 'react'
import { 
  FiSearch, 
  FiEdit3, 
  FiTrash2, 
  FiUserPlus,
  FiFilter,
  FiMoreHorizontal,
  FiEye,
  FiMail,
  FiUsers
} from 'react-icons/fi'
import { usuarioService, rolService, activityService } from '../../services'
import { useAuth } from '../../hooks/useAuth'

export default function UsersManagement({ users, onUpdate }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.correo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.rol.nombre_rol === filterRole
    return matchesSearch && matchesRole
  })

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return
    }

    setLoading(true)
    try {
      const result = await usuarioService.deleteUsuario(userId)
      if (result.success) {
        onUpdate()
        alert('Usuario eliminado exitosamente')      } else {
        alert('Error al eliminar usuario: ' + result.error)
      }
    } catch (err) {
      alert('Error al eliminar usuario: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'entrenador':
        return 'bg-blue-100 text-blue-800'
      case 'usuario':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
        <button
          onClick={() => {
            setSelectedUser(null)
            setShowUserModal(true)
          }}
          className="bg-[#ff6600] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
        >
          <FiUserPlus className="w-4 h-4" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none w-full"
            />
          </div>

          {/* Filtro por rol */}
          <div className="flex items-center space-x-2">
            <FiFilter className="w-5 h-5 text-gray-500" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="entrenador">Entrenadores</option>
              <option value="usuario">Usuarios</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id_usuario} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#ff6600] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.nombre.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.nombre}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.correo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.rol.nombre_rol)}`}>
                      {user.rol.nombre_rol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.fecha_registro)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setShowUserModal(true)
                        }}
                        className="text-gray-600 hover:text-[#ff6600] p-1"
                        title="Ver detalles"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setShowUserModal(true)
                        }}
                        className="text-gray-600 hover:text-[#ff6600] p-1"
                        title="Editar"
                      >
                        <FiEdit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => window.open(`mailto:${user.correo}`)}
                        className="text-gray-600 hover:text-[#ff6600] p-1"
                        title="Enviar email"
                      >
                        <FiMail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id_usuario)}
                        className="text-gray-600 hover:text-red-600 p-1"
                        title="Eliminar"
                        disabled={loading}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron usuarios
            </h3>
            <p className="text-gray-500">
              Intenta cambiar los filtros de búsqueda o agregar un nuevo usuario.
            </p>
          </div>
        )}
      </div>

      {/* Resumen */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#ff6600]">{filteredUsers.length}</p>
            <p className="text-sm text-gray-500">Usuarios mostrados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {filteredUsers.filter(u => u.rol.nombre_rol === 'usuario').length}
            </p>
            <p className="text-sm text-gray-500">Usuarios regulares</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {filteredUsers.filter(u => u.rol.nombre_rol === 'admin' || u.rol.nombre_rol === 'entrenador').length}
            </p>
            <p className="text-sm text-gray-500">Administradores y entrenadores</p>
          </div>
        </div>
      </div>      {/* Modal para ver/editar usuario */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowUserModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  )
}

// Componente modal para editar usuario
function UserModal({ user, onClose, onUpdate }) {
  const { user: currentUser } = useAuth()
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    correo: user?.correo || '',
    rol: user?.rol?.id_rol || user?.rol || 3 // Por defecto usuario regular (ID 3)
  })
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingRoles, setLoadingRoles] = useState(true)
  // Cargar roles disponibles
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const result = await rolService.getAllRoles()
        if (result.success) {
          setRoles(result.data)
        }
      } catch (error) {
        console.error('Error loading roles:', error)
      } finally {
        setLoadingRoles(false)
      }
    }
    loadRoles()
  }, [])
  // Actualizar formData cuando cambie el usuario
  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        correo: user.correo || '',
        rol: user.rol?.id_rol || user.rol || 3
      })
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      // Actualizar información básica del usuario
      const updateResult = await usuarioService.updateUsuario(user.id_usuario, {
        nombre: formData.nombre,
        correo: formData.correo
      })

      if (!updateResult.success) {
        throw new Error(updateResult.error)
      }      // Si el rol cambió, actualizarlo por separado
      const currentRoleId = user.rol?.id_rol || user.rol
      if (formData.rol !== currentRoleId) {
        const oldRoleName = user.rol?.nombre_rol || 'desconocido'
        const newRoleName = getRoleName(formData.rol)
        
        const roleResult = await usuarioService.updateUserRole(user.id_usuario, formData.rol)
        if (!roleResult.success) {
          throw new Error(roleResult.error)
        }

        // Registrar el cambio de rol en el log de actividades
        try {
          await activityService.logRoleChange(
            currentUser.id_usuario,
            user.id_usuario,
            oldRoleName,
            newRoleName
          )
        } catch (logError) {
          console.warn('No se pudo registrar el cambio de rol en el log:', logError)
        }
      }

      alert('Usuario actualizado exitosamente')
      onUpdate()
      onClose()
    } catch (error) {
      alert('Error al actualizar usuario: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const getRoleName = (rolId) => {
    const rol = roles.find(r => r.id_rol === rolId)
    return rol ? rol.nombre_rol : 'Cargando...'
  }

  const getRoleColor = (roleName) => {
    switch (roleName) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'entrenador':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'usuario':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {user ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h3>
        
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Información básica */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({...formData, correo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Selector de rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol del usuario
              </label>
              {loadingRoles ? (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  Cargando roles...
                </div>
              ) : (                <select
                  value={formData.rol}
                  onChange={(e) => setFormData({...formData, rol: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
                >
                  {roles.map((rol) => (
                    <option key={rol.id_rol} value={rol.id_rol}>
                      {rol.nombre_rol} - {rol.descripcion}
                    </option>
                  ))}
                </select>
              )}
              
              {/* Vista previa del rol seleccionado */}
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rol actual:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleColor(getRoleName(formData.rol))}`}>
                  {getRoleName(formData.rol)}
                </span>
              </div>
            </div>

            {/* Información adicional (solo lectura) */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-gray-900">Información adicional</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">ID:</span> {user.id_usuario}
                </div>
                <div>
                  <span className="text-gray-600">Registro:</span> {new Date(user.fecha_registro).toLocaleDateString()}
                </div>
                {user.fecha_nacimiento && (
                  <div>
                    <span className="text-gray-600">Nacimiento:</span> {new Date(user.fecha_nacimiento).toLocaleDateString()}
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Rol anterior:</span> {user.rol.nombre_rol}
                </div>
              </div>
            </div>            {/* Advertencia sobre cambio de rol */}
            {formData.rol !== (user.rol?.id_rol || user.rol) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Cambio de rol detectado
                    </h3>
                    <div className="mt-1 text-sm text-yellow-700">
                      El usuario pasará de <strong>{user.rol.nombre_rol}</strong> a <strong>{getRoleName(formData.rol)}</strong>. 
                      Este cambio afectará los permisos del usuario.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#ff6600] text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || loadingRoles}
              >
                {loading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Funcionalidad para crear usuarios en desarrollo...</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
