import React from 'react';
import { Link } from 'react-router-dom';
import AuthNavbar from '../layout/AuthNavbar';
import BlogCard from './BlogCard';
import { posts } from '../../data/posts';

export default function BlogCategoryPage({ category }) {
  // Filtrar posts por categoría
  const categoryPosts = posts.filter(post => post.category === category);
  
  // Traducir categoría para mostrar
  const categoryTitles = {
    entrenamiento: 'Entrenamiento',
    adelgazar: 'Adelgazar'
  };

  const categoryTitle = categoryTitles[category] || 'Categoría';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6]">
      <AuthNavbar />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Botón volver al blog */}
        <div className="mb-8">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-[#ff6600] hover:text-[#ff8533] transition-colors duration-300 font-semibold"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al Blog
          </Link>
        </div>

        {/* Título de la categoría */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] mb-6 drop-shadow-lg">
            Artículos de <span className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent">{categoryTitle}</span>
          </h1>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto">
            Descubre todos nuestros artículos especializados en {categoryTitle.toLowerCase()}
          </p>
        </div>

        {/* Grid de artículos */}
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {categoryPosts.map((post, index) => (
              <BlogCard 
                key={index} 
                image={post.image} 
                title={post.title} 
                href={post.id} 
                excerpt={post.excerpt} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-12 border border-white/40 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                No hay artículos disponibles
              </h3>
              <p className="text-[#1A1A1A]/70 mb-6">
                Aún no tenemos artículos en esta categoría, pero estamos trabajando en crear contenido increíble para ti.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-[#ff6600] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff8533] transition-colors duration-300"
              >
                Explorar Otros Artículos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* Estadísticas de la categoría */}
        {categoryPosts.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-8 border border-white/40 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                Estadísticas de {categoryTitle}
              </h3>
              <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#ff6600] mb-1">
                    {categoryPosts.length}
                  </div>
                  <div className="text-sm text-[#1A1A1A]/70">
                    Artículos
                  </div>
                </div>
                <div className="w-px h-12 bg-[#1A1A1A]/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#ff6600] mb-1">
                    {Math.ceil(categoryPosts.length * 5)} {/* Estimación de tiempo de lectura */}
                  </div>
                  <div className="text-sm text-[#1A1A1A]/70">
                    Min. lectura
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-base text-[#1A1A1A]/70 bg-white/60 mt-16 rounded-t-2xl shadow-inner">
        Copyright © Victor's Health Synergy.
      </footer>
    </div>
  );
}
