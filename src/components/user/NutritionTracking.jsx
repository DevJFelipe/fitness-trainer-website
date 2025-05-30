// src/components/user/NutritionTracking.jsx
import { FiHeart, FiTrendingUp } from 'react-icons/fi'

export default function NutritionTracking() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Seguimiento Nutricional</h1>
      
      <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
        <FiHeart size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">Próximamente</h3>
        <p className="text-gray-500">El módulo de nutrición estará disponible pronto</p>
      </div>
    </div>
  )
}
