// src/components/admin/AnalyticsView.jsx
import { 
  FiTrendingUp, 
  FiUsers, 
  FiFileText, 
  FiCalendar,
  FiActivity
} from 'react-icons/fi'

export default function AnalyticsView({ data }) {
  // Datos simulados para las gráficas (en una implementación real vendrían de la API)
  const monthlyData = [
    { month: 'Ene', users: 12, posts: 3 },
    { month: 'Feb', users: 18, posts: 5 },
    { month: 'Mar', users: 25, posts: 8 },
    { month: 'Abr', users: 32, posts: 12 },
    { month: 'May', users: 45, posts: 15 },
    { month: 'Jun', users: 38, posts: 18 },
  ]

  const topContent = data.posts
    .sort((a, b) => (b.vistas || Math.floor(Math.random() * 1000)) - (a.vistas || Math.floor(Math.random() * 1000)))
    .slice(0, 5)

  const recentActivity = [
    { type: 'user', message: 'Nuevo usuario registrado: Juan Pérez', time: '5 min' },
    { type: 'content', message: 'Nuevo post publicado: "Ejercicios para principiantes"', time: '1 hora' },
    { type: 'plan', message: 'Plan "Fuerza y Resistencia" actualizado', time: '2 horas' },
    { type: 'user', message: 'Usuario María López actualizó su perfil', time: '3 horas' },
    { type: 'content', message: 'Post "Nutrición deportiva" editado', time: '5 horas' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analíticas y Reportes</h2>

      {/* Gráfica de crecimiento mensual */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Crecimiento Mensual</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {monthlyData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center space-y-1 mb-2">
                {/* Barra de usuarios */}
                <div 
                  className="w-8 bg-[#ff6600] rounded-t"
                  style={{ height: `${(item.users / 50) * 200}px` }}
                  title={`${item.users} usuarios`}
                />
                {/* Barra de posts */}
                <div 
                  className="w-8 bg-blue-500 rounded-t"
                  style={{ height: `${(item.posts / 20) * 100}px` }}
                  title={`${item.posts} posts`}
                />
              </div>
              <span className="text-xs text-gray-500">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#ff6600] rounded"></div>
            <span className="text-sm text-gray-600">Usuarios</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Posts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contenido más popular */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiTrendingUp className="w-5 h-5 mr-2 text-[#ff6600]" />
            Contenido Más Popular
          </h3>
          <div className="space-y-3">
            {topContent.map((content, index) => (
              <div key={content.id_contenido} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm line-clamp-1">
                    {content.titulo}
                  </p>
                  <p className="text-xs text-gray-500">
                    {content.tipo} • {new Date(content.fecha_publicacion || content.fecha_creacion).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-[#ff6600]">
                    #{index + 1}
                  </span>
                  <span className="text-xs text-gray-500">
                    {Math.floor(Math.random() * 1000)} vistas
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiActivity className="w-5 h-5 mr-2 text-[#ff6600]" />
            Actividad Reciente
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 py-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'content' ? 'bg-green-100' :
                  'bg-orange-100'
                }`}>
                  {activity.type === 'user' && <FiUsers className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'content' && <FiFileText className="w-4 h-4 text-green-600" />}
                  {activity.type === 'plan' && <FiCalendar className="w-4 h-4 text-orange-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 line-clamp-2">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas de engagement */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Engagement</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#ff6600] to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-lg">
                {Math.round((data.stats.publishedPosts / data.stats.totalPosts) * 100) || 0}%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900">Contenido Publicado</p>
            <p className="text-xs text-gray-500">del total creado</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-lg">
                {data.stats.newUsersThisMonth}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900">Nuevos Usuarios</p>
            <p className="text-xs text-gray-500">este mes</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-lg">
                {data.stats.totalPlans}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900">Planes Activos</p>
            <p className="text-xs text-gray-500">disponibles</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-lg">
                {data.stats.totalTestimonials}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900">Testimonios</p>
            <p className="text-xs text-gray-500">de usuarios</p>
          </div>
        </div>
      </div>
    </div>
  )
}
