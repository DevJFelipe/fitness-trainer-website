// src/components/BlogCard.jsx
import { Link } from 'react-router-dom';

export default function BlogCard({ image, title, href, excerpt }) {
    return (
      <Link
        to={`/blog/${href}`}
        className="group block bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-white/40 max-w-xl mx-auto"
        style={{ minHeight: 280 }}
      >
        <div className="aspect-[16/9] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
        <div className="p-5 flex flex-col gap-2">
          {excerpt && (
            <p className="mt-1 text-[#222] text-lg font-semibold leading-snug line-clamp-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    );
  }
  