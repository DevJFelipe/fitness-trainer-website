import React from 'react';
import ReactMarkdown from 'react-markdown';
import AuthNavbar from './AuthNavbar';
import { useParams, Navigate } from 'react-router-dom';
import { posts } from '../data/posts';

export default function BlogPost() {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" />;
  }

  return (
    <div className="bg-white min-h-screen">
      <AuthNavbar />
      <main className="container mx-auto px-6 py-10">
        {/* Cabecera del artículo */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-8">{new Date(post.date).toLocaleDateString()}</p>
          
          {/* Imagen destacada */}
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Contenido del artículo */}
          <article className="prose prose-lg max-w-none prose-headings:text-[#1A1A1A] prose-a:text-[#ff6600] prose-strong:text-[#1A1A1A]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
} 