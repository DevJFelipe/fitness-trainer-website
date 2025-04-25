const Navbar = () => {
  return (
    <nav className="bg-[#ff6600]">
      <div className="container mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-black font-black text-2xl tracking-wider">
            SHAPE<span className="text-white">FIT</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-12">
              {['Sobre Nosotros', 'Servicios'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative text-black font-bold group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            {/* Contact Button */}
            <button className="bg-black text-white px-8 py-2.5 rounded-full font-bold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              CONTÁCTANOS
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 