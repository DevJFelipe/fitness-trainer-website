// src/components/AuthNavbar.jsx
import { FaSearch, FaBars, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const links = [
  { label: 'Blog', href: '/blog' },
  { label: 'Ejercicios', href: '/ejercicios' },
  { label: 'Rutinas', href: '/rutinas' },
];

export default function AuthNavbar() {
  return (
    <header className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            className="text-black font-black text-2xl tracking-wider transform hover:scale-105 transition-transform duration-300"
          >
            SHAPE<span className="text-white">FIT</span>
          </a>

          {/* Enlaces de navegación - Escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-white font-semibold py-2 group transition-colors duration-300"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Iconos y botones */}
          <div className="flex items-center space-x-6">
            {/* Búsqueda */}
            <button className="text-white hover:text-black transition-colors duration-300">
              <FaSearch size={20} />
            </button>

            {/* Perfil */}
            <Link to="/perfil" className="hidden md:flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300">
              <FaUserCircle size={20} />
              <span className="font-semibold">Mi Perfil</span>
            </Link>

            {/* Menú móvil */}
            <button className="md:hidden text-white hover:text-black transition-colors duration-300">
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
