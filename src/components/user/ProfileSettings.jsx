// src/components/user/ProfileSettings.jsx
import { useState } from 'react'
import { FiUser, FiMail, FiCalendar, FiSave } from 'react-icons/fi'

export default function ProfileSettings({ user }) {
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    correo: user?.correo || '',
    fecha_nacimiento: user?.fecha_nacimiento || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí implementarías la actualización del perfil
    console.log('Updating profile:', formData)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Configuración de Perfil</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiUser className="inline mr-2" />
              Nombre completo
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiMail className="inline mr-2" />
              Correo electrónico
            </label>
            <input
              type="email"
              value={formData.correo}
              onChange={(e) => setFormData({...formData, correo: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiCalendar className="inline mr-2" />
              Fecha de nacimiento
            </label>
            <input
              type="date"
              value={formData.fecha_nacimiento}
              onChange={(e) => setFormData({...formData, fecha_nacimiento: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center space-x-2"
          >
            <FiSave size={20} />
            <span>Guardar Cambios</span>
          </button>
        </form>
      </div>
    </div>
  )
}
