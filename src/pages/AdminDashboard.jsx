// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  usuarioService, 
  blogService, 
  planService, 
  testimonioService
} from '../services'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'
import DashboardStats from '../components/admin/DashboardStats'
import UsersManagement from '../components/admin/UsersManagement'
import ContentManagement from '../components/admin/ContentManagement'
import PlansManagement from '../components/admin/PlansManagement'
import TestimonialsManagement from '../components/admin/TestimonialsManagement'
import AnalyticsView from '../components/admin/AnalyticsView'

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    users: [],
    posts: [],
    plans: [],
    testimonials: [],
    stats: {
      totalUsers: 0,
      totalPosts: 0,
      totalPlans: 0,
      totalTestimonials: 0,
      newUsersThisMonth: 0,
      publishedPosts: 0
    }
  })

  // Verificar si el usuario es admin
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    
    if (!isAdmin) {
      navigate('/')
      return
    }

    loadDashboardData()
  }, [user, isAdmin, navigate])

  const loadDashboardData = async () => {
    setLoading(true)
    try {      // Cargar datos paralelos
      const [usersResult, postsResult, plansResult, testimonialsResult] = await Promise.all([
        usuarioService.getAllUsuarios(),
        blogService.getAllPosts(),
        planService.getAllPlans(),
        testimonioService.getAllTestimonios()
      ])

      const users = usersResult.success ? usersResult.users : []
      const posts = postsResult.success ? postsResult.posts : []
      const plans = plansResult.success ? plansResult.plans : []
      const testimonials = testimonialsResult.success ? testimonialsResult.data : []

      // Calcular estadísticas
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth()
      const currentYear = currentDate.getFullYear()

      const newUsersThisMonth = users.filter(user => {
        const userDate = new Date(user.fecha_registro)
        return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear
      }).length

      const publishedPosts = posts.filter(post => post.visibilidad === 'publico').length

      setDashboardData({
        users,
        posts,
        plans,
        testimonials,
        stats: {
          totalUsers: users.length,
          totalPosts: posts.length,
          totalPlans: plans.length,
          totalTestimonials: testimonials.length,
          newUsersThisMonth,
          publishedPosts
        }
      })
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <DashboardStats stats={dashboardData.stats} />
            <AnalyticsView data={dashboardData} />
          </div>
        )
      case 'users':
        return <UsersManagement users={dashboardData.users} onUpdate={loadDashboardData} />
      case 'content':
        return <ContentManagement posts={dashboardData.posts} onUpdate={loadDashboardData} />
      case 'plans':
        return <PlansManagement plans={dashboardData.plans} />
      case 'testimonials':
        return <TestimonialsManagement testimonials={dashboardData.testimonials} />
      case 'analytics':
        return <AnalyticsView data={dashboardData} />
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Panel de configuración en desarrollo...</p>
            </div>
          </div>
        )
      default:
        return <DashboardStats stats={dashboardData.stats} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6600]"></div>
          <p className="text-gray-600">Cargando panel administrativo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} lg:ml-16`}>
        {/* Header */}
        <AdminHeader 
          user={user}
          onLogout={handleLogout}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="p-6">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  )
}
