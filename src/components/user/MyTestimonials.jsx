// src/components/user/MyTestimonials.jsx
import { FiStar, FiPlus, FiEdit3, FiTrash2 } from 'react-icons/fi'

export default function MyTestimonials({ testimonials }) {
  const handleNewTestimonial = () => {
    // TODO: Implementar modal para nuevo testimonio
    console.log('Abrir modal para nuevo testimonio')
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mis Testimonios</h1>
          <p className="text-gray-600 mt-2">Comparte tu experiencia y ayuda a otros</p>
        </div>
          <button 
          onClick={handleNewTestimonial}
          className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center space-x-2"
        >
          <FiPlus size={20} />
          <span>Nuevo Testimonio</span>
        </button>
      </div>

      {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonio) => (
            <div key={testimonio.id_testimonio} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  {renderStars(testimonio.calificacion)}
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-[#ff6600] p-1">
                    <FiEdit3 size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-red-500 p-1">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{testimonio.comentario}</p>
              
              <div className="text-sm text-gray-500">
                Publicado el {new Date(testimonio.fecha).toLocaleDateString('es-ES')}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center">
          <FiStar size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-600 mb-2">No tienes testimonios aún</h3>
          <p className="text-gray-500 mb-6">Comparte tu experiencia con Victor's Health Synergy</p>          <button 
            onClick={handleNewTestimonial}
            className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform"
          >
            Escribir Mi Primer Testimonio
          </button>
        </div>
      )}
    </div>
  )
}
