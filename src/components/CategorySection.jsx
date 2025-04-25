// src/components/CategorySection.jsx
import BlogCard from './BlogCard';

export default function CategorySection({ title, posts }) {
  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#1A1A1A]">{title}</h2>
        <a
          href="#"
          className="text-sm text-[#1A1A1A]/70 bg-[#F5F5F5] px-3 py-1 rounded-full hover:bg-[#E0E0E0] transition"
        >
          Ver todo
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <BlogCard key={i} image={p.image} title={p.title} href={p.href} />
        ))}
      </div>
    </section>
  );
}
