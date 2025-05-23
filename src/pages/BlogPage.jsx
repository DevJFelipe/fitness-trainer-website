// src/components/BlogPage.jsx
import React, { useMemo } from 'react';
import AuthNavbar from '../components/layout/AuthNavbar';
import CategorySection from '../components/CategorySection';
import { posts } from '../data/posts';
import BlogCard from '../components/blog/BlogCard';

export default function BlogPage() {
  const organizedPosts = useMemo(() => {
    const entrenamiendoPosts = posts.filter(post => post.category === 'entrenamiento');
    const adelgazarPosts = posts.filter(post => post.category === 'adelgazar');

    return [
      {
        title: 'Entrenamiento',
        posts: entrenamiendoPosts.map(post => ({
          title: post.title,
          image: post.image,
          href: post.id,
          excerpt: post.excerpt
        }))
      },
      {
        title: 'Adelgazar',
        posts: adelgazarPosts.map(post => ({
          title: post.title,
          image: post.image,
          href: post.id,
          excerpt: post.excerpt
        }))
      }
    ];
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#f0f4ff] to-[#ffe6e6]">
      <AuthNavbar />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] mb-12 text-center drop-shadow-lg">
          <span className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent">Blog</span> ShapeFit
        </h1>
        <div className="flex flex-col gap-20">
          {organizedPosts.map((section, idx) => (
            <section key={idx} className="">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] tracking-tight drop-shadow-sm">
                  {section.title}
                </h2>
                <a
                  href="#"
                  className="text-sm text-[#ff6600] bg-white/70 px-4 py-2 rounded-full shadow hover:bg-[#ff6600] hover:text-white transition-colors duration-300 font-semibold border border-[#ff6600]/20"
                >
                  Ver todo
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {section.posts.map((p, i) => (
                  <BlogCard key={i} image={p.image} title={p.title} href={p.href} excerpt={p.excerpt} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <footer className="text-center py-8 text-base text-[#1A1A1A]/70 bg-white/60 mt-16 rounded-t-2xl shadow-inner">
        Copyright © EresFitness.
      </footer>
    </div>
  );
}
