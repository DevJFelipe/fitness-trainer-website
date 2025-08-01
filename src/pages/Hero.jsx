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
    <main className="container mx-auto px-4 md:px-8">
      <div className="w-full md:w-[45%] pt-8 md:pt-12">
        {/* Título */}
        <h2 className="text-[#ff6600] italic text-3xl md:text-4xl lg:text-6xl font-script leading-tight">
          Empieza a Entrenar Hoy
        </h2>

        {/* MOLDEA TU CUERPO */}
        <h1 className="text-white text-4xl md:text-6xl lg:text-[90px] font-black leading-[0.9] tracking-tighter mt-4">
          MOLDEA<span className="text-[#ff6600]">TU</span>CUERPO
        </h1>
        
        {/* Subtítulo con salto de línea */}
        <div className="mt-8 md:mt-12">
          <p className="text-white text-lg md:text-2xl lg:text-3xl font-bold">
            COMIENZA TU ENTRENAMIENTO CON
          </p>
          <p className="text-white text-lg md:text-2xl lg:text-3xl font-bold">
            NUESTROS <span className="text-[#ff6600]">ENTRENADORES PROFESIONALES</span>
          </p>
        </div>

        {/* Lista de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-20 md:gap-y-8 mt-8 md:mt-16">
          {services.map((service, index) => (
            <ServiceItem key={index} text={service} />
          ))}
        </div>

        {/* CTA: navegar a /login */}
        <button
          onClick={() => navigate('/login')}
          className="
            mt-6 md:mt-8 
            bg-white text-black font-black text-lg md:text-xl 
            px-8 md:px-12 py-3 rounded-full 
            hover:bg-[#ff6600] hover:text-white 
            transition-all duration-300 
            transform hover:scale-105 
            active:scale-95
            cursor-pointer
            w-full md:w-auto
          "
        >
          ÚNETE AHORA
        </button>
      </div>
    </main>
  )
}
