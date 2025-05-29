// src/components/admin/TestimonialsManagement.jsx
import { useState } from 'react'
import { FiSearch, FiEdit3, FiTrash2, FiPlus, FiStar } from 'react-icons/fi'

export default function TestimonialsManagement({ testimonials }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTestimonials = testimonials.filter(testimonial => 
    testimonial.comentario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.usuario?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Testimonios</h1>
        <button className="bg-[#ff6600] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
          <FiPlus className="w-4 h-4" />
          <span>Nuevo Testimonio</span>
        </button>
      </div>

      {/* Búsqueda */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar testimonios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* Lista de testimonios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial.id_testimonio} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#ff6600] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {testimonial.usuario?.nombre?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">
                    {testimonial.usuario?.nombre || 'Usuario'}
                  </p>
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial.calificacion || 5)}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="text-gray-600 hover:text-[#ff6600] p-1">
                  <FiEdit3 className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-red-600 p-1">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm italic">
              "{testimonial.comentario || 'Sin comentario'}"
            </p>
            
            <div className="mt-4 text-xs text-gray-500">
              {testimonial.fecha_creacion && 
                new Date(testimonial.fecha_creacion).toLocaleDateString('es-ES')
              }
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <FiStar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron testimonios</h3>
          <p className="text-gray-500">Los testimonios de usuarios aparecerán aquí.</p>
        </div>
      )}
    </div>
  )
}
