import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blog';

export default function Blog() {
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="mb-3 sm:mb-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-sky-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 mb-2 sm:mb-3">Blog</h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
            Reflexiones, experiencias y debates sobre crianza, educación responsable y el impacto de las pantallas.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {BLOG_POSTS.map((post, i) => (
            <Link to={`/blog/${post.slug}`} key={i} className="block group">
              <motion.article
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-sky-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all flex flex-col h-full overflow-hidden"
              >
                <div className="rounded-xl overflow-hidden mb-4 relative aspect-video">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${post.color}`}>
                    {post.tag}
                  </span>
                  <span className="text-slate-400 font-medium text-xs">• {post.readTime}</span>
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-slate-700 mb-2 group-hover:text-sky-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-1 text-sky-600 font-bold text-sm">
                  Leer artículo <span>→</span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
