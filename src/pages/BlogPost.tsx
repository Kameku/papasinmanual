import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Tag, User, ChevronRight, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BLOG_POSTS, type BlogPost as BlogPostType } from '../data/blog';
import SEOHead from '../components/SEOHead';
import Disclaimer from '../components/Disclaimer';

/** Extract h2/h3 headings from markdown for table of contents */
function extractHeadings(content: string) {
  const headings: { level: number; text: string; id: string }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[2].replace(/\*\*/g, '');
    const id = text
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ level: match[1].length, text, id });
  }
  return headings;
}

/** Get unique tags with counts */
function getTagsWithCounts() {
  const map = new Map<string, { color: string; count: number }>();
  BLOG_POSTS.forEach((p) => {
    const existing = map.get(p.tag);
    if (existing) {
      existing.count++;
    } else {
      map.set(p.tag, { color: p.color, count: 1 });
    }
  });
  return Array.from(map.entries()).map(([tag, data]) => ({ tag, ...data }));
}

/** Get related posts (same tag first, then others) */
function getRelatedPosts(current: BlogPostType, limit = 3) {
  return BLOG_POSTS
    .filter((p) => p.slug !== current.slug)
    .sort((a, b) => (a.tag === current.tag ? -1 : 1) - (b.tag === current.tag ? -1 : 1))
    .slice(0, limit);
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const headings = extractHeadings(post.content);
  const tags = getTagsWithCounts();
  const relatedPosts = getRelatedPosts(post);

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.coverImage.startsWith('http') ? post.coverImage : `https://solounpapareal.com${post.coverImage}`}
        publishedTime={post.date}
        author={post.author}
      />

      <article itemScope itemType="https://schema.org/BlogPosting">

        {/* ── Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
          <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-sky-600 transition-colors">
                <span itemProp="name">Inicio</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <ChevronRight className="w-3.5 h-3.5" />
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/blog" itemProp="item" className="hover:text-sky-600 transition-colors">
                <span itemProp="name">Blog</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <ChevronRight className="w-3.5 h-3.5" />
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="text-slate-600 font-medium truncate max-w-[200px] sm:max-w-xs">
              <span itemProp="name">{post.title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* ── Main Layout: Content + Sidebar ── */}
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 xl:gap-10">

            {/* ════ LEFT: Article Content ════ */}
            <div className="min-w-0">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden"
              >
                {/* Cover Image */}
                <div className="relative aspect-[2/1] sm:aspect-[2.2/1] overflow-hidden">
                  <img
                    itemProp="image"
                    style={{ objectPosition: post.imagePosition || 'center' }}
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md ${post.color}`}>
                      {post.tag}
                    </span>
                  </div>
                </div>

                {/* Article Header */}
                <div className="p-5 sm:p-8 md:p-10">
                  <h1 itemProp="headline" className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-4 sm:mb-5">
                    {post.title}
                  </h1>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-500 text-xs sm:text-sm mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-100">
                    <time itemProp="datePublished" content={post.date} className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {post.date}
                    </time>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {post.readTime}
                    </span>
                    <span itemProp="author" itemScope itemType="https://schema.org/Person" className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" />
                      <span itemProp="name">{post.author}</span>
                    </span>
                  </div>

                  <meta itemProp="description" content={post.excerpt} />

                  {/* Table of Contents — mobile only (on desktop it's in the sidebar) */}
                  {headings.length > 0 && (
                    <div className="lg:hidden mb-8 bg-sky-50/50 border border-sky-100 rounded-2xl p-4 sm:p-5">
                      <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-sky-500" />
                        En este artículo
                      </h2>
                      <ul className="space-y-1.5">
                        {headings.map((h) => (
                          <li key={h.id} className={h.level === 3 ? 'ml-4' : ''}>
                            <a
                              href={`#${h.id}`}
                              className="text-sm text-slate-500 hover:text-sky-600 transition-colors block py-0.5"
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Article Body */}
                  <div itemProp="articleBody" className="prose prose-slate prose-base sm:prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-h2:text-slate-800 prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-sky-600 prose-h3:text-lg prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-sky-500 hover:prose-a:text-sky-600 prose-strong:text-slate-700 prose-img:rounded-xl">
                    <ReactMarkdown
                      components={{
                        h2: ({ children, ...props }) => {
                          const text = String(children);
                          const id = text
                            .toLowerCase()
                            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, '');
                          return <h2 id={id} {...props}>{children}</h2>;
                        },
                        h3: ({ children, ...props }) => {
                          const text = String(children);
                          const id = text
                            .toLowerCase()
                            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, '');
                          return <h3 id={id} {...props}>{children}</h3>;
                        },
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>

                  {/* Disclaimer */}
                  <Disclaimer className="mt-10" />

                  {/* CTA */}
                  <div className="mt-8 bg-sky-50/50 rounded-2xl p-5 sm:p-6 text-center border border-sky-100">
                    <h4 className="text-base sm:text-lg font-bold text-slate-700 mb-2">¿Te gustó este artículo?</h4>
                    <p className="text-slate-500 mb-4 text-sm">
                      Apoya la iniciativa familiar para seguir creando herramientas educativas para todos.
                    </p>
                    <button
                      onClick={() => document.getElementById('btn-donar-header')?.click()}
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors shadow-md shadow-sky-200 text-sm"
                    >
                      Apoyar este proyecto
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* ── Related Posts ── */}
              {relatedPosts.length > 0 && (
                <section className="mt-8 sm:mt-10">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-700 mb-4 sm:mb-5">Artículos relacionados</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.slug}
                        to={`/blog/${rp.slug}`}
                        className="group bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            style={{ objectPosition: rp.imagePosition || 'center' }}
                            src={rp.coverImage}
                            alt={rp.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2 ${rp.color}`}>
                            {rp.tag}
                          </span>
                          <h3 className="text-sm font-bold text-slate-700 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                            {rp.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1.5">{rp.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ════ RIGHT: Sidebar ════ */}
            <aside className="hidden lg:block space-y-6">
              <div className="sticky top-20 space-y-6">

                {/* Author Card */}
                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Autor</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{post.author}</p>
                      <p className="text-xs text-slate-400">Creador del proyecto</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Padre, desarrollador y creador de herramientas educativas gratuitas. Creyente de que menos pantallas y más lápices hacen la diferencia.
                  </p>
                </div>

                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      En este artículo
                    </h3>
                    <ul className="space-y-1">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className={`block text-sm py-1 hover:text-sky-600 transition-colors ${
                              h.level === 3
                                ? 'ml-3 text-slate-400 hover:text-sky-500'
                                : 'text-slate-600 font-medium'
                            }`}
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Categories */}
                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Categorías
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <Link
                        key={t.tag}
                        to={`/blog?tag=${encodeURIComponent(t.tag)}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 ${
                          t.tag === post.tag
                            ? t.color + ' ring-2 ring-offset-1 ring-sky-300'
                            : t.color
                        }`}
                      >
                        {t.tag}
                        <span className="text-[10px] opacity-70">({t.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Artículos recientes
                  </h3>
                  <div className="space-y-3">
                    {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 4).map((rp) => (
                      <Link
                        key={rp.slug}
                        to={`/blog/${rp.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            style={{ objectPosition: rp.imagePosition || 'center' }}
                            src={rp.coverImage}
                            alt={rp.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-700 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                            {rp.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{rp.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Tools */}
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-5 text-white">
                  <h3 className="font-bold text-base mb-2">Herramientas Educativas</h3>
                  <p className="text-sky-100 text-xs leading-relaxed mb-4">
                    Genera guías de estudio, exámenes, lecturas y ejercicios de escritura personalizados para tus hijos. 100% gratis.
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
      </article>
    </main>
  );
}
