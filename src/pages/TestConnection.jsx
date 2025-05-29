// src/pages/TestConnection.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState('Probando...')
  const [tables, setTables] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    testConnection()
  }, [])
  const testConnection = async () => {
    try {
      console.log('Iniciando prueba de conexión...')
      setError(null)
        // Prueba 1: Verificar conexión básica y permisos de esquema
      setConnectionStatus('Verificando permisos de esquema...')
      const { error } = await supabase
        .from('rol')
        .select('count')
        .limit(1)

      if (error) {
        console.error('Error en prueba básica:', error)
        if (error.message.includes('permission denied for schema public')) {
          setError(`❌ PostgreSQL 15 Schema Issue: ${error.message}. 
                   Ejecuta el script postgresql15-schema-fix.sql en Supabase SQL Editor.`)
        } else {
          setError(`Error básico: ${error.message}`)
        }
        setConnectionStatus('Error de conexión')
        return
      }

      console.log('Conexión básica exitosa')
      setConnectionStatus('Conectado - Probando tablas...')

      // Prueba 2: Intentar obtener roles
      const { data: roles, error: rolesError } = await supabase
        .from('rol')
        .select('*')

      if (rolesError) {
        console.error('Error obteniendo roles:', rolesError)
        setError(`Error roles: ${rolesError.message}`)
      } else {
        console.log('Roles obtenidos:', roles)
        setTables(prev => [...prev, { name: 'rol', count: roles?.length || 0, data: roles }])
      }

      // Prueba 3: Intentar obtener usuarios
      setConnectionStatus('Probando tabla usuarios...')
      const { data: usuarios, error: usuariosError } = await supabase
        .from('usuario')
        .select('*')

      if (usuariosError) {
        console.error('Error obteniendo usuarios:', usuariosError)
        setError(`Error usuarios: ${usuariosError.message}`)
      } else {
        console.log('Usuarios obtenidos:', usuarios)
        setTables(prev => [...prev, { name: 'usuario', count: usuarios?.length || 0, data: usuarios }])
      }

      setConnectionStatus('✅ Todas las pruebas exitosas!')

    } catch (err) {
      console.error('Error general:', err)
      setError(`Error general: ${err.message}`)
      setConnectionStatus('❌ Error')
    }
  }

  const testDirectLogin = async () => {
    try {
      console.log('Probando login directo...')
      
      const { data: usuario, error } = await supabase
        .from('usuario')
        .select(`
          *,
          rol (
            nombre_rol,
            descripcion
          )
        `)
        .eq('correo', 'usuario@demo.com')
        .eq('contrasena', 'usuario123')
        .single()

      if (error) {
        console.error('Error en login directo:', error)
        setError(`Error login: ${error.message}`)
      } else {
        console.log('Login exitoso:', usuario)
        alert('Login exitoso! Ver consola para detalles.')
      }
    } catch (err) {
      console.error('Error en login directo:', err)
      setError(`Error login directo: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Prueba de Conexión Supabase</h1>
        
        {/* Estado de conexión */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Estado de Conexión</h2>
          <p className={`font-medium ${connectionStatus === 'Conectado' ? 'text-green-600' : connectionStatus === 'Error' ? 'text-red-600' : 'text-yellow-600'}`}>
            {connectionStatus}
          </p>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Información de configuración */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuración</h2>
          <p><strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL}</p>
          <p><strong>Key:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
        </div>

        {/* Botones de prueba */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Pruebas</h2>
          <div className="space-x-4">
            <button 
              onClick={testConnection}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Reconectar
            </button>
            <button 
              onClick={testDirectLogin}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Probar Login Directo
            </button>
          </div>
        </div>

        {/* Datos de tablas */}
        {tables.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Datos de Tablas</h2>
            {tables.map((table, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium text-lg">{table.name} ({table.count} registros)</h3>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-40">
                  {JSON.stringify(table.data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
