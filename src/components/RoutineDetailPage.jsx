import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthNavbar from './AuthNavbar';

const routines = [
  {
    id: 'fuerza-principiantes',
    title: 'Rutina de Fuerza para Principiantes',
    description: 'Perfecta para quienes comienzan en el gimnasio. Enfocada en desarrollar fuerza base y técnica correcta.',
    duration: '8 semanas',
    level: 'Principiante',
    image: '/src/assets/rutinas/fuerza-principiantes.webp',
    steps: [
      {
        name: 'Sentadilla con barra',
        sets: 4,
        reps: '10-12',
        rest: '90 segundos',
        tips: 'Mantén la espalda recta y baja controlando el movimiento.'
      },
      {
        name: 'Press de banca',
        sets: 4,
        reps: '8-10',
        rest: '90 segundos',
        tips: 'No rebotes la barra en el pecho, controla la bajada.'
      },
      {
        name: 'Remo con barra',
        sets: 3,
        reps: '10-12',
        rest: '60 segundos',
        tips: 'Aprieta los omóplatos al final del movimiento.'
      }
    ]
  },
  {
    id: 'hipertrofia-avanzada',
    title: 'Rutina de Hipertrofia Avanzada',
    description: 'Diseñada para maximizar el crecimiento muscular. Incluye técnicas avanzadas de entrenamiento.',
    duration: '12 semanas',
    level: 'Avanzado',
    image: '/src/assets/rutinas/hipertrofia-avanzada.webp',
    steps: [
      {
        name: 'Press militar con barra',
        sets: 4,
        reps: '8-10',
        rest: '90 segundos',
        tips: 'No arquees la espalda y controla el peso.'
      },
      {
        name: 'Dominadas lastradas',
        sets: 4,
        reps: '6-8',
        rest: '120 segundos',
        tips: 'Haz el recorrido completo y evita el impulso.'
      }
    ]
  },
  {
    id: 'definicion-muscular',
    title: 'Rutina de Definición Muscular',
    description: 'Combinación perfecta de entrenamiento y nutrición para lograr una definición muscular óptima.',
    duration: '6 semanas',
    level: 'Intermedio',
    image: '/src/assets/rutinas/definicion-muscular.webp',
    steps: [
      {
        name: 'Circuito HIIT',
        sets: 5,
        reps: '30 seg trabajo / 30 seg descanso',
        rest: '60 segundos entre circuitos',
        tips: 'Mantén la intensidad alta durante todo el circuito.'
      },
      {
        name: 'Abdominales en banco declinado',
        sets: 4,
        reps: '15-20',
        rest: '45 segundos',
        tips: 'No tires del cuello, sube con el abdomen.'
      }
    ]
  },
  {
    id: 'fuerza-funcional',
    title: 'Rutina de Fuerza Funcional',
    description: 'Mejora tu fuerza y movilidad con ejercicios funcionales que mejoran tu rendimiento diario.',
    duration: '8 semanas',
    level: 'Intermedio',
    image: '/src/assets/rutinas/fuerza-funcional.webp',
    steps: [
      {
        name: 'Peso muerto con kettlebell',
        sets: 4,
        reps: '12',
        rest: '90 segundos',
        tips: 'Mantén la espalda recta y el core activo.'
      },
      {
        name: 'Zancadas caminando',
        sets: 3,
        reps: '20 (10 por pierna)',
        rest: '60 segundos',
        tips: 'Da pasos largos y baja la rodilla trasera.'
      }
    ]
  }
];

export default function RoutineDetailPage() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const routine = routines.find(r => r.id === routineId);

  if (!routine) {
    return (
      <div className="min-h-screen bg-white">
        <AuthNavbar />
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-gray-800">Rutina no encontrada</h1>
          <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-[#ff6600] text-white rounded-full font-semibold">Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AuthNavbar />
      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <button onClick={() => navigate(-1)} className="mb-8 px-6 py-2 bg-[#ff6600] text-white rounded-full font-semibold">Volver</button>
        <section className="mb-10">
          <img src={routine.image} alt={routine.title} className="w-full h-64 object-cover rounded-2xl mb-6" />
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-2">{routine.title}</h1>
          <div className="flex gap-4 mb-4">
            <span className="bg-[#ff6600] text-white text-sm px-3 py-1 rounded-full">{routine.duration}</span>
            <span className="bg-gray-200 text-[#1A1A1A] text-sm px-3 py-1 rounded-full">{routine.level}</span>
          </div>
          <p className="text-lg text-[#1A1A1A]/80 mb-4">{routine.description}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Pasos de la rutina</h2>
          <ol className="space-y-6">
            {routine.steps.map((step, idx) => (
              <li key={idx} className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl font-bold text-[#ff6600]">{idx + 1}</span>
                  <span className="text-lg font-semibold text-[#1A1A1A]">{step.name}</span>
                </div>
                <div className="flex flex-wrap gap-4 mb-2">
                  <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Series: {step.sets}</span>
                  <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Repeticiones: {step.reps}</span>
                  <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Descanso: {step.rest}</span>
                </div>
                <p className="text-[#1A1A1A]/80 text-sm">{step.tips}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
} 