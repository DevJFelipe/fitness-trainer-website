// src/pages/AboutUsPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Background from '../components/layout/Background'
import Navbar from '../components/layout/Navbar'
import backgroundImage from '../assets/background-image.png'
import { 
  FiTarget, 
  FiHeart, 
  FiStar, 
  FiUsers, 
  FiAward,
  FiTrendingUp,
  FiCheck,
  FiArrowRight
} from 'react-icons/fi'

export default function AboutUsPage() {
  const values = [
    {
      icon: FiHeart,
      title: "Pasión",
      description: "Creemos firmemente en el poder transformador del fitness y nos dedicamos con pasión a ayudar a cada persona a descubrir su mejor versión."
    },
    {
      icon: FiTarget,
      title: "Excelencia",
      description: "Buscamos constantemente la excelencia en cada servicio, programa y experiencia que ofrecemos a nuestros miembros."
    },
    {
      icon: FiUsers,
      title: "Comunidad",
      description: "Fomentamos un ambiente inclusivo donde cada persona se sienta bienvenida, apoyada y motivada a alcanzar sus metas."
    },
    {
      icon: FiTrendingUp,
      title: "Progreso",
      description: "Nos enfocamos en el crecimiento continuo, tanto personal como profesional, para ofrecer siempre lo mejor de nosotros."
    }
  ]

  const achievements = [
    { number: "500+", label: "Clientes Transformados" },
    { number: "5", label: "Años de Experiencia" },
    { number: "50+", label: "Programas Personalizados" },
    { number: "98%", label: "Satisfacción del Cliente" }
  ]

  const team = [
    {
      name: "Victor Health",
      role: "Fundador & Entrenador Principal",
      speciality: "Especialista en Fuerza y Acondicionamiento",
      description: "Con más de 8 años de experiencia, Victor se especializa en transformaciones corporales y entrenamiento funcional.",
      certifications: ["NSCA-CPT", "Nutrition Specialist", "Functional Movement"]
    },
    {
      name: "Ana Rodríguez",
      role: "Entrenadora Personal",
      speciality: "Yoga & Pilates Specialist",
      description: "Experta en flexibilidad, corrección postural y entrenamiento mente-cuerpo con 6 años de experiencia.",
      certifications: ["RYT-500", "Pilates Instructor", "Corrective Exercise"]
    },
    {
      name: "Carlos Mendoza",
      role: "Nutricionista Deportivo",
      speciality: "Planes Nutricionales Personalizados",
      description: "Nutricionista certificado especializado en nutrición deportiva y planes alimentarios para diferentes objetivos.",
      certifications: ["Registered Dietitian", "Sports Nutrition", "Weight Management"]
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
              SOBRE <span className="text-[#ff6600]">NOSOTROS</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
              Más que un gimnasio, somos tu compañero en el viaje hacia una vida más saludable, 
              fuerte y plena. Descubre nuestra historia y compromiso contigo.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link
                to="/servicios"
                className="bg-[#ff6600] text-white px-8 py-4 rounded-full font-bold hover:bg-[#ff8533] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Conoce Nuestros Servicios
                <FiArrowRight />
              </Link>
              <Link
                to="/contactanos"
                className="bg-white text-[#ff6600] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 border-2 border-white"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Mission Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-black text-[#1A1A1A] mb-8">
                  Nuestra <span className="text-[#ff6600]">Misión</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  En Victor's Health Synergy, creemos que cada persona tiene el potencial de alcanzar 
                  sus objetivos de salud y bienestar. Nuestra misión es proporcionar las herramientas, 
                  conocimiento y apoyo necesarios para que puedas transformar tu vida a través del fitness.
                </p>
                <div className="space-y-4">
                  {[
                    "Programas de entrenamiento personalizados y efectivos",
                    "Asesoramiento nutricional profesional y adaptado",
                    "Seguimiento continuo de tu progreso y resultados",
                    "Comunidad motivadora y ambiente positivo"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-[#ff6600] rounded-full p-1">
                        <FiCheck className="text-white w-4 h-4" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-2xl p-8 text-white">
                  <FiTarget className="w-16 h-16 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Nuestro Objetivo</h3>
                  <p className="text-lg leading-relaxed">
                    Ser el centro de transformación física y mental más reconocido, 
                    donde cada persona encuentre el apoyo y las herramientas necesarias 
                    para alcanzar su mejor versión y mantenerla a lo largo del tiempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6] py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-[#1A1A1A] mb-6">
                Nuestros <span className="text-[#ff6600]">Valores</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Los principios fundamentales que guían cada decisión y acción en Victor's Health Synergy
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <value.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-6">
                Nuestros <span className="text-[#ff6600]">Logros</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Números que reflejan nuestro compromiso y la confianza de nuestra comunidad
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-2xl p-8 mb-4">
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-white/80 font-semibold">
                      {achievement.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-[#1A1A1A] mb-6">
                Nuestro <span className="text-[#ff6600]">Equipo</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Profesionales certificados y apasionados por ayudarte a alcanzar tus objetivos
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-gradient-to-br from-[#fff7f0] to-[#f0f4ff] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiUsers className="text-white w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{member.name}</h3>
                    <p className="text-[#ff6600] font-semibold mb-1">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.speciality}</p>
                  </div>
                  
                  <p className="text-gray-700 text-center mb-6 leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2">Certificaciones:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.certifications.map((cert, certIndex) => (
                        <span key={certIndex} className="bg-[#ff6600]/10 text-[#ff6600] px-3 py-1 rounded-full text-xs font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
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
              ¿Listo para Comenzar tu <span className="text-black">Transformación?</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Únete a nuestra comunidad y descubre todo lo que puedes lograr con el apoyo adecuado. 
              Tu mejor versión te está esperando.
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
                Más Información
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
