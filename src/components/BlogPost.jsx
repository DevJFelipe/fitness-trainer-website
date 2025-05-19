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
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6]">
      <AuthNavbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 mt-8 mb-12 border border-white/40">
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4 drop-shadow-lg">
            {post.title}
          </h1>
          <p className="text-[#ff6600] font-semibold mb-8 text-base md:text-lg">
            {new Date(post.date).toLocaleDateString()}
          </p>
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[320px] object-cover rounded-2xl"
            />
          </div>
          <article className="prose prose-lg max-w-none prose-headings:text-[#1A1A1A] prose-a:text-[#ff6600] prose-strong:text-[#1A1A1A] prose-p:text-[#222]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
} 