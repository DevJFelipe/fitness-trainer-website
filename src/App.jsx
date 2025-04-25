// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import BlogPage from './components/BlogPage'
import BlogPost from './components/BlogPost'
import ExercisesPage from './components/ExercisesPage'
import MuscleGroupPage from './components/MuscleGroupPage'
import RoutinesPage from './components/RoutinesPage'

export default function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Login form */}
      <Route path="/login" element={<Login />} />

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

      {/* Cualquier otra ruta te redirige a "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
