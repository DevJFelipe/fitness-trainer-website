import { Link } from 'react-router-dom'

const Navbar = () => {
  const navLinks = [
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Servicios', href: '/servicios' }
  ]

  return (
    <nav className="bg-[#ff6600]">
      <div className="container mx-auto px-8 py-4">
        <div className="flex justify-between items-center">          {/* Logo */}
          <Link 
            to="/"
            className="text-black font-black text-2xl tracking-wider hover:scale-105 transition-transform duration-300"
          >
            Victor's <span className="text-white">Health Synergy</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-12">
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
              className="bg-black text-white px-8 py-2.5 rounded-full font-bold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              CONTÁCTANOS
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 