// src/components/admin/DashboardStats.jsx
import { 
  FiUsers, 
  FiFileText, 
  FiTarget, 
  FiStar,
  FiTrendingUp,
  FiEye
} from 'react-icons/fi'

export default function DashboardStats({ stats }) {
  const statsCards = [
    {
      title: 'Total Usuarios',
      value: stats.totalUsers,
      change: `+${stats.newUsersThisMonth} este mes`,
      changeType: 'positive',
      icon: FiUsers,
      color: 'bg-blue-500'
    },
    {
      title: 'Contenido Publicado',
      value: stats.publishedPosts,
      change: `${stats.totalPosts} total`,
      changeType: 'neutral',
      icon: FiFileText,
      color: 'bg-green-500'
    },
    {
      title: 'Planes Activos',
      value: stats.totalPlans,
      change: 'Todos los planes',
      changeType: 'neutral',
      icon: FiTarget,
      color: 'bg-[#ff6600]'
    },
    {
      title: 'Testimonios',
      value: stats.totalTestimonials,
      change: 'Comentarios de usuarios',
      changeType: 'neutral',
      icon: FiStar,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((card, index) => {
        const Icon = card.icon
        
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {card.value.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  {card.changeType === 'positive' && (
                    <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  )}
                  {card.changeType === 'neutral' && (
                    <FiEye className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <p className={`text-sm ${
                    card.changeType === 'positive' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {card.change}
                  </p>
                </div>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
