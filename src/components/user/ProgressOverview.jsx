// src/components/user/ProgressOverview.jsx
import { useState } from 'react'
import { 
  FiTrendingUp, 
  FiTarget, 
  FiAward, 
  FiCalendar,
  FiActivity,
  FiHeart,
  FiZap,
  FiBarChart2
} from 'react-icons/fi'

export default function ProgressOverview({ data, user }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month')

  const timeframes = [
    { id: 'week', label: 'Esta semana' },
    { id: 'month', label: 'Este mes' },
    { id: 'year', label: 'Este año' }
  ]

  const statsCards = [
    {
      title: 'Entrenamientos Totales',
      value: data.stats.totalWorkouts,
      change: '+12%',
      icon: FiActivity,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Racha Actual',
      value: `${data.stats.currentStreak} días`,
      change: '+2 días',
      icon: FiZap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Planes Completados',
      value: data.stats.completedPlans,
      change: '+1',
      icon: FiTarget,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Calificación Promedio',
      value: data.stats.averageRating || 'N/A',
      change: '+0.2',
      icon: FiAward,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const achievements = [
    {
      title: 'Primera Semana',
      description: 'Completaste tu primera semana de entrenamiento',
      icon: '🏆',
      earned: true,
      date: '2024-01-15'
    },
    {
      title: 'Racha de Fuego',
      description: 'Entrenaste 7 días consecutivos',
      icon: '🔥',
      earned: true,
      date: '2024-02-01'
    },
    {
      title: 'Fuerza Bestial',
      description: 'Alcanzaste 100kg en press de banca',
      icon: '💪',
      earned: false,
      progress: 80
    },
    {
      title: 'Maratonista',
      description: 'Corriste 10km sin parar',
      icon: '🏃‍♂️',
      earned: false,
      progress: 50
    }
  ]

  const weeklyProgress = [
    { day: 'Lun', completed: true, type: 'strength' },
    { day: 'Mar', completed: true, type: 'cardio' },
    { day: 'Mié', completed: true, type: 'strength' },
    { day: 'Jue', completed: false, type: 'rest' },
    { day: 'Vie', completed: true, type: 'cardio' },
    { day: 'Sáb', completed: true, type: 'strength' },
    { day: 'Dom', completed: true, type: 'rest' }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              ¡Bienvenido de vuelta, {user?.nombre?.split(' ')[0]}! 🎯
            </h1>
            <p className="text-orange-100 text-lg">
              Estás a {Math.round((data.progress.weight?.goal - data.progress.weight?.current) || 0)}kg de tu objetivo de peso
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-orange-100 text-sm">Racha actual</p>
            <p className="text-4xl font-bold">{data.stats.currentStreak}</p>
            <p className="text-orange-100 text-sm">días consecutivos</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`text-xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Progress Charts and Weekly Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weight Progress Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Progreso de Peso</h3>
            <div className="flex space-x-2">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.id}
                  onClick={() => setSelectedTimeframe(timeframe.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeframe === timeframe.id
                      ? 'bg-[#ff6600] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Simplified Chart Display */}
          <div className="relative h-64 flex items-end justify-between space-x-2 mb-4">
            {data.progress.weight?.history?.map((point, index) => {
              const height = ((point.value - 60) / 20) * 100; // Normalize to percentage
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-[#ff6600] to-[#ff8533] rounded-t-lg min-h-[20px] transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{point.date}</span>
                </div>
              )
            })}
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>Peso actual: <strong>{data.progress.weight?.current}kg</strong></span>
            <span>Objetivo: <strong>{data.progress.weight?.goal}kg</strong></span>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Esta Semana</h3>
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{day.day}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    day.type === 'strength' ? 'bg-blue-100 text-blue-600' :
                    day.type === 'cardio' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {day.type === 'strength' ? 'Fuerza' : 
                     day.type === 'cardio' ? 'Cardio' : 'Descanso'}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    day.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}>
                    {day.completed && '✓'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <FiTrendingUp className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">Progreso semanal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '85%' }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">5 de 6 entrenamientos completados</p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Logros y Medallas 🏆</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                achievement.earned 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="text-center">
                <span className="text-4xl mb-2 block">{achievement.icon}</span>
                <h4 className={`font-bold mb-1 ${
                  achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                
                {achievement.earned ? (
                  <span className="text-xs text-yellow-600 font-medium">
                    Obtenido el {achievement.date}
                  </span>
                ) : (
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{achievement.progress}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white p-6 rounded-xl hover:scale-105 transition-transform shadow-lg">
          <FiActivity size={24} className="mb-2" />
          <h3 className="font-bold text-lg">Nuevo Entrenamiento</h3>
          <p className="text-orange-100 text-sm">Comienza tu sesión diaria</p>
        </button>
        
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:scale-105 transition-transform shadow-lg">
          <FiBarChart2 size={24} className="mb-2" />
          <h3 className="font-bold text-lg">Ver Estadísticas</h3>
          <p className="text-blue-100 text-sm">Revisa tu progreso detallado</p>
        </button>
        
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl hover:scale-105 transition-transform shadow-lg">
          <FiHeart size={24} className="mb-2" />
          <h3 className="font-bold text-lg">Plan Nutricional</h3>
          <p className="text-green-100 text-sm">Revisa tu dieta de hoy</p>
        </button>
      </div>
    </div>
  )
}
