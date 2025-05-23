// src/components/ExercisesPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import AuthNavbar from '../components/layout/AuthNavbar'

const muscleGroups = [
  { name: "Pectorales",   image: "/src/assets/pecho.webp",        path: "/ejercicios/pectorales" },
  { name: "Espalda",      image: "/src/assets/espalda.webp",      path: "/ejercicios/espalda" },
  { name: "Bíceps",       image: "/src/assets/biceps.webp",       path: "/ejercicios/biceps" },
  { name: "Tríceps",      image: "/src/assets/triceps.webp",      path: "/ejercicios/triceps" },
  { name: "Abdomen",      image: "/src/assets/abdomen.png",       path: "/ejercicios/abdomen" },
  { name: "Hombros",      image: "/src/assets/hombro.webp",       path: "/ejercicios/hombros" },
  { name: "Pantorrillas", image: "/src/assets/pantorrillas.webp", path: "/ejercicios/pantorrillas" },
  { name: "Piernas",      image: "/src/assets/piernas.webp",      path: "/ejercicios/piernas" },
]

const recentExercises = [
  {
    title: "Sentadilla sobre Bosu",
    difficulty: "Intermedio",
    equipment: "Peso corporal",
    image: "/src/assets/ejercicios/sentadilla-bosu.webp",
    path: "/ejercicios/sentadilla-sobre-bosu"
  },
  {
    title: "Sentadilla sumo (sin equipo)",
    difficulty: "Principiante",
    equipment: "Peso corporal",
    image: "/src/assets/ejercicios/sentadilla-sumo.webp",
    path: "/ejercicios/sentadilla-sumo-sin-equipo"
  },
  {
    title: "Sentadilla sumo en máquina Smith",
    difficulty: "Intermedio",
    equipment: "Máquina",
    image: "/src/assets/ejercicios/sentadilla-smith.webp",
    path: "/ejercicios/sentadilla-sumo-maquina-smith"
  },
]

export default function ExercisesPage() {
  return (
    <div className="min-h-screen bg-white">
      <AuthNavbar />

      <main className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Todo sobre Ejercicios
          </h1>
          <p className="text-xl text-[#1A1A1A]/70">
            ¿Qué quieres entrenar hoy?
          </p>
        </div>

        {/* Muscle group grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {muscleGroups.map(group => (
            <Link
              key={group.name}
              to={group.path}
              className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center group"
            >
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-[#ff6600]/10 group-hover:border-[#ff6600]/30 transition-all duration-300">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-lg font-semibold text-[#1A1A1A] group-hover:text-[#ff6600] transition-colors duration-300">
                {group.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Recent exercises */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[#1A1A1A] mb-8">
            Ejercicios más recientes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentExercises.map(ex => (
              <Link
                key={ex.title}
                to={ex.path}
                className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <img
                    src={ex.image}
                    alt={ex.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-[#ff6600] group-hover:text-white transition-all duration-300">
                    <div className="w-0 h-0 border-t-5 border-t-transparent border-b-5 border-b-transparent border-l-8 border-l-[#ff6600] group-hover:border-l-white transition-colors duration-300" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block border border-[#1A1A1A]/30 text-sm py-1 px-3 rounded-full group-hover:bg-[#ff6600] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                      {ex.difficulty}
                    </span>
                    <span className="inline-block border border-[#1A1A1A]/30 text-sm py-1 px-3 rounded-full group-hover:bg-[#ff6600] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                      {ex.equipment}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] group-hover:text-[#ff6600] transition-colors duration-300">
                    {ex.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
