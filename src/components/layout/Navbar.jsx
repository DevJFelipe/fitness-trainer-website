import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navLinks = [
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Servicios', href: '/servicios' }
  ]

  return (
    <nav className="bg-[#ff6600]">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/"
            className="text-black font-black text-xl md:text-2xl tracking-wider hover:scale-105 transition-transform duration-300"
          >
            Victor's <span className="text-white">Health Synergy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-8 lg:gap-12">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="relative text-black font-bold group transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full group-hover:bg-white"></span>
                </Link>
              ))}
            </div>
            
            {/* Contact Button */}
            <Link 
              to="/contactanos"
              className="bg-black text-white px-6 lg:px-8 py-2.5 rounded-full font-bold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm lg:text-base"
            >
              CONTÁCTANOS
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black hover:text-white transition-colors duration-300 p-2"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-black font-bold hover:text-white transition-colors duration-300 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/contactanos"
                className="bg-black text-white px-6 py-2.5 rounded-full font-bold hover:bg-gray-900 transition-all duration-300 text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTÁCTANOS
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 