// src/pages/ServicesPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Background from '../components/layout/Background'
import Navbar from '../components/layout/Navbar'
import backgroundImage from '../assets/background-image.png'
import { 
  FiUser, 
  FiUsers, 
  FiTarget, 
  FiHeart,
  FiTrendingUp,
  FiClock,
  FiStar,
  FiCheck,
  FiArrowRight,
  FiZap,
  FiActivity,
  FiAward
} from 'react-icons/fi'

export default function ServicesPage() {
  const services = [
    {
      icon: FiUser,
      title: "Entrenamiento Personal",
      description: "Sesiones uno a uno con entrenadores certificados",
      features: [
        "Plan personalizado según tus objetivos",
        "Seguimiento detallado de progreso",
        "Corrección de técnica en tiempo real",
        "Flexibilidad de horarios",
        "Asesoramiento nutricional incluido"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FiUsers,
      title: "Clases Grupales",
      description: "Entrenamientos dinámicos en grupo con ambiente motivador",
      features: [
        "Body Combat - Artes marciales",
        "Body Pump - Entrenamiento con pesas",
        "Yoga & Pilates - Flexibilidad y core",
        "HIIT - Alta intensidad",
        "Aqua Fitness - Ejercicios en agua"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      icon: FiTarget,
      title: "Planes Nutricionales",
      description: "Alimentación estratégica para tus objetivos específicos",
      features: [
        "Evaluación nutricional completa",
        "Menús personalizados semanales",
        "Recetas saludables y fáciles",
        "Seguimiento y ajustes mensuales",
        "Educación nutricional continua"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FiHeart,
      title: "Wellness & Recovery",
      description: "Servicios de recuperación y bienestar integral",
      features: [
        "Masajes deportivos",
        "Sauna y terapia de frío",
        "Estiramientos asistidos",
        "Meditación y mindfulness",
        "Evaluaciones posturales"
      ],      color: "from-pink-500 to-pink-600"
    }
  ]

  const plans = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: '$99,000',
      period: '/mes',
      description: 'Perfecto para comenzar tu transformación',
      features: [
        'Acceso al gimnasio 24/7',
        '2 clases grupales por semana',
        'Evaluación inicial gratuita',
        'App móvil con rutinas',
        'Soporte básico por chat'
      ],
      buttonText: 'Comenzar Ahora',
      popular: false,
      color: 'border-gray-300'
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: '$179,000',
      period: '/mes',
      description: 'La opción más popular para resultados óptimos',
      features: [
        'Todo lo del Plan Básico',
        '4 sesiones de entrenamiento personal',
        'Plan nutricional personalizado',
        'Clases grupales ilimitadas',
        'Acceso a zona VIP',
        'Seguimiento semanal de progreso',
        'Consultas nutricionales mensuales'
      ],
      buttonText: 'Más Popular',
      popular: true,
      color: 'border-[#ff6600]'
    },
    {
      id: 'elite',
      name: 'Plan Elite',
      price: '$299,000',
      period: '/mes',
      description: 'Experiencia completa y premium',
      features: [
        'Todo lo del Plan Premium',
        '8 sesiones de entrenamiento personal',
        'Entrenador personal dedicado',
        'Masajes de recuperación semanales',
        'Suplementación personalizada',
        'Acceso prioritario a instalaciones',
        'Consultas médicas deportivas',
        'Programa de bienestar integral'
      ],
      buttonText: 'Experiencia Elite',
      popular: false,
      color: 'border-purple-500'
    }
  ]

  const specialPrograms = [
    {
      icon: FiZap,
      title: "Transformation Challenge",
      duration: "12 semanas",
      description: "Programa intensivo de transformación corporal con resultados garantizados",
      benefits: ["Pérdida promedio 8-15kg", "Aumento masa muscular", "Mejora cardiovascular"]
    },
    {
      icon: FiActivity,
      title: "Rehabilitación Deportiva",
      duration: "Variable",
      description: "Recuperación especializada para lesiones deportivas con fisioterapeutas",
      benefits: ["Recuperación acelerada", "Prevención de lesiones", "Fortalecimiento específico"]
    },
    {
      icon: FiAward,
      title: "Preparación Competitiva",
      duration: "6-24 semanas",
      description: "Entrenamiento especializado para competencias fitness y deportivas",
      benefits: ["Pico de forma óptimo", "Estrategia competitiva", "Soporte psicológico"]
    }
  ]

  return (
    <div className="min-h-screen relative">
      <Background image={backgroundImage} />
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="container mx-auto px-8 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black text-white leading-tight mb-8">
              NUESTROS <span className="text-[#ff6600]">SERVICIOS</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
              Diseñamos experiencias únicas de fitness adaptadas a tus necesidades, 
              objetivos y estilo de vida. Descubre todo lo que podemos hacer por ti.
            </p>
            <Link
              to="/contactanos"
              className="bg-[#ff6600] text-white px-10 py-4 rounded-full font-bold hover:bg-[#ff8533] transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              Consulta Gratuita
              <FiArrowRight />
            </Link>
          </div>
        </section>
      </div>

      {/* Services Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-[#1A1A1A] mb-6">
                Servicios <span className="text-[#ff6600]">Principales</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Ofrecemos una gama completa de servicios diseñados para transformar tu vida
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-[#fff7f0] to-[#f0f4ff] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`bg-gradient-to-br ${service.color} rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
                    <service.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="bg-[#ff6600] rounded-full p-1">
                          <FiCheck className="text-white w-3 h-3" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6] py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-[#1A1A1A] mb-6">
                Planes de <span className="text-[#ff6600]">Membresía</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Elige el plan que mejor se adapte a tus objetivos y presupuesto
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${plan.color} ${plan.popular ? 'scale-105' : ''} relative overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white text-center py-2 font-bold text-sm">
                      MÁS POPULAR
                    </div>
                  )}
                  
                  <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      <div className="flex items-end justify-center gap-2">
                        <span className="text-4xl font-black text-[#ff6600]">{plan.price}</span>
                        <span className="text-gray-500 text-lg">{plan.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="bg-green-500 rounded-full p-1 mt-1">
                            <FiCheck className="text-white w-3 h-3" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to="/register"
                      className={`w-full py-4 rounded-full font-bold text-center transition-all duration-300 transform hover:scale-105 block ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white hover:shadow-lg' 
                          : 'bg-gray-100 text-[#ff6600] hover:bg-gray-200'
                      }`}
                    >
                      {plan.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">¿Necesitas algo más específico?</p>
              <Link
                to="/contactanos"
                className="text-[#ff6600] font-semibold hover:underline"
              >
                Contáctanos para un plan personalizado
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-6">
                Programas <span className="text-[#ff6600]">Especiales</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Experiencias únicas diseñadas para objetivos específicos y resultados extraordinarios
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialPrograms.map((program, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700">
                  <div className="bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <program.icon className="text-white w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-white">{program.title}</h3>
                    <span className="bg-[#ff6600] text-white px-3 py-1 rounded-full text-xs font-bold">
                      {program.duration}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">{program.description}</p>
                  <div className="space-y-2">
                    {program.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <FiStar className="text-[#ff6600] w-4 h-4" />
                        <span className="text-gray-400 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-[#1A1A1A] mb-6">
                ¿Por qué elegir <span className="text-[#ff6600]">Victor's Health Synergy?</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: FiClock, title: "Horarios Flexibles", desc: "Abierto 24/7 para tu comodidad" },
                { icon: FiAward, title: "Entrenadores Certificados", desc: "Profesionales con experiencia comprobada" },
                { icon: FiTrendingUp, title: "Resultados Garantizados", desc: "Metodología probada y efectiva" },
                { icon: FiHeart, title: "Ambiente Motivador", desc: "Comunidad que te apoya y motiva" }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <div className="bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black text-white mb-6">
              Comienza tu <span className="text-black">Transformación Hoy</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              No esperes más. Cada día es una oportunidad para acercarte a tus objetivos. 
              Únete a nuestra comunidad y descubre de qué eres capaz.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="bg-white text-[#ff6600] px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Únete Ahora
                <FiStar />
              </Link>
              <Link
                to="/contactanos"
                className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-[#ff6600] transition-all duration-300 transform hover:scale-105"
              >
                Consulta Gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] py-8">
        <div className="container mx-auto px-8 text-center">
          <p className="text-gray-400">
            © 2024 Victor's Health Synergy. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
