import React from 'react';
import AuthNavbar from './AuthNavbar';

const routines = [
  {
    id: 1,
    title: 'Rutina de Fuerza para Principiantes',
    description: 'Perfecta para quienes comienzan en el gimnasio. Enfocada en desarrollar fuerza base y técnica correcta.',
    duration: '8 semanas',
    level: 'Principiante',
    image: '/src/assets/rutinas/fuerza-principiantes.webp',
    path: '/rutinas/fuerza-principiantes'
  },
  {
    id: 2,
    title: 'Rutina de Hipertrofia Avanzada',
    description: 'Diseñada para maximizar el crecimiento muscular. Incluye técnicas avanzadas de entrenamiento.',
    duration: '12 semanas',
    level: 'Avanzado',
    image: '/src/assets/rutinas/hipertrofia-avanzada.webp',
    path: '/rutinas/hipertrofia-avanzada'
  },
  {
    id: 3,
    title: 'Rutina de Definición Muscular',
    description: 'Combinación perfecta de entrenamiento y nutrición para lograr una definición muscular óptima.',
    duration: '6 semanas',
    level: 'Intermedio',
    image: '/src/assets/rutinas/definicion-muscular.webp',
    path: '/rutinas/definicion-muscular'
  },
  {
    id: 4,
    title: 'Rutina de Fuerza Funcional',
    description: 'Mejora tu fuerza y movilidad con ejercicios funcionales que mejoran tu rendimiento diario.',
    duration: '8 semanas',
    level: 'Intermedio',
    image: '/src/assets/rutinas/fuerza-funcional.webp',
    path: '/rutinas/fuerza-funcional'
  }
];

export default function RoutinesPage() {
  return (
    <div className="min-h-screen bg-white">
      <AuthNavbar />
      
      <main className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Rutinas de Entrenamiento Personalizadas
          </h1>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto">
            Descubre rutinas diseñadas por expertos para alcanzar tus objetivos fitness, 
            ya sea ganar fuerza, masa muscular o mejorar tu condición física.
          </p>
        </section>

        {/* Rutinas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {routines.map(routine => (
            <div
              key={routine.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={routine.image}
                  alt={routine.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {routine.title}
                  </h2>
                  <div className="flex gap-2">
                    <span className="bg-[#ff6600] text-white text-sm px-3 py-1 rounded-full">
                      {routine.duration}
                    </span>
                    <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                      {routine.level}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#1A1A1A]/70 mb-4">
                  {routine.description}
                </p>
                <a
                  href={routine.path}
                  className="inline-flex items-center text-[#ff6600] font-semibold group-hover:text-[#ff8533] transition-colors duration-300"
                >
                  Ver rutina completa
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 mb-8">
            Contáctanos para una rutina personalizada según tus objetivos y necesidades.
          </p>
          <button className="bg-[#ff6600] text-white font-bold px-8 py-3 rounded-full hover:bg-[#ff8533] transition-colors duration-300">
            Solicitar Rutina Personalizada
          </button>
        </section>
      </main>
    </div>
  );
} 