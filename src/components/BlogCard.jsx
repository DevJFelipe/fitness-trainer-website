// src/components/BlogCard.jsx
import { Link } from 'react-router-dom';

export default function BlogCard({ image, title, href, excerpt }) {
    return (
      <Link
        to={`/blog/${href}`}
        className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="aspect-[16/9] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A] group-hover:text-[#ff6600] transition-colors duration-300">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-2 text-gray-600 line-clamp-2">{excerpt}</p>
          )}
        </div>
      </Link>
    );
  }
  