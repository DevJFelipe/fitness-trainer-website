// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BlogPage from './pages/BlogPage'
import BlogPost from './components/blog/BlogPost'
import BlogCategoryPage from './components/blog/BlogCategoryPage'
import ExercisesPage from './pages/ExercisesPage'
import MuscleGroupPage from './pages/MuscleGroupPage'
import RoutinesPage from './pages/RoutinesPage'
import RoutineDetailPage from './components/routines/RoutineDetailPage'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import TrainerDashboard from './pages/TrainerDashboard'
import TestConnection from './pages/TestConnection'
// Nuevas páginas
import AboutUsPage from './pages/AboutUsPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Login form */}
      <Route path="/login" element={<Login />} />

      {/* Register form */}
      <Route path="/register" element={<Register />} />

      {/* Nuevas páginas estáticas */}
      <Route path="/sobre-nosotros" element={<AboutUsPage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/contactanos" element={<ContactPage />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Trainer Dashboard */}
      <Route path="/trainer" element={<TrainerDashboard />} />

      {/* User Dashboard */}
      <Route path="/dashboard" element={<UserDashboard />} />      {/* Dashboard de blog */}
      <Route path="/blog" element={<BlogPage />} />

      {/* Páginas de categorías de blog */}
      <Route path="/blog/categoria/entrenamiento" element={<BlogCategoryPage category="entrenamiento" />} />
      <Route path="/blog/categoria/adelgazar" element={<BlogCategoryPage category="adelgazar" />} />

      {/* Página individual de blog */}
      <Route path="/blog/:id" element={<BlogPost />} />

      {/* Página principal de ejercicios */}
      <Route path="/ejercicios" element={<ExercisesPage />} />

      {/* Páginas de grupos musculares específicos */}
      <Route path="/ejercicios/:muscleGroup" element={<MuscleGroupPage />} />

      {/* Página de rutinas */}
      <Route path="/rutinas" element={<RoutinesPage />} />
      <Route path="/rutinas/:routineId" element={<RoutineDetailPage />} />

      {/* Página de prueba de conexión */}
      <Route path="/test" element={<TestConnection />} />

      {/* Cualquier otra ruta te redirige a "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
