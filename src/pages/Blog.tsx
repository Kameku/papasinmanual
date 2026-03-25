import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Tag, User, ChevronRight, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blog';
import SEOHead from '../components/SEOHead';

/** Get unique tags with counts */
function getTagsWithCounts() {
  const map = new Map<string, { color: string; count: number }>();
  BLOG_POSTS.forEach((p) => {
    const existing = map.get(p.tag);
    if (existing) existing.count++;
    else map.set(p.tag, { color: p.color, count: 1 });
  });
  return Array.from(map.entries()).map(([tag, data]) => ({ tag, ...data }));
}

/** Get unique authors */
function getAuthors() {
  const set = new Set<string>();
  BLOG_POSTS.forEach((p) => set.add(p.author));
  return Array.from(set);
}

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag') || '';
  const [searchQuery, setSearchQuery] = useState('');

  const tags = getTagsWithCounts();
  const authors = getAuthors();

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesTag = !activeTag || post.tag === activeTag;
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      searchParams.delete('tag');
    } else {
      searchParams.set('tag', tag);
    }
    setSearchParams(searchParams);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <SEOHead
        title={activeTag ? `${activeTag} — Blog` : 'Blog — Crianza, Educación y Menos Pantallas'}
        description="Reflexiones, experiencias y debates sobre crianza responsable, educación infantil y el impacto de las pantallas en nuestros hijos. Artículos de Un Papá Sin Manual."
        path="/blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Blog - Un Papá Sin Manual',
          description: 'Artículos sobre crianza, educación responsable y menos pantallas.',
          url: 'https://unpapasinmanual.com/blog',
          isPartOf: {
            '@type': 'WebSite',
            name: 'Un Papá Sin Manual',
            url: 'https://unpapasinmanual.com',
          },
        }}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
          <nav className="mb-3 sm:mb-4">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-sky-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 mb-2">Blog</h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl">
            Reflexiones, experiencias y debates sobre crianza, educación responsable y el impacto de las pantallas en nuestros hijos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 xl:gap-10">

          {/* ════ Posts Grid ════ */}
          <div>
            {/* Search bar — mobile */}
            <div className="lg:hidden mb-5">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* Active filter tag — mobile */}
            {activeTag && (
              <div className="lg:hidden flex items-center gap-2 mb-4">
                <span className="text-sm text-slate-500">Filtrando por:</span>
                <button
                  onClick={() => handleTagClick(activeTag)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-bold"
                >
                  {activeTag} ✕
                </button>
              </div>
            )}

            {/* Tags — mobile horizontal scroll */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
              {tags.map((t) => (
                <button
                  key={t.tag}
                  onClick={() => handleTagClick(t.tag)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    activeTag === t.tag ? 'ring-2 ring-sky-400 ' + t.color : t.color + ' opacity-80'
                  }`}
                >
                  {t.tag}
                </button>
              ))}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-400 text-lg">No se encontraron artículos.</p>
                <button
                  onClick={() => { setSearchQuery(''); searchParams.delete('tag'); setSearchParams(searchParams); }}
                  className="mt-3 text-sky-600 font-bold text-sm hover:underline"
                >
                  Ver todos los artículos
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Featured Post (first) */}
                {filteredPosts.length > 0 && (() => {
                  const fp = filteredPosts[0];
                  return (
                    <Link to={`/blog/${fp.slug}`} className="block group">
                      <motion.article
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all sm:flex"
                      >
                        <div className="sm:w-1/2 aspect-video sm:aspect-auto overflow-hidden">
                          <img
                            style={{ objectPosition: fp.imagePosition || 'center' }}
                            src={fp.coverImage}
                            alt={fp.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="sm:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${fp.color}`}>
                              {fp.tag}
                            </span>
                            <span className="text-slate-400 text-xs">{fp.readTime}</span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-700 group-hover:text-sky-600 transition-colors leading-snug mb-3">
                            {fp.title}
                          </h2>
                          <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
                            {fp.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Por {fp.author} · {fp.date}</span>
                            <span className="text-sky-600 font-bold text-sm flex items-center gap-1">
                              Leer <ChevronRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  );
                })()}

                {/* Rest of posts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredPosts.slice(1).map((post, i) => (
                    <Link to={`/blog/${post.slug}`} key={post.slug} className="block group">
                      <motion.article
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: (i + 1) * 0.06 }}
                        className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-all h-full flex flex-col"
                      >
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            style={{ objectPosition: post.imagePosition || 'center' }}
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 sm:p-5 flex flex-col flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${post.color}`}>
                              {post.tag}
                            </span>
                            <span className="text-slate-400 text-xs">{post.readTime}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-700 group-hover:text-sky-600 transition-colors leading-snug mb-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3 flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                            <span className="text-xs text-slate-400">{post.author}</span>
                            <span className="text-sky-600 font-bold text-xs flex items-center gap-1">
                              Leer <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ════ Sidebar ════ */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">

              {/* Search */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Buscar
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Categorías
                </h3>
                <div className="space-y-1.5">
                  {tags.map((t) => (
                    <button
                      key={t.tag}
                      onClick={() => handleTagClick(t.tag)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                        activeTag === t.tag
                          ? 'bg-sky-50 text-sky-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{t.tag}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activeTag === t.tag ? 'bg-sky-200 text-sky-800' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {t.count}
                      </span>
                    </button>
                  ))}
                  {activeTag && (
                    <button
                      onClick={() => { searchParams.delete('tag'); setSearchParams(searchParams); }}
                      className="w-full text-center text-xs text-sky-600 font-bold mt-2 hover:underline"
                    >
                      Ver todos
                    </button>
                  )}
                </div>
              </div>

              {/* Authors */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Autores
                </h3>
                <div className="space-y-3">
                  {authors.map((author) => (
                    <div key={author} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-sky-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">{author}</p>
                        <p className="text-xs text-slate-400">
                          {BLOG_POSTS.filter((p) => p.author === author).length} artículo{BLOG_POSTS.filter((p) => p.author === author).length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Tools */}
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-5 text-white">
                <h3 className="font-bold text-base mb-2">Herramientas Educativas</h3>
                <p className="text-sky-100 text-xs leading-relaxed mb-4">
                  Genera material educativo personalizado y gratuito para tus hijos.
                </p>
                <Link
                  to="/herramientas"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-sky-700 rounded-xl font-bold text-sm hover:bg-sky-50 transition-colors"
                >
                  Comenzar
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
