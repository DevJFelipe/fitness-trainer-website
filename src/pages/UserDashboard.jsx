// src/pages/UserDashboard.jsx
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  planService, 
  testimonioService
} from '../services'
import UserSidebar from '../components/user/UserSidebar'
import UserHeader from '../components/user/UserHeader'
import ProgressOverview from '../components/user/ProgressOverview'
import MyPlans from '../components/user/MyPlans'
import MyTestimonials from '../components/user/MyTestimonials'
import ProfileSettings from '../components/user/ProfileSettings'
import NutritionTracking from '../components/user/NutritionTracking'
import WorkoutHistory from '../components/user/WorkoutHistory'
import PersonalGoals from '../components/user/PersonalGoals'

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    plans: [],
    testimonials: [],
    progress: {},
    workouts: [],
    nutrition: {},
    stats: {
      totalWorkouts: 0,
      currentStreak: 0,
      completedPlans: 0,
      averageRating: 0
    }  })

  const loadDashboardData = useCallback(async () => {
    setLoading(true)
    try {
      // Cargar datos del usuario paralelos
      const [plansResult, testimonialsResult] = await Promise.all([
        planService.getUserPlans(user.id_usuario),
        testimonioService.getUserTestimonios(user.id_usuario)
      ])

      const plans = plansResult.success ? plansResult.plans : []
      const testimonials = testimonialsResult.success ? testimonialsResult.testimonios : []

      // Calcular estadísticas del usuario
      const completedPlans = plans.filter(plan => plan.estado === 'completado').length
      const averageRating = testimonials.length > 0 
        ? testimonials.reduce((sum, t) => sum + (t.calificacion || 0), 0) / testimonials.length 
        : 0

      // Datos simulados para progreso (en una implementación real vendrían de la API)
      const progressData = {
        weight: {
          current: 75,
          goal: 70,
          history: [
            { date: '2024-01', value: 80 },
            { date: '2024-02', value: 78 },
            { date: '2024-03', value: 76 },
            { date: '2024-04', value: 75 }
          ]
        },
        strength: {
          benchPress: { current: 80, goal: 100 },
          squat: { current: 120, goal: 150 },
          deadlift: { current: 140, goal: 180 }
        },
        endurance: {
          runTime: { current: '30:00', goal: '25:00' },
          distance: { current: 5, goal: 10 }
        }
      }

      setDashboardData({
        plans,
        testimonials,
        progress: progressData,
        workouts: [],
        nutrition: {},
        stats: {
          totalWorkouts: 45,
          currentStreak: 7,
          completedPlans,
          averageRating: Math.round(averageRating * 10) / 10
        }
      })
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
      loadDashboardData()
  }, [user, navigate, loadDashboardData])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderActiveSection = () => {
    console.log('Rendering section:', activeSection)
    console.log('Dashboard data:', dashboardData)
    
    switch (activeSection) {
      case 'overview':
        return <ProgressOverview data={dashboardData} user={user} />
      case 'plans':
        return <MyPlans plans={dashboardData.plans} />
      case 'testimonials':
        return <MyTestimonials testimonials={dashboardData.testimonials} />
      case 'nutrition':
        return <NutritionTracking />
      case 'workouts':
        return <WorkoutHistory />
      case 'profile':
        return <ProfileSettings user={user} />
      case 'goals':
        return <PersonalGoals />
      default:
        return <ProgressOverview data={dashboardData} user={user} />
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#ff6600]/20"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#ff6600] border-t-transparent absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <p className="text-2xl text-gray-700 font-bold mb-2">Cargando tu dashboard...</p>
            <p className="text-gray-500 font-medium">Preparando tu experiencia personalizada</p>
          </div>
        </div>
      </div>
    )
  }  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6]">
      {/* Sidebar */}
      <UserSidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-20'}`}>
        {/* Header */}
        <UserHeader 
          user={user}
          onLogout={handleLogout}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  )
}
