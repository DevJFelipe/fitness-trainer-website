// src/components/user/WorkoutHistory.jsx
import { FiActivity, FiCalendar } from 'react-icons/fi'

export default function WorkoutHistory() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Historial de Entrenamientos</h1>
      
      <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
        <FiActivity size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">No hay entrenamientos registrados</h3>
        <p className="text-gray-500">Tus entrenamientos aparecerán aquí una vez que comiences</p>
      </div>
    </div>
  )
}
