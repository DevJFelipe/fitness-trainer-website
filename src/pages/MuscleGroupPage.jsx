import React from 'react';
import { useParams } from 'react-router-dom';
import AuthNavbar from '../components/layout/AuthNavbar';

const exercisesByMuscleGroup = {
  pectorales: {
    title: "Todo sobre Pectorales",
    description: 'El pectoral mayor es un músculo resistente, grueso y ancho por lo que su entrenamiento debe ser constante e intenso para lograr el máxima desarrollo muscular. A continuación, te sugerimos los mejores ejercicios que podrás explorar de cómo hacerlos, sus beneficios y consejos para mejorar.',
    exercises: [
      {
        name: "Press de banca con barra",
        image: "/src/assets/ejercicios/pecho/press-banca.webp",
        difficulty: "Intermedio",
        equipment: "Barra y banco",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pecho/press-banca.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9wZWNoby9wcmVzcy1iYW5jYS5tb3YiLCJpYXQiOjE3NDg1NzczNjMsImV4cCI6MTc0OTE4MjE2M30.uyzTmUmHJTjQCFKDen9kjZizS9FNlReF8YxjV7PVcAk"
      },
      {
        name: "Aperturas con mancuernas",
        image: "/src/assets/ejercicios/pecho/aperturas-mancuernas.webp",
        difficulty: "Principiante",
        equipment: "Mancuernas",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pecho/apertura-mancuernas.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9wZWNoby9hcGVydHVyYS1tYW5jdWVybmFzLm1vdiIsImlhdCI6MTc0ODU3NjA2MCwiZXhwIjoxNzQ5MTgwODYwfQ.ZCfh-c2YTZQejTfFf7cgWy3McdQqjGMH-20mVwMNgMA"
      },
      {
        name: "Press en banco inclinado",
        image: "/src/assets/ejercicios/pecho/fondos-paralelas.webp",
        difficulty: "Avanzado",
        equipment: "Barra y banco inclinado",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pecho/press-inclinado.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9wZWNoby9wcmVzcy1pbmNsaW5hZG8ubW92IiwiaWF0IjoxNzQ4NTc2MDUyLCJleHAiOjE3NDkxODA4NTJ9.Hjl0uU49V5t78SBwsAbX6cRVKchcQMGivoxTEfV7EW0"
      }
    ]
  },
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
  biceps: {
    title: "Todo sobre Bíceps",
    description: 'El bíceps braquial es el músculo principal de la parte frontal del brazo. Su entrenamiento mejora la fuerza y la estética del brazo.',
    exercises: [
      {
        name: "Curl de bíceps con barra",
        image: "/src/assets/ejercicios/brazos/curl-biceps-barra.webp",
        difficulty: "Principiante",
        equipment: "Barra",
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
  triceps: {
    title: "Todo sobre Tríceps",
    description: 'El tríceps braquial es el músculo principal de la parte posterior del brazo. Es fundamental para la extensión del codo y la fuerza general del brazo.',
    exercises: [
      {
        name: "Extensiones de tríceps en polea",
        image: "/src/assets/ejercicios/brazos/extensiones-triceps.webp",
        difficulty: "Principiante",
        equipment: "Polea",
        videoUrl: "#"
      }
    ]
  },
  abdomen: {
    title: "Todo sobre Abdomen",
    description: 'El abdomen es fundamental para la estabilidad del core y una buena postura. Un entrenamiento efectivo implica trabajar tanto el rectus abdominis como los oblicuos y el transverso.',
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
  },
  pantorrillas: {
    title: "Todo sobre Pantorrillas",
    description: 'Las pantorrillas son músculos que requieren constancia y variedad en su entrenamiento. Un desarrollo adecuado de las pantorrillas mejora la estabilidad y el rendimiento en diversos deportes.',
    exercises: [
      {
        name: "Elevación de talones de pie",
        image: "/src/assets/ejercicios/pantorrillas/elevacion-talones.webp",
        difficulty: "Principiante",
        equipment: "Máquina",
        videoUrl: "#"
      },
      {
        name: "Elevación de talones sentado",
        image: "/src/assets/ejercicios/pantorrillas/elevacion-talones-sentado.webp",
        difficulty: "Principiante",
        equipment: "Máquina",
        videoUrl: "#"
      },
      {
        name: "Elevación de talones con mancuernas",
        image: "/src/assets/ejercicios/pantorrillas/elevacion-talones-mancuernas.webp",
        difficulty: "Intermedio",
        equipment: "Mancuernas",
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
  }
};

// Importar todas las imágenes de grupos musculares
const muscleImages = import.meta.glob('../assets/grupos-musculares/*/*.webp', { eager: true, import: 'default' });

export default function MuscleGroupPage() {
  const { muscleGroup } = useParams();
  const groupData = exercisesByMuscleGroup[muscleGroup];

  if (!groupData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6]">
        <AuthNavbar />
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-gray-800">Grupo muscular no encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6]">
      <AuthNavbar />
      <main className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Imagen con efecto glass y sombra */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg border border-white/30 w-full md:w-[420px] h-[400px] flex-shrink-0">
              <img
                src={
                  muscleImages[`../assets/grupos-musculares/${muscleGroup}/${muscleGroup}.webp`] ||
                  groupData.exercises[0]?.image || "/src/assets/placeholder.webp"
                }
                alt={groupData.title}
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Título y descripción con fondo glass */}
            <div className="flex-1 flex flex-col gap-6">
              <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] leading-tight">
                <span className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent drop-shadow-lg">
                  {groupData.title.split(' ')[0]}
                </span>{' '}
                {groupData.title.replace(groupData.title.split(' ')[0], '')}
              </h1>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/40 text-lg text-[#222] font-medium leading-relaxed">
                {groupData.description}
              </div>
            </div>
          </div>
        </section>

        {/* Lista de ejercicios */}
        <section>
          <h2 className="text-3xl font-extrabold text-[#ff6600] mb-10 tracking-tight drop-shadow-sm">Ejercicios recomendados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {groupData.exercises.map((exercise, index) => (
              <div
                key={index}
                className="relative bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-white/40 hover:-translate-y-2 hover:scale-[1.03]"
              >
                <div className="relative aspect-video overflow-hidden">
                  {exercise.videoUrl ? (
                    <video controls crossOrigin="anonymous" preload="metadata" className="w-full h-full object-cover">
                      <source
                        src={exercise.videoUrl}
                        type={exercise.videoUrl.includes('.mov') ? 'video/quicktime' : 'video/mp4'}
                      />
                      Tu navegador no soporta reproducción de video.
                    </video>
                  ) : (
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-block bg-gradient-to-r from-[#ff6600]/80 to-[#ff8533]/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {exercise.difficulty}
                    </span>
                    <span className="inline-block bg-[#f0f4ff] text-[#ff6600] text-xs font-semibold px-3 py-1 rounded-full shadow">
                      {exercise.equipment}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#ff6600] transition-colors duration-300 drop-shadow">
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