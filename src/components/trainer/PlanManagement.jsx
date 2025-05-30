// src/components/trainer/PlanManagement.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { 
  TrashIcon, 
  EyeIcon, 
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { planService } from '../../services'
import { useAuth } from '../../contexts/AuthContext'

export default function PlanManagement({ onPlanDeleted }) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('templates')
  const [templates, setTemplates] = useState([])
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [planToDelete, setPlanToDelete] = useState(null)
  const [deleteType, setDeleteType] = useState(null) // 'template' o 'assignment'
  // Cargar datos
  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [templatesResult, assignmentsResult] = await Promise.all([
        planService.getTrainerPlans(user.id_usuario),
        planService.getTrainerAssignedPlans(user.id_usuario)
      ])

      setTemplates(templatesResult.success ? templatesResult.plans : [])
      setAssignments(assignmentsResult.success ? assignmentsResult.plans : [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }, [user?.id_usuario])

  useEffect(() => {
    if (user?.id_usuario) {
      loadData()
    }
  }, [user, loadData])

  // Manejar eliminación
  const handleDelete = (plan, type) => {
    setPlanToDelete(plan)
    setDeleteType(type)
    setShowConfirmModal(true)
  }

  const confirmDelete = async () => {
    if (!planToDelete || !deleteType) return

    try {
      setDeleteLoading(planToDelete.id_plan)
      
      let result
      if (deleteType === 'template') {
        result = await planService.deletePlan(planToDelete.id_plan, user.id_usuario)
      } else {
        result = await planService.removeAssignment(planToDelete.id_plan, user.id_usuario)
      }      if (result.success) {
        // Actualizar listas localmente
        if (deleteType === 'template') {
          setTemplates(prev => prev.filter(p => p.id_plan !== planToDelete.id_plan))
        } else {
          setAssignments(prev => prev.filter(p => p.id_plan !== planToDelete.id_plan))
        }
        
        // Llamar al callback para actualizar el dashboard principal
        if (onPlanDeleted) {
          onPlanDeleted()
        }
        
        alert(result.message)
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Error al eliminar')
    } finally {
      setDeleteLoading(null)
      setShowConfirmModal(false)
      setPlanToDelete(null)
      setDeleteType(null)
    }
  }

  const cancelDelete = () => {
    setShowConfirmModal(false)
    setPlanToDelete(null)
    setDeleteType(null)
  }

  // Componente para tarjeta de plan
  const PlanCard = ({ plan, type, onDelete }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Plan {plan.tipo} - {plan.nivel}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              plan.activo 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {plan.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>{plan.frecuencia} veces/semana</span>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(plan.fecha_inicio).toLocaleDateString('es-ES')}</span>
            </div>
            {type === 'assignment' && plan.usuario && (
              <div className="flex items-center space-x-1 col-span-2">
                <UserIcon className="h-4 w-4" />
                <span>Asignado a: {plan.usuario.nombre}</span>
              </div>
            )}
          </div>

          {plan.descripcion && (
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
              {plan.descripcion}
            </p>
          )}
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Ver detalles"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Editar"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(plan, type)}
            disabled={deleteLoading === plan.id_plan}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title={type === 'template' ? 'Eliminar plan' : 'Eliminar asignación'}
          >
            {deleteLoading === plan.id_plan ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
            ) : (
              <TrashIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6600]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Planes</h2>
        <p className="text-gray-600">Administra tus plantillas de planes y asignaciones</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-[#ff6600] text-[#ff6600]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Plantillas de Planes ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'assignments'
                ? 'border-[#ff6600] text-[#ff6600]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Planes Asignados ({assignments.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'templates' && (
          <>
            {templates.length > 0 ? (
              templates.map(plan => (
                <PlanCard
                  key={plan.id_plan}
                  plan={plan}
                  type="template"
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay plantillas de planes
                </h3>
                <p className="text-gray-500">
                  Crea tu primera plantilla de plan para comenzar
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === 'assignments' && (
          <>
            {assignments.length > 0 ? (
              assignments.map(plan => (
                <PlanCard
                  key={plan.id_plan}
                  plan={plan}
                  type="assignment"
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <UserIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay planes asignados
                </h3>
                <p className="text-gray-500">
                  Asigna planes a usuarios para verlos aquí
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {deleteType === 'template' ? 'Eliminar Plantilla' : 'Eliminar Asignación'}
                </h3>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                {deleteType === 'template' 
                  ? '¿Estás seguro de que quieres eliminar esta plantilla de plan? Esta acción no se puede deshacer.'
                  : '¿Estás seguro de que quieres eliminar esta asignación? El usuario ya no tendrá acceso a este plan.'
                }
              </p>
              {planToDelete && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">
                    Plan {planToDelete.tipo} - {planToDelete.nivel}
                  </p>
                  {deleteType === 'assignment' && planToDelete.usuario && (
                    <p className="text-sm text-gray-600">
                      Asignado a: {planToDelete.usuario.nombre}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                {deleteType === 'template' ? 'Eliminar Plantilla' : 'Eliminar Asignación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
