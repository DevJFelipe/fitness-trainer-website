// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './components/auth/Login'
import BlogPage from './pages/BlogPage'
import BlogPost from './components/blog/BlogPost'
import ExercisesPage from './pages/ExercisesPage'
import MuscleGroupPage from './pages/MuscleGroupPage'
import RoutinesPage from './pages/RoutinesPage'
import RoutineDetailPage from './components/routines/RoutineDetailPage'
import Register from './components/auth/Register'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Login form */}
      <Route path="/login" element={<Login />} />

      {/* Register form */}
      <Route path="/register" element={<Register />} />

      {/* Dashboard de blog */}
      <Route path="/blog" element={<BlogPage />} />

      {/* Página individual de blog */}
      <Route path="/blog/:id" element={<BlogPost />} />

      {/* Página principal de ejercicios */}
      <Route path="/ejercicios" element={<ExercisesPage />} />

      {/* Páginas de grupos musculares específicos */}
      <Route path="/ejercicios/:muscleGroup" element={<MuscleGroupPage />} />

      {/* Página de rutinas */}
      <Route path="/rutinas" element={<RoutinesPage />} />
      <Route path="/rutinas/:routineId" element={<RoutineDetailPage />} />

      {/* Página de perfil de usuario */}
      <Route path="/perfil" element={<Profile />} />

      {/* Cualquier otra ruta te redirige a "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
