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
import { supabase } from '../config/supabaseClient'

export default function TrainerDashboard() {  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('stats')
  const [detailView, setDetailView] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    plans: [],
    assignedPlans: [],
    users: []
  })  // Función para cargar datos del dashboard
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true)
        // Cargar planes plantilla del entrenador y planes asignados
      const [templatesResult, assignedResult, usersResult] = await Promise.all([
        planService.getTrainerPlans(user.id_usuario),
        planService.getTrainerAssignedPlans(user.id_usuario),
        usuarioService.getAllUsuarios()
      ])

      // TEMPORAL: También probar método simple para comparación
      const simpleAssignedResult = await planService.getTrainerAssignedPlansSimple(user.id_usuario)
      console.log('🔍 COMPARISON - Simple method result:', simpleAssignedResult)

      const templates = templatesResult.success ? templatesResult.plans : []
      const assignedPlans = assignedResult.success ? assignedResult.plans : []
      const allUsers = usersResult.success ? usersResult.users : []
        console.log('🔍 Debug TrainerDashboard:')
      console.log('Trainer ID:', user.id_usuario)
      console.log('Trainer name:', user.nombre)
      console.log('Templates result:', templatesResult)
      console.log('Assigned plans result:', assignedResult)
      console.log('Templates count:', templates.length)
      console.log('Assigned plans count:', assignedPlans.length)
      console.log('All users count:', allUsers.length)
        // Debug completo de base de datos
      try {
        const { data: allPlansInDB, error: _allPlansError } = await supabase
          .from('plan')
          .select(`
            *,
            usuario:id_usuario(id_usuario, nombre, correo, rol)
          `)
          .order('fecha_inicio', { ascending: false })
        
        console.log('🔍 ALL PLANS IN DATABASE:', allPlansInDB)
        console.log('🔍 Plans that are not from this trainer:', allPlansInDB?.filter(p => p.id_usuario !== user.id_usuario))
        console.log('🔍 Plans with trainer assignment pattern:', allPlansInDB?.filter(p => 
          p.descripcion && p.descripcion.includes('[Asignado por:')
        ))
        console.log('🔍 Plans assigned by this trainer:', allPlansInDB?.filter(p => 
          p.descripcion && p.descripcion.includes(`[Asignado por: ${user.nombre}]`)
        ))
      } catch (error) {
        console.log('🔍 Error getting all plans:', error)
      }
      
      // Filtrar solo usuarios regulares
      const regularUsers = allUsers.filter(u => {
        console.log('Checking user:', u.nombre, 'Role object:', u.rol, 'Role name:', u.rol?.nombre_rol)
        return u.rol?.nombre_rol === 'usuario'
      })
      
      console.log('🔍 Regular users filtered:', regularUsers.length)
      console.log('🔍 Regular users:', regularUsers)

      // Combinar plantillas y planes asignados para las estadísticas
      const allPlans = [...templates, ...assignedPlans]      // Calcular estadísticas
      const stats = {
        totalPlans: allPlans.length,
        activePlans: allPlans.filter(p => p.activo).length,
        assignedUsers: new Set(assignedPlans.map(p => p.id_usuario)).size,
        totalUsers: regularUsers.length
      }

      console.log('🔍 Stats calculation:')
      console.log('All plans (templates + assigned):', allPlans)
      console.log('Assigned plans for stats:', assignedPlans)
      console.log('User IDs from assigned plans:', assignedPlans.map(p => p.id_usuario))
      console.log('Unique user IDs:', new Set(assignedPlans.map(p => p.id_usuario)))
      console.log('Assigned users count:', new Set(assignedPlans.map(p => p.id_usuario)).size)
      console.log('Final stats:', stats)

      setDashboardData({
        stats,
        plans: templates, // Para asignación, solo usar plantillas
        assignedPlans, // Planes ya asignados
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
            {/* Vistas detalladas tienen prioridad */}            {detailView === 'total-plans' && (
              <TotalPlansView 
                plans={[...dashboardData.plans, ...dashboardData.assignedPlans]}
                onBack={handleBackToStats}
              />
            )}
            
            {detailView === 'active-plans' && (
              <ActivePlansView 
                plans={[...dashboardData.plans, ...dashboardData.assignedPlans]}
                onBack={handleBackToStats}
              />
            )}
            
            {detailView === 'assigned-users' && (
              <AssignedUsersView 
                plans={dashboardData.assignedPlans}
                users={dashboardData.users}
                onBack={handleBackToStats}
              />
            )}
            
            {detailView === 'available-users' && (
              <AvailableUsersView 
                users={dashboardData.users}
                plans={dashboardData.assignedPlans}
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
