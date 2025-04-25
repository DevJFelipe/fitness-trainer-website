import React from 'react';
import { useParams } from 'react-router-dom';
import AuthNavbar from './AuthNavbar';

const exercisesByMuscleGroup = {
  espalda: {
    title: "Todo sobre Espalda",
    description: 'La espalda está compuesta por varios músculos (dorsales, infraespinoso, trapecio, entre otros). Es la constante ejecución de ejercicios lo que le dará volumen y armonía a tu espalda con la anhelada forma de "V". Comienza con los siguientes ejercicios.',
    exercises: [
      {
        name: "Remo supino con mancuernas",
        image: "/src/assets/ejercicios/espalda/remo-supino-mancuernas.webp",
        difficulty: "Principiante",
        equipment: "Mancuernas",
        videoUrl: "#"
      },
      {
        name: "Remo supino en polea baja (de pie)",
        image: "/src/assets/ejercicios/espalda/remo-supino-polea.webp",
        difficulty: "Intermedio",
        equipment: "Máquina",
        videoUrl: "#"
      },
      {
        name: "Remo sentado en polea con agarre de cuerda",
        image: "/src/assets/ejercicios/espalda/remo-sentado-polea.webp",
        difficulty: "Intermedio",
        equipment: "Máquina",
        videoUrl: "#"
      }
    ]
  },
  pecho: {
    title: "Todo sobre Pecho",
    description: 'El pecho es uno de los grupos musculares más populares para entrenar. Está compuesto principalmente por el pectoral mayor y menor. Un entrenamiento adecuado te ayudará a desarrollar fuerza y una apariencia más definida.',
    exercises: [
      {
        name: "Press de banca con barra",
        image: "/src/assets/ejercicios/pecho/press-banca.webp",
        difficulty: "Intermedio",
        equipment: "Barra y banco",
        videoUrl: "#"
      },
      {
        name: "Aperturas con mancuernas",
        image: "/src/assets/ejercicios/pecho/aperturas-mancuernas.webp",
        difficulty: "Principiante",
        equipment: "Mancuernas",
        videoUrl: "#"
      },
      {
        name: "Fondos en paralelas",
        image: "/src/assets/ejercicios/pecho/fondos-paralelas.webp",
        difficulty: "Avanzado",
        equipment: "Barras paralelas",
        videoUrl: "#"
      }
    ]
  },
  piernas: {
    title: "Todo sobre Piernas",
    description: 'Las piernas son el fundamento de un cuerpo fuerte y equilibrado. Incluyen músculos como cuádriceps, isquiotibiales, gemelos y glúteos. El entrenamiento de piernas es esencial para un desarrollo muscular completo.',
    exercises: [
      {
        name: "Sentadillas con barra",
        image: "/src/assets/ejercicios/piernas/sentadillas-barra.webp",
        difficulty: "Intermedio",
        equipment: "Barra",
        videoUrl: "#"
      },
      {
        name: "Peso muerto",
        image: "/src/assets/ejercicios/piernas/peso-muerto.webp",
        difficulty: "Avanzado",
        equipment: "Barra",
        videoUrl: "#"
      },
      {
        name: "Extensiones de pierna",
        image: "/src/assets/ejercicios/piernas/extensiones-pierna.webp",
        difficulty: "Principiante",
        equipment: "Máquina",
        videoUrl: "#"
      }
    ]
  },
  brazos: {
    title: "Todo sobre Brazos",
    description: 'Los brazos incluyen bíceps, tríceps y antebrazos. Un entrenamiento equilibrado de estos músculos te ayudará a desarrollar fuerza y definición en tus brazos, mejorando tanto su apariencia como su funcionalidad.',
    exercises: [
      {
        name: "Curl de bíceps con barra",
        image: "/src/assets/ejercicios/brazos/curl-biceps-barra.webp",
        difficulty: "Principiante",
        equipment: "Barra",
        videoUrl: "#"
      },
      {
        name: "Extensiones de tríceps en polea",
        image: "/src/assets/ejercicios/brazos/extensiones-triceps.webp",
        difficulty: "Principiante",
        equipment: "Polea",
        videoUrl: "#"
      },
      {
        name: "Curl martillo",
        image: "/src/assets/ejercicios/brazos/curl-martillo.webp",
        difficulty: "Intermedio",
        equipment: "Mancuernas",
        videoUrl: "#"
      }
    ]
  },
  abdominales: {
    title: "Todo sobre Abdominales",
    description: 'Los abdominales son fundamentales para la estabilidad del core y una buena postura. Un entrenamiento efectivo de abdominales implica trabajar tanto el rectus abdominis como los oblicuos y el transverso.',
    exercises: [
      {
        name: "Crunches",
        image: "/src/assets/ejercicios/abdominales/crunches.webp",
        difficulty: "Principiante",
        equipment: "Peso corporal",
        videoUrl: "#"
      },
      {
        name: "Plancha",
        image: "/src/assets/ejercicios/abdominales/plancha.webp",
        difficulty: "Principiante",
        equipment: "Peso corporal",
        videoUrl: "#"
      },
      {
        name: "Russian twist",
        image: "/src/assets/ejercicios/abdominales/russian-twist.webp",
        difficulty: "Intermedio",
        equipment: "Peso/Disco",
        videoUrl: "#"
      }
    ]
  },
  hombros: {
    title: "Todo sobre Hombros",
    description: 'Los hombros están compuestos por tres cabezas deltoides: anterior, medio y posterior. Un desarrollo equilibrado de los tres es crucial para tener hombros fuertes y estéticos, además de prevenir lesiones.',
    exercises: [
      {
        name: "Press militar",
        image: "/src/assets/ejercicios/hombros/press-militar.webp",
        difficulty: "Intermedio",
        equipment: "Barra",
        videoUrl: "#"
      },
      {
        name: "Elevaciones laterales",
        image: "/src/assets/ejercicios/hombros/elevaciones-laterales.webp",
        difficulty: "Principiante",
        equipment: "Mancuernas",
        videoUrl: "#"
      },
      {
        name: "Face pull",
        image: "/src/assets/ejercicios/hombros/face-pull.webp",
        difficulty: "Intermedio",
        equipment: "Polea",
        videoUrl: "#"
      }
    ]
  }
};

export default function MuscleGroupPage() {
  const { muscleGroup } = useParams();
  const groupData = exercisesByMuscleGroup[muscleGroup];

  if (!groupData) {
    return (
      <div className="min-h-screen bg-white">
        <AuthNavbar />
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-gray-800">Grupo muscular no encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AuthNavbar />
      
      <main className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-6">
            {groupData.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="relative rounded-2xl overflow-hidden h-[400px]">
              <img
                src={groupData.exercises[0]?.image || "/src/assets/placeholder.webp"}
                alt={groupData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="text-lg text-[#1A1A1A]/80 leading-relaxed">
              {groupData.description}
            </div>
          </div>
        </section>

        {/* Lista de ejercicios */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">Ejercicios recomendados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupData.exercises.map((exercise, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <button className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-[#ff6600] transition-colors duration-300">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-[#ff6600] group-hover:border-l-white transition-colors duration-300 ml-1" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                      {exercise.difficulty}
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                      {exercise.equipment}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] group-hover:text-[#ff6600] transition-colors duration-300">
                    {exercise.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 