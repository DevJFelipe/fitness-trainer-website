// src/components/admin/ContentManagement.jsx
import { useState } from 'react'
import { 
  FiSearch, 
  FiEdit3, 
  FiTrash2, 
  FiPlus,
  FiEye,
  FiCalendar,
  FiUser,
  FiTag
} from 'react-icons/fi'
import { contenidoService } from '../../services'

export default function ContentManagement({ posts, onUpdate }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showContentModal, setShowContentModal] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)
  const [loading, setLoading] = useState(false)

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || post.tipo === filterType
    const matchesStatus = filterStatus === 'all' || post.visibilidad === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleDeleteContent = async (contentId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este contenido?')) {
      return
    }

    setLoading(true)
    try {
      const result = await contenidoService.deleteContenido(contentId)
      if (result.success) {
        onUpdate()
        alert('Contenido eliminado exitosamente')      } else {
        alert('Error al eliminar contenido: ' + result.error)
      }
    } catch (err) {
      alert('Error al eliminar contenido: ' + err.message)
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'publico':
        return 'bg-green-100 text-green-800'
      case 'privado':
        return 'bg-red-100 text-red-800'
      case 'borrador':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-100 text-blue-800'
      case 'ejercicio':
        return 'bg-purple-100 text-purple-800'
      case 'rutina':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Contenido</h1>
        <button
          onClick={() => {
            setSelectedContent(null)
            setShowContentModal(true)
          }}
          className="bg-[#ff6600] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>Nuevo Contenido</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar contenido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none w-full"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
            >
              <option value="all">Todos los tipos</option>
              <option value="blog">Blog</option>
              <option value="ejercicio">Ejercicios</option>
              <option value="rutina">Rutinas</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none"
            >
              <option value="all">Todos los estados</option>
              <option value="publico">Público</option>
              <option value="privado">Privado</option>
              <option value="borrador">Borrador</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id_contenido} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Imagen de cabecera */}
            <div className="h-48 bg-gradient-to-r from-[#ff6600] to-orange-500 relative">
              {post.imagen_url ? (
                <img 
                  src={post.imagen_url} 
                  alt={post.titulo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiFileText className="w-12 h-12 text-white opacity-50" />
                </div>
              )}
              
              {/* Badges de estado y tipo */}
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.visibilidad)}`}>
                  {post.visibilidad}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(post.tipo)}`}>
                  {post.tipo}
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.titulo}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.descripcion || 'Sin descripción disponible'}
              </p>

              {/* Meta información */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FiUser className="w-4 h-4 mr-2" />
                  <span>{post.autor?.nombre || 'Autor desconocido'}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(post.fecha_publicacion || post.fecha_creacion)}</span>
                </div>

                {post.tema && (
                  <div className="flex items-center text-sm text-gray-500">
                    <FiTag className="w-4 h-4 mr-2" />
                    <span>{post.tema}</span>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedContent(post)
                      setShowContentModal(true)
                    }}
                    className="text-gray-600 hover:text-[#ff6600] p-1"
                    title="Ver detalles"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedContent(post)
                      setShowContentModal(true)
                    }}
                    className="text-gray-600 hover:text-[#ff6600] p-1"
                    title="Editar"
                  >
                    <FiEdit3 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteContent(post.id_contenido)}
                    className="text-gray-600 hover:text-red-600 p-1"
                    title="Eliminar"
                    disabled={loading}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-gray-400">
                  ID: {post.id_contenido}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontró contenido
          </h3>
          <p className="text-gray-500">
            Intenta cambiar los filtros de búsqueda o crear nuevo contenido.
          </p>
        </div>
      )}

      {/* Resumen */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen de Contenido</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#ff6600]">{filteredPosts.length}</p>
            <p className="text-sm text-gray-500">Total mostrado</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {filteredPosts.filter(p => p.visibilidad === 'publico').length}
            </p>
            <p className="text-sm text-gray-500">Publicado</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {filteredPosts.filter(p => p.visibilidad === 'borrador').length}
            </p>
            <p className="text-sm text-gray-500">Borradores</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {filteredPosts.filter(p => p.tipo === 'blog').length}
            </p>
            <p className="text-sm text-gray-500">Artículos de blog</p>
          </div>
        </div>
      </div>

      {/* Modal para ver/editar contenido */}
      {showContentModal && (
        <ContentModal
          content={selectedContent}
          onClose={() => setShowContentModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  )
}

// Componente modal para contenido
function ContentModal({ content, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {content ? 'Detalles del Contenido' : 'Nuevo Contenido'}
        </h3>
        
        {content && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <p className="text-gray-900">{content.titulo}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                content.tipo === 'blog' ? 'bg-blue-100 text-blue-800' :
                content.tipo === 'ejercicio' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {content.tipo}
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                content.visibilidad === 'publico' ? 'bg-green-100 text-green-800' :
                content.visibilidad === 'privado' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {content.visibilidad}
              </span>
            </div>
            
            {content.descripcion && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <p className="text-gray-600 text-sm">{content.descripcion}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                <p className="text-gray-900">{content.autor?.nombre || 'No especificado'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de creación</label>
                <p className="text-gray-900">
                  {new Date(content.fecha_creacion).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
            
            {content.tema && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
                <p className="text-gray-900">{content.tema}</p>
              </div>
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
          {content && (
            <button className="px-4 py-2 bg-[#ff6600] text-white rounded-lg hover:bg-orange-600">
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
