import { useEffect, useState } from 'react'
import { supabase } from '../config/supabaseClient'
import { FaUserCircle, FaEdit } from 'react-icons/fa'
import AuthNavbar from '../components/layout/AuthNavbar'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      // Obtener usuario autenticado
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) {
        setUser(null)
        setLoading(false)
        return
      }
      // Buscar datos adicionales en la tabla Usuario
      const { data, error } = await supabase
        .from('Usuario')
        .select('nombre, correo, fecha_nacimiento, fecha_registro, rol')
        .eq('id_usuario', authUser.id)
        .single()
      if (error) {
        setUser(null)
      } else {
        setUser({ ...data, email: authUser.email })
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff6600]/10 to-white">
      <AuthNavbar />
      <div className="container mx-auto px-4 py-10 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center">
            <FaUserCircle className="text-gray-300" size={100} />
            <h2 className="text-3xl font-bold mt-4 mb-1 text-[#ff6600]">Mi Perfil</h2>
            {user && (
              <span className="text-gray-500 text-lg">{user.nombre}</span>
            )}
          </div>

          {loading ? (
            <div className="text-gray-500">Cargando datos...</div>
          ) : user ? (
            <div className="w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField label="Correo electrónico" value={user.correo || user.email} />
                <ProfileField label="Rol" value={user.rol || 'Usuario'} />
                <ProfileField label="Fecha de nacimiento" value={user.fecha_nacimiento ? new Date(user.fecha_nacimiento).toLocaleDateString() : 'No registrado'} />
                <ProfileField label="Fecha de registro" value={user.fecha_registro ? new Date(user.fecha_registro).toLocaleDateString() : 'No registrado'} />
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-5 py-2 bg-[#ff6600] text-white rounded-lg font-semibold hover:bg-orange-600 transition">
                  <FaEdit /> Editar Perfil
                </button>
              </div>
            </div>
          ) : (
            <div className="text-red-500">No se pudo cargar la información del usuario.</div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProfileField({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm flex flex-col">
      <span className="text-gray-500 text-sm font-medium mb-1">{label}</span>
      <span className="text-gray-800 text-lg font-semibold break-words">{value}</span>
    </div>
  )
} 