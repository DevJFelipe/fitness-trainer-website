// src/components/admin/UsersManagement.jsx
import { useState } from 'react'
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
import { usuarioService } from '../../services'

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
      </div>

      {/* Modal para ver/editar usuario */}
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

// Componente modal simple (se puede expandir más adelante)
function UserModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {user ? 'Detalles del Usuario' : 'Nuevo Usuario'}
        </h3>
        
        {user && (
          <div className="space-y-3">
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.correo}</p>
            <p><strong>Rol:</strong> {user.rol.nombre_rol}</p>
            <p><strong>Fecha de registro:</strong> {new Date(user.fecha_registro).toLocaleDateString()}</p>
            {user.fecha_nacimiento && (
              <p><strong>Fecha de nacimiento:</strong> {new Date(user.fecha_nacimiento).toLocaleDateString()}</p>
            )}
          </div>
        )}
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cerrar
          </button>
          {user && (
            <button className="px-4 py-2 bg-[#ff6600] text-white rounded-lg hover:bg-orange-600">
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
