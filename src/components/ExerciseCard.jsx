import React from 'react';
import { Link } from 'react-router-dom';

export default function ExerciseCard({ title, image, category, muscles }) {
  return (
    <Link 
      to={`/ejercicios/${title.toLowerCase().replace(/ /g, '-')}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        {/* Imagen */}
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        {/* Categoría */}
        <div className="absolute top-4 right-4">
          <span className="bg-[#ff6600] text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A] group-hover:text-[#ff6600] transition-colors duration-300">
          {title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {muscles.map((muscle, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
} 