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
        image: new URL('../assets/ejercicios/pecho/press-banca.webp', import.meta.url).href,
        difficulty: "Intermedio",
        equipment: "Barra y banco",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pecho/press-banca.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9wZWNoby9wcmVzcy1iYW5jYS5tb3YiLCJpYXQiOjE3NDg1NzczNjMsImV4cCI6MTc0OTE4MjE2M30.uyzTmUmHJTjQCFKDen9kjZizS9FNlReF8YxjV7PVcAk"
      },
      {
        name: "Aperturas con mancuernas",
        image: new URL('../assets/ejercicios/pecho/aperturas-mancuernas.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Mancuernas",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pecho/apertura-mancuernas.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9wZWNoby9hcGVydHVyYS1tYW5jdWVybmFzLm1vdiIsImlhdCI6MTc0ODU3NjA2MCwiZXhwIjoxNzQ5MTgwODYwfQ.ZCfh-c2YTZQejTfFf7cgWy3McdQqjGMH-20mVwMNgMA"
      },
      {
        name: "Press en banco inclinado",
        image: new URL('../assets/ejercicios/pecho/fondos-paralelas.webp', import.meta.url).href,
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
        name: "Jalón al pecho en polea",
        image: new URL('../assets/ejercicios/espalda/remo-supino-mancuernas.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Polea",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/espalda/jalon-pecho.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9lc3BhbGRhL2phbG9uLXBlY2hvLm1vdiIsImlhdCI6MTc0ODYxNjkxMywiZXhwIjoxNzQ5MjIxNzEzfQ.7Mywp8w_iMrbiwvSanhgEFA2A_kiO94z-jwKa2t8b-k"
      },
      {
        name: "Jalon al pecho con mancuernas",
        image: new URL('../assets/ejercicios/espalda/remo-supino-polea.webp', import.meta.url).href,
        difficulty: "Intermedio",
        equipment: "Mancuernas",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/espalda/jalon-mancuerna.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9lc3BhbGRhL2phbG9uLW1hbmN1ZXJuYS5tb3YiLCJpYXQiOjE3NDg2MTY5NTIsImV4cCI6MTc0OTIyMTc1Mn0.5nWjWYJ40afJo9DttMVoYpCFxJf2Ul8LlekSX56Rz1s"
      },
      {
        name: "Remo inclinado con barra",
        image: new URL('../assets/ejercicios/espalda/remo-sentado-polea.webp', import.meta.url).href,
        difficulty: "Intermedio",
        equipment: "Barra",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/espalda/remo-barra.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9lc3BhbGRhL3JlbW8tYmFycmEubW92IiwiaWF0IjoxNzQ4NjE2ODM5LCJleHAiOjE3NDkyMjE2Mzl9.25eUSVaL2c1rCQ7SU9URGmH4sn0LKn8BlI9NySPxXJU"
      }
    ]
  },
  biceps: {
    title: "Todo sobre Bíceps",
    description: 'El bíceps braquial es el músculo principal de la parte frontal del brazo. Su entrenamiento mejora la fuerza y la estética del brazo.',
    exercises: [
      {
        name: "Curl de bíceps en maquina",
        image: new URL('../assets/ejercicios/brazos/curl-biceps-barra.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Máquina",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/biceps/bicep-maquina.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9iaWNlcHMvYmljZXAtbWFxdWluYS5tb3YiLCJpYXQiOjE3NDg2MTg4MDYsImV4cCI6MTc0OTIyMzYwNn0.3zcabJ7oYS-HOn5TwWP4n2-D4tKXTybg60JqZnrLobc"
      },
      {
        name: "Curl de bíceps en polea",
        image: new URL('../assets/ejercicios/brazos/curl-martillo.webp', import.meta.url).href,
        difficulty: "Intermedio",
        equipment: "Mancuernas",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/biceps/bicep-polea.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9iaWNlcHMvYmljZXAtcG9sZWEubW92IiwiaWF0IjoxNzQ4NjE4ODcxLCJleHAiOjE3NDkyMjM2NzF9.UDy_nmThBgoiyZ9QhiVh4OlpEk4-vP6yIGyMvHOblek"
      }
    ]
  },
  triceps: {
    title: "Todo sobre Tríceps",
    description: 'El tríceps braquial es el músculo principal de la parte posterior del brazo. Es fundamental para la extensión del codo y la fuerza general del brazo.',
    exercises: [
      {
        name: "Extensiones de tríceps en polea con cuerda",
        image: new URL('../assets/ejercicios/brazos/extensiones-triceps.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Polea",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/triceps/tricep-polea-cuerda.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy90cmljZXBzL3RyaWNlcC1wb2xlYS1jdWVyZGEubW92IiwiaWF0IjoxNzQ4NjE5MDYxLCJleHAiOjE3NDkyMjM4NjF9._4uwYKCt64t2MRCrcTRyrMCtWKHBJWXGUb-jiMxip8s"
      },
      {
        name: "Extensiones en banca con mancuerna",
        image: new URL('../assets/ejercicios/brazos/extensiones-triceps.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Mancuernas",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/triceps/extension-mancuerna.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy90cmljZXBzL2V4dGVuc2lvbi1tYW5jdWVybmEubW92IiwiaWF0IjoxNzQ4NjE5MTgyLCJleHAiOjE3NDkyMjM5ODJ9.cZkJUJTCYNn2gz8FZHiUbJeSMj3UkuKqI6XsGGjhVEE"
      },
      {
        name: "Press francés con barra",
        image: new URL('../assets/ejercicios/brazos/extensiones-triceps.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Banco y barra",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/triceps/press-frances.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy90cmljZXBzL3ByZXNzLWZyYW5jZXMubW92IiwiaWF0IjoxNzQ4NjE5MjY2LCJleHAiOjE3NDkyMjQwNjZ9.zsUT3yl2q_19fqmL_KrgVB_LHdz0xGMNrO2-Mma4xA4"
      }
    ]
  },
  abdomen: {
    title: "Todo sobre Abdomen",
    description: 'El abdomen es fundamental para la estabilidad del core y una buena postura. Un entrenamiento efectivo implica trabajar tanto el rectus abdominis como los oblicuos y el transverso.',
    exercises: [
      {
        name: "Crunches",
        image: new URL('../assets/ejercicios/abdominales/crunches.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Peso corporal",
        videoUrl: "#"
      },
      {
        name: "Plancha",
        image: new URL('../assets/ejercicios/abdominales/plancha.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Peso corporal",
        videoUrl: "#"
      },
      {
        name: "Russian twist",
        image: new URL('../assets/ejercicios/abdominales/russian-twist.webp', import.meta.url).href,
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
        name: "Press de hombro en máquina",
        image: new URL('../assets/ejercicios/hombros/press-militar.webp', import.meta.url).href,
        difficulty: "Intermedio",
        equipment: "Máquina",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/hombros/press-maquina.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9ob21icm9zL3ByZXNzLW1hcXVpbmEubW92IiwiaWF0IjoxNzQ4NjE5NjQ0LCJleHAiOjE3NDkyMjQ0NDR9.VmYVRF-Sx-Oe9JfsTdI3f-x3Ldvfytl3-0BnejWxSXU"
      },
      {
        name: "Vuelos laterales con mancuernas",
        image: new URL('../assets/ejercicios/hombros/elevaciones-laterales.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Mancuernas",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/hombros/elevacion-lateral.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9ob21icm9zL2VsZXZhY2lvbi1sYXRlcmFsLm1vdiIsImlhdCI6MTc0ODYxOTY1OCwiZXhwIjoxNzQ5MjI0NDU4fQ.jDNADQ86VJNXksT4bHyQ28v2pdWr_9hO1PUAS-N4waA"
      },
      {
        name: "Elevaciones frontales con mancuernas",
        image: new URL('../assets/ejercicios/hombros/face-pull.webp', import.meta.url).href,
        difficulty: "Intermedio",
        equipment: "Mancuernas",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/hombros/elevacion-frontal.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9ob21icm9zL2VsZXZhY2lvbi1mcm9udGFsLm1vdiIsImlhdCI6MTc0ODYxOTY4OCwiZXhwIjoxNzQ5MjI0NDg4fQ.J-ARP5B9TrPHogthy0NW4DziLpADuvzMJX9EsMFp4Lc"
      }
    ]
  },
  pantorrillas: {
    title: "Todo sobre Pantorrillas",
    description: 'Las pantorrillas son músculos que requieren constancia y variedad en su entrenamiento. Un desarrollo adecuado de las pantorrillas mejora la estabilidad y el rendimiento en diversos deportes.',
    exercises: [
      {
        name: "Elevación de talones en maquina smith", 
        image: new URL('../assets/ejercicios/pantorrillas/elevacion-talones.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Máquina",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pierna/pantorrilla-smith.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9waWVybmEvcGFudG9ycmlsbGEtc21pdGgubW92IiwiaWF0IjoxNzQ4NjIwMjYxLCJleHAiOjE3NDkyMjUwNjF9.xxj4Wg3I1Ro3btn0RzsZZa4g2KCZyedMNo8kJrndBys"
      },
      {
        name: "Elevación de talones sentado",
        image: new URL('../assets/ejercicios/pantorrillas/elevacion-talones-sentado.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Máquina",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pierna/pantorrilla-sentado.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9waWVybmEvcGFudG9ycmlsbGEtc2VudGFkby5tb3YiLCJpYXQiOjE3NDg2MjAyOTYsImV4cCI6MTc0OTIyNTA5Nn0.slCzVo-K6rZeqZ8JuixZz1hNt6YG_NOLVK1qLpG1E_Y"
      }
    ]
  },
  piernas: {
    title: "Todo sobre Piernas",
    description: 'Las piernas son el fundamento de un cuerpo fuerte y equilibrado. Incluyen músculos como cuádriceps, isquiotibiales, gemelos y glúteos. El entrenamiento de piernas es esencial para un desarrollo muscular completo.',
    exercises: [
      {
        name: "Prensa de piernas",
        image: new URL('../assets/ejercicios/piernas/sentadillas-barra.webp', import.meta.url).href,
        difficulty: "Intermedio",
        equipment: "Barra",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pierna/prensa-pierna.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9waWVybmEvcHJlbnNhLXBpZXJuYS5tb3YiLCJpYXQiOjE3NDg2MjAxMDEsImV4cCI6MTc0OTIyNDkwMX0.Ilnv2V2ic3aJ2ZynO_SXr6q35hCf7bztQLNSVrpqm0Y"
      },
      {
        name: "Peso muerto",
        image: new URL('../assets/ejercicios/piernas/peso-muerto.webp', import.meta.url).href,
        difficulty: "Avanzado",
        equipment: "Barra",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pierna/peso-muerto.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9waWVybmEvcGVzby1tdWVydG8ubW92IiwiaWF0IjoxNzQ4NjIwMDkzLCJleHAiOjE3NDkyMjQ4OTN9.uKtYZNa_wp55mu0H2J-eGqIt7RR0IsOC0pMXaa_X5hs"
      },
      {
        name: "Extensiones de pierna",
        image: new URL('../assets/ejercicios/piernas/extensiones-pierna.webp', import.meta.url).href,
        difficulty: "Principiante",
        equipment: "Máquina",
        videoUrl: "https://njsqjfxrvzlxbsnprvdz.supabase.co/storage/v1/object/sign/videos-ejercicios/pierna/extension-pierna.mov?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NjNTVmM2ExLWFhN2MtNDQ2MC1iYzlhLWY1MzQ1OTMyYjJlMyJ9.eyJ1cmwiOiJ2aWRlb3MtZWplcmNpY2lvcy9waWVybmEvZXh0ZW5zaW9uLXBpZXJuYS5tb3YiLCJpYXQiOjE3NDg2MjAxMTIsImV4cCI6MTc0OTIyNDkxMn0.E7jdQRfFCWk2tujvprCuKavCNFZuj26neDzV0Eo2ld4"
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
                    <video controls preload="metadata" className="w-full h-full object-cover">
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