// src/pages/ContactPage.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Background from '../components/layout/Background'
import Navbar from '../components/layout/Navbar'
import backgroundImage from '../assets/background-image.png'
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCalendar,
  FiCheck,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube
} from 'react-icons/fi'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        preferredTime: ''
      })
    }, 2000)
  }

  const contactInfo = [
    {
      icon: FiPhone,
      title: "Teléfono",
      info: "+57 (8) 875-1234",
      description: "Lunes a Domingo, 6:00 AM - 11:00 PM",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FiMail,
      title: "Email",
      info: "info@victorshealthsynergy.com",
      description: "Respuesta en menos de 2 horas",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FiMapPin,
      title: "Dirección",
      info: "Calle 26 #15-45, Neiva, Huila",
      description: "Fácil acceso y parqueadero gratuito",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FiClock,
      title: "Horarios",
      info: "24/7 - Acceso sin restricciones",
      description: "Administración: Lun-Vie 8AM-8PM",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const services = [
    "Entrenamiento Personal",
    "Clases Grupales",
    "Plan Nutricional",
    "Wellness & Recovery",
    "Transformation Challenge",
    "Rehabilitación Deportiva",
    "Consulta Gratuita",
    "Otro"
  ]

  const timeSlots = [
    "Mañana (6:00 AM - 12:00 PM)",
    "Tarde (12:00 PM - 6:00 PM)",
    "Noche (6:00 PM - 11:00 PM)",
    "Fines de semana",
    "Flexible"
  ]

  const socialLinks = [
    { icon: FiInstagram, href: "#", name: "@victorshealthsynergy" },
    { icon: FiFacebook, href: "#", name: "Victor's Health Synergy" },
    { icon: FiTwitter, href: "#", name: "@victorshealth" },
    { icon: FiYoutube, href: "#", name: "Victor's Health Synergy" }
  ]

  if (submitted) {
    return (
      <div className="min-h-screen relative">
        <Background image={backgroundImage} />
        
        <div className="relative z-10">
          <Navbar />
          
          <div className="container mx-auto px-8 py-20 flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-2xl p-12 max-w-2xl mx-auto text-center shadow-2xl">
              <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
                <FiCheck className="text-white w-10 h-10" />
              </div>
              <h2 className="text-4xl font-black text-[#1A1A1A] mb-6">
                ¡Mensaje Enviado <span className="text-[#ff6600]">Exitosamente!</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Gracias por contactarnos. Nuestro equipo se pondrá en contacto contigo 
                en las próximas 2 horas para agendar tu consulta gratuita.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="bg-[#ff6600] text-white px-8 py-3 rounded-full font-bold hover:bg-[#ff8533] transition-all duration-300 transform hover:scale-105"
                >
                  Volver al Inicio
                </Link>
                <Link
                  to="/servicios"
                  className="border-2 border-[#ff6600] text-[#ff6600] px-8 py-3 rounded-full font-bold hover:bg-[#ff6600] hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Ver Servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <Background image={backgroundImage} />
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="container mx-auto px-8 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black text-white leading-tight mb-8">
              CONTÁCTANOS
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
              Estamos aquí para ayudarte a comenzar tu transformación. 
              Agenda tu consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos.
            </p>
          </div>
        </section>
      </div>

      {/* Contact Info Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-[#1A1A1A] mb-6">
                Información de <span className="text-[#ff6600]">Contacto</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Múltiples formas de ponerte en contacto con nosotros. Elige la que más te convenga.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-[#fff7f0] to-[#f0f4ff] rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`bg-gradient-to-br ${item.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6`}>
                    <item.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{item.title}</h3>
                  <p className="text-[#ff6600] font-semibold mb-2">{item.info}</p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6] py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-[#1A1A1A] mb-6">
                Agenda tu <span className="text-[#ff6600]">Consulta Gratuita</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Completa el formulario y nos pondremos en contacto contigo para agendar tu consulta gratuita
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none transition-all duration-300"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none transition-all duration-300"
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Servicio de Interés
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none transition-all duration-300"
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Horario Preferido
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none transition-all duration-300"
                    >
                      <option value="">Selecciona tu horario preferido</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6600] focus:border-transparent outline-none transition-all duration-300 resize-none"
                      placeholder="Cuéntanos sobre tus objetivos, experiencia previa, dudas o cualquier información relevante..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black text-white mb-6">
              Síguenos en <span className="text-[#ff6600]">Redes Sociales</span>
            </h2>
            <p className="text-lg text-gray-300 mb-12">
              Únete a nuestra comunidad digital y mantente actualizado con tips, motivación y contenido exclusivo
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 group"
                >
                  <social.icon className="text-[#ff6600] w-8 h-8 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-white font-semibold text-sm">{social.name}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[#1A1A1A] mb-6">
                Nuestra <span className="text-[#ff6600]">Ubicación</span>
              </h2>
              <p className="text-lg text-gray-700">
                Fácil acceso en el corazón de Neiva, con parqueadero gratuito para nuestros miembros
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#fff7f0] to-[#f0f4ff] rounded-2xl p-8 md:p-12">
              <div className="aspect-video bg-gray-300 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="text-[#ff6600] w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Mapa Interactivo</h3>
                  <p className="text-gray-600 mb-4">Calle 26 #15-45, Neiva, Huila</p>
                  <p className="text-sm text-gray-500">
                    * Aquí se integrará el mapa de Google Maps en la implementación final
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <FiMapPin className="text-white w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#1A1A1A] mb-1">Fácil Acceso</h4>
                  <p className="text-gray-600 text-sm">Ubicación central con excelente conectividad</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <FiClock className="text-white w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#1A1A1A] mb-1">Horarios Extendidos</h4>
                  <p className="text-gray-600 text-sm">Abierto 24/7 para tu comodidad</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <FiCheck className="text-white w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#1A1A1A] mb-1">Parqueadero Gratuito</h4>
                  <p className="text-gray-600 text-sm">Espacios seguros y disponibles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black text-white mb-6">
              ¿Listo para <span className="text-black">Transformar tu Vida?</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Tu mejor versión está a solo un mensaje de distancia. 
              Contáctanos hoy y comienza tu viaje hacia una vida más saludable y plena.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="bg-white text-[#ff6600] px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Únete Ahora
              </Link>
              <a
                href="tel:+578875123"
                className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-[#ff6600] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FiPhone />
                Llamar Ahora
              </a>
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
