// src/components/user/PersonalGoals.jsx
import { useState } from 'react'
import { 
  FiTarget, 
  FiTrendingUp, 
  FiEdit3, 
  FiPlus, 
  FiTrash2, 
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiActivity,
  FiHeart,
  FiZap,
  FiAward,
  FiSave,
  FiX
} from 'react-icons/fi'

export default function PersonalGoals() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [userProfile, setUserProfile] = useState({
    fitnessLevel: 'beginner',
    primaryGoal: 'weight_loss',
    workoutFrequency: 3,
    availableTime: 45,
    preferredActivities: [],
    medicalConditions: '',
    currentWeight: '',
    targetWeight: '',
    height: '',
    age: '',
    gender: ''
  })

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Perder 5kg en 3 meses',
      category: 'weight_loss',
      currentValue: 75,
      targetValue: 70,
      unit: 'kg',
      deadline: '2025-08-29',
      status: 'in_progress',
      progress: 60,
      createdAt: '2025-05-01'
    },
    {
      id: 2,
      title: 'Correr 5km sin parar',
      category: 'endurance',
      currentValue: 2.5,
      targetValue: 5,
      unit: 'km',
      deadline: '2025-07-15',
      status: 'in_progress',
      progress: 50,
      createdAt: '2025-05-10'
    },
    {
      id: 3,
      title: 'Entrenar 4 veces por semana',
      category: 'consistency',
      currentValue: 3,
      targetValue: 4,
      unit: 'veces/semana',
      deadline: '2025-06-30',
      status: 'in_progress',
      progress: 75,
      createdAt: '2025-05-15'
    }
  ])

  const tabs = [
    { id: 'profile', label: 'Perfil de Fitness', icon: FiUser },
    { id: 'goals', label: 'Mis Objetivos', icon: FiTarget },
    { id: 'progress', label: 'Progreso', icon: FiTrendingUp }
  ]

  const fitnessLevels = [
    { id: 'beginner', label: 'Principiante', description: 'Poco o ningún ejercicio regular' },
    { id: 'intermediate', label: 'Intermedio', description: 'Ejercicio regular 2-3 veces por semana' },
    { id: 'advanced', label: 'Avanzado', description: 'Ejercicio intenso 4+ veces por semana' }
  ]

  const primaryGoals = [
    { id: 'weight_loss', label: 'Pérdida de peso', icon: FiTrendingUp, color: 'from-red-500 to-pink-500' },
    { id: 'muscle_gain', label: 'Ganancia muscular', icon: FiZap, color: 'from-blue-500 to-indigo-500' },
    { id: 'endurance', label: 'Resistencia', icon: FiActivity, color: 'from-green-500 to-teal-500' },
    { id: 'strength', label: 'Fuerza', icon: FiAward, color: 'from-purple-500 to-violet-500' },
    { id: 'health', label: 'Salud general', icon: FiHeart, color: 'from-pink-500 to-rose-500' }
  ]

  const goalCategories = [
    { id: 'weight_loss', label: 'Pérdida de peso', color: 'bg-red-100 text-red-800' },
    { id: 'muscle_gain', label: 'Ganancia muscular', color: 'bg-blue-100 text-blue-800' },
    { id: 'endurance', label: 'Resistencia', color: 'bg-green-100 text-green-800' },
    { id: 'strength', label: 'Fuerza', color: 'bg-purple-100 text-purple-800' },
    { id: 'consistency', label: 'Consistencia', color: 'bg-orange-100 text-orange-800' }
  ]
  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = () => {
    // Aquí se enviaría al backend
    console.log('Guardando perfil:', userProfile)
    // Mostrar notificación de éxito
  }

  const handleAddGoal = (goalData) => {
    const newGoal = {
      id: Date.now(),
      ...goalData,
      status: 'in_progress',
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setGoals(prev => [...prev, newGoal])
    setShowGoalModal(false)
  }

  const handleEditGoal = (goal) => {
    setEditingGoal(goal)
    setShowGoalModal(true)
  }

  const handleDeleteGoal = (goalId) => {
    setGoals(prev => prev.filter(g => g.id !== goalId))
  }

  const calculateProgress = (goal) => {
    if (goal.category === 'weight_loss') {
      const totalToLose = goal.currentValue - goal.targetValue
      const lost = goal.currentValue - goal.targetValue + (goal.progress / 100 * totalToLose)
      return Math.max(0, Math.min(100, (lost / totalToLose) * 100))
    }
    return goal.progress
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderProfileTab = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiUser className="mr-3 text-[#ff6600]" />
          Información Personal
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
            <input
              type="number"
              value={userProfile.age}
              onChange={(e) => handleProfileUpdate('age', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
              placeholder="Ej: 25"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
            <select
              value={userProfile.gender}
              onChange={(e) => handleProfileUpdate('gender', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
            <input
              type="number"
              value={userProfile.height}
              onChange={(e) => handleProfileUpdate('height', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
              placeholder="Ej: 175"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Peso actual (kg)</label>
            <input
              type="number"
              value={userProfile.currentWeight}
              onChange={(e) => handleProfileUpdate('currentWeight', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
              placeholder="Ej: 70"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiActivity className="mr-3 text-[#ff6600]" />
          Nivel de Fitness
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fitnessLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleProfileUpdate('fitnessLevel', level.id)}
              className={`p-6 rounded-xl text-left transition-all duration-200 border-2 ${
                userProfile.fitnessLevel === level.id
                  ? 'border-[#ff6600] bg-[#ff6600]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-bold text-gray-800 mb-2">{level.label}</h4>
              <p className="text-sm text-gray-600">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiTarget className="mr-3 text-[#ff6600]" />
          Objetivo Principal
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {primaryGoals.map((goal) => {
            const Icon = goal.icon
            return (
              <button
                key={goal.id}
                onClick={() => handleProfileUpdate('primaryGoal', goal.id)}
                className={`p-6 rounded-xl text-left transition-all duration-200 border-2 ${
                  userProfile.primaryGoal === goal.id
                    ? 'border-[#ff6600] bg-[#ff6600]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${goal.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white text-xl" />
                </div>
                <h4 className="font-bold text-gray-800">{goal.label}</h4>
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiClock className="mr-3 text-[#ff6600]" />
          Disponibilidad
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frecuencia semanal (días)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="7"
                value={userProfile.workoutFrequency}
                onChange={(e) => handleProfileUpdate('workoutFrequency', e.target.value)}
                className="flex-1"
              />
              <span className="font-bold text-[#ff6600] text-lg min-w-[3rem]">
                {userProfile.workoutFrequency} días
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo por sesión (minutos)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="15"
                max="120"
                step="15"
                value={userProfile.availableTime}
                onChange={(e) => handleProfileUpdate('availableTime', e.target.value)}
                className="flex-1"
              />
              <span className="font-bold text-[#ff6600] text-lg min-w-[3rem]">
                {userProfile.availableTime} min
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveProfile}
          className="px-8 py-3 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center"
        >
          <FiSave className="mr-2" />
          Guardar Perfil
        </button>
      </div>
    </div>
  )

  const renderGoalsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Mis Objetivos</h3>
        <button
          onClick={() => setShowGoalModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center"
        >
          <FiPlus className="mr-2" />
          Nuevo Objetivo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const category = goalCategories.find(c => c.id === goal.category)
          const progress = calculateProgress(goal)
          
          return (
            <div key={goal.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${category?.color}`}>
                      {category?.label}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                      {goal.status === 'in_progress' ? 'En progreso' : goal.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">{goal.title}</h4>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditGoal(goal)}
                    className="p-2 text-gray-400 hover:text-[#ff6600] transition-colors"
                  >
                    <FiEdit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progreso</span>
                  <span className="font-bold text-[#ff6600]">{Math.round(progress)}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    Actual: <span className="font-medium">{goal.currentValue} {goal.unit}</span>
                  </span>
                  <span className="text-gray-600">
                    Meta: <span className="font-medium">{goal.targetValue} {goal.unit}</span>
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="mr-2" />
                  Fecha límite: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderProgressTab = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Resumen de Progreso</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="text-white text-2xl" />
          </div>
          <h4 className="font-bold text-gray-800 text-2xl">
            {goals.filter(g => g.status === 'completed').length}
          </h4>
          <p className="text-gray-600">Objetivos completados</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiClock className="text-white text-2xl" />
          </div>
          <h4 className="font-bold text-gray-800 text-2xl">
            {goals.filter(g => g.status === 'in_progress').length}
          </h4>
          <p className="text-gray-600">En progreso</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#ff6600] to-[#ff8533] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiTrendingUp className="text-white text-2xl" />
          </div>
          <h4 className="font-bold text-gray-800 text-2xl">
            {Math.round(goals.reduce((acc, goal) => acc + calculateProgress(goal), 0) / goals.length)}%
          </h4>
          <p className="text-gray-600">Progreso promedio</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4">Objetivos por categoría</h4>
        <div className="space-y-3">
          {goalCategories.map((category) => {
            const categoryGoals = goals.filter(g => g.category === category.id)
            const avgProgress = categoryGoals.length > 0 
              ? categoryGoals.reduce((acc, goal) => acc + calculateProgress(goal), 0) / categoryGoals.length 
              : 0

            return (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                    {category.label}
                  </span>
                  <span className="text-sm text-gray-600">
                    {categoryGoals.length} objetivo{categoryGoals.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] h-2 rounded-full"
                      style={{ width: `${avgProgress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800 min-w-[3rem]">
                    {Math.round(avgProgress)}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Perfiles y Objetivos Personalizados</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#ff6600] border-b-2 border-[#ff6600]'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="p-6">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'goals' && renderGoalsTab()}
          {activeTab === 'progress' && renderProgressTab()}
        </div>
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <GoalModal
          goal={editingGoal}
          onClose={() => {
            setShowGoalModal(false)
            setEditingGoal(null)
          }}
          onSave={handleAddGoal}
          categories={goalCategories}
        />
      )}
    </div>
  )
}

// Modal para crear/editar objetivos
function GoalModal({ goal, onClose, onSave, categories }) {
  const [formData, setFormData] = useState({
    title: goal?.title || '',
    category: goal?.category || 'weight_loss',
    currentValue: goal?.currentValue || '',
    targetValue: goal?.targetValue || '',
    unit: goal?.unit || 'kg',
    deadline: goal?.deadline || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {goal ? 'Editar Objetivo' : 'Nuevo Objetivo'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
              placeholder="Ej: Perder 5kg en 3 meses"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valor actual</label>
              <input
                type="number"
                value={formData.currentValue}
                onChange={(e) => handleChange('currentValue', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valor objetivo</label>
              <input
                type="number"
                value={formData.targetValue}
                onChange={(e) => handleChange('targetValue', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unidad</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
              placeholder="Ej: kg, km, veces/semana"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha límite</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => handleChange('deadline', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white rounded-xl hover:shadow-lg transition-all duration-200"
            >
              {goal ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
