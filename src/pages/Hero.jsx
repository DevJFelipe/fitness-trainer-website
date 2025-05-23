// src/components/Hero.jsx
import { useNavigate } from 'react-router-dom'
import ServiceItem from '../components/ServiceItem'

export default function Hero() {
  const navigate = useNavigate()

  const services = [
    'Entrenamiento Personal',
    'Body Combat',
    'Body Pump',
    'Body Building'
  ]

  return (
    <main className="container mx-auto px-8">
      <div className="w-[45%] pt-12">
        {/* Título */}
        <h2 className="text-[#ff6600] italic text-6xl font-script leading-tight">
          Empieza a Entrenar Hoy
        </h2>

        {/* MOLDEA TU CUERPO */}
        <h1 className="text-white text-[90px] font-black leading-[0.9] tracking-tighter mt-4">
          MOLDEA<span className="text-[#ff6600]">TU</span>CUERPO
        </h1>
        
        {/* Subtítulo con salto de línea */}
        <div className="mt-12">
          <p className="text-white text-3xl font-bold">
            COMIENZA TU ENTRENAMIENTO CON
          </p>
          <p className="text-white text-3xl font-bold">
            NUESTROS <span className="text-[#ff6600]">ENTRENADORES PROFESIONALES</span>
          </p>
        </div>

        {/* Lista de servicios */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-8 mt-16">
          {services.map((service, index) => (
            <ServiceItem key={index} text={service} />
          ))}
        </div>

        {/* CTA: navegar a /login */}
        <button
          onClick={() => navigate('/login')}
          className="
            mt-8 
            bg-white text-black font-black text-xl 
            px-12 py-3 rounded-full 
            hover:bg-[#ff6600] hover:text-white 
            transition-all duration-300 
            transform hover:scale-105 
            active:scale-95
            cursor-pointer
          "
        >
          ÚNETE AHORA
        </button>
      </div>
    </main>
  )
}
