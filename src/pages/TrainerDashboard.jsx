// src/pages/TrainerDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import TrainerSidebar from '../components/trainer/TrainerSidebar'
import TrainerHeader from '../components/trainer/TrainerHeader'
import TrainerStats from '../components/trainer/TrainerStats'
import PlanCreation from '../components/trainer/PlanCreation'
import UserAssignment from '../components/trainer/UserAssignment'
import { 
  TotalPlansView, 
  ActivePlansView, 
  AssignedUsersView, 
  AvailableUsersView 
} from '../components/trainer/DetailedViews'
import { planService, usuarioService } from '../services'

export default function TrainerDashboard() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('stats')
  const [detailView, setDetailView] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    plans: [],
    users: []  })

  // Función para cargar datos del dashboard
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      
      // Cargar planes del entrenador
      const plansResult = await planService.getTrainerPlans(user.id_usuario)
      const plans = plansResult.success ? plansResult.plans : []

      // Cargar usuarios disponibles para asignar planes
      const usersResult = await usuarioService.getAllUsuarios()
      const allUsers = usersResult.success ? usersResult.users : []
      
      // Filtrar solo usuarios regulares
      const regularUsers = allUsers.filter(u => u.rol?.nombre_rol === 'usuario')

      // Calcular estadísticas
      const stats = {
        totalPlans: plans.length,
        activePlans: plans.filter(p => p.activo).length,
        assignedUsers: new Set(plans.map(p => p.id_usuario)).size,
        totalUsers: regularUsers.length
      }

      setDashboardData({
        stats,
        plans,
        users: regularUsers
      })
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  // Funciones para manejar vistas detalladas
  const handleViewDetails = (viewType) => {
    setDetailView(viewType)
    setActiveTab('stats') // Mantener en la pestaña stats
  }

  const handleBackToStats = () => {
    setDetailView(null)
  }

  // Verificar autenticación y permisos de entrenador
  useEffect(() => {
    if (!authLoading && (!user || user.rol?.nombre_rol !== 'entrenador')) {
      navigate('/login')
      return
    }
  }, [user, authLoading, navigate])

  // Cargar datos del dashboard
  useEffect(() => {
    if (user && user.rol?.nombre_rol === 'entrenador') {
      loadDashboardData()
    }
  }, [user, loadDashboardData])

  const handlePlanCreated = () => {
    loadDashboardData()
  }

  const handlePlanAssigned = () => {
    loadDashboardData()
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#ff6600]"></div>
      </div>
    )
  }

  if (!user || user.rol?.nombre_rol !== 'entrenador') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <TrainerSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <TrainerHeader user={user} />
        
        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">          <div className="container mx-auto px-6 py-8">
            {/* Vistas detalladas tienen prioridad */}
            {detailView === 'total-plans' && (
              <TotalPlansView 
                plans={dashboardData.plans}
                onBack={handleBackToStats}
              />
            )}
            
            {detailView === 'active-plans' && (
              <ActivePlansView 
                plans={dashboardData.plans}
                onBack={handleBackToStats}
              />
            )}
            
            {detailView === 'assigned-users' && (
              <AssignedUsersView 
                plans={dashboardData.plans}
                users={dashboardData.users}
                onBack={handleBackToStats}
              />
            )}
            
            {detailView === 'available-users' && (
              <AvailableUsersView 
                users={dashboardData.users}
                plans={dashboardData.plans}
                onBack={handleBackToStats}
              />
            )}

            {/* Contenido normal de las pestañas cuando no hay vista detallada */}
            {!detailView && activeTab === 'stats' && (
              <TrainerStats 
                data={dashboardData} 
                onViewDetails={handleViewDetails} 
              />
            )}
            
            {!detailView && activeTab === 'create-plan' && (
              <PlanCreation onPlanCreated={handlePlanCreated} />
            )}
            
            {!detailView && activeTab === 'assign-plan' && (
              <UserAssignment 
                plans={dashboardData.plans}
                users={dashboardData.users}
                onPlanAssigned={handlePlanAssigned}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
