import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BLOG_POSTS } from '../data/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-sky-50 pb-16">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] min-h-[300px] sm:h-[50vh] xl:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 z-10" />
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center z-20 p-4">
          <div className="max-w-4xl mx-auto w-full">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium transition-all mb-6 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-bold shadow-md mb-4 ${post.color}`}>
                {post.tag}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm sm:text-base font-medium drop-shadow-md">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Lectura: {post.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-16 relative z-30">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border border-sky-100"
        >
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-h3:text-sky-600 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-sky-500 hover:prose-a:text-sky-600 prose-strong:text-slate-700">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>

          <hr className="my-10 border-slate-100" />

          {/* Call to action */}
          <div className="bg-sky-50/50 rounded-2xl p-6 text-center border border-sky-100">
            <h4 className="text-lg font-bold text-slate-700 mb-2">¿Te gustó este artículo?</h4>
            <p className="text-slate-500 mb-4 text-sm sm:text-base">
              Apoya la iniciativa familiar para seguir creando herramientas educativas para todos.
            </p>
            <button 
              onClick={() => {
                const navBtn = document.getElementById('btn-donar-nav');
                if (navBtn) navBtn.click();
              }}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors shadow-md shadow-sky-200"
            >
              Apoyar este proyecto
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
