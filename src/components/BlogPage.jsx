// src/components/BlogPage.jsx
import React, { useMemo } from 'react';
import AuthNavbar from './AuthNavbar';
import CategorySection from './CategorySection';
import { posts } from '../data/posts';

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
    <div className="bg-white min-h-screen">
      <AuthNavbar />
      <main className="container mx-auto px-6 py-10">
        {organizedPosts.map((section, idx) => (
          <CategorySection key={idx} title={section.title} posts={section.posts} />
        ))}
      </main>
      <footer className="text-center py-6 text-sm text-[#1A1A1A]/70">
        Copyright © EresFitness.  
      </footer>
    </div>
  );
}
