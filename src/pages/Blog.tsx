import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    title: '¿Por qué alejar a los niños de YouTube es una de las mejores decisiones?',
    excerpt: 'Las pantallas no son niñeras. Descubre cómo el consumo excesivo de contenido digital afecta el desarrollo de nuestros hijos.',
    tag: 'Salud Digital',
    color: 'bg-red-50 text-red-600',
  },
  {
    title: 'Aprender jugando: la ciencia detrás del aprendizaje activo',
    excerpt: 'Los niños no aprenden sentados escuchando. Aprenden haciendo, tocando, creando. Convierte cualquier tema en actividad divertida.',
    tag: 'Educación',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    title: 'Ser papá sin manual: mi experiencia real',
    excerpt: 'Nadie te prepara para ser padre. Comparto los errores que cometí, lo que aprendí y por qué decidí crear herramientas para otros papás.',
    tag: 'Experiencia',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'La televisión vs. la lectura: lo que los estudios dicen',
    excerpt: 'Un niño que lee 20 minutos al día está expuesto a 1.8 millones de palabras al año. Uno que solo ve TV, casi cero.',
    tag: 'Investigación',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: '5 actividades que reemplazan una hora de pantalla',
    excerpt: 'Sopas de letras, cuentos inventados, dibujos libres, experimentos caseros y juegos de mesa. Ideas prácticas que funcionan.',
    tag: 'Actividades',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Educación responsable: el rol del padre en el aprendizaje',
    excerpt: 'No se trata de hacer las tareas por ellos. Se trata de estar presente, de crear el ambiente, de hacer las preguntas correctas.',
    tag: 'Crianza',
    color: 'bg-orange-50 text-orange-600',
  },
];

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
            <motion.article
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-sky-100 hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
            >
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-2 sm:mb-3 ${post.color}`}>
                {post.tag}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-700 mb-2 group-hover:text-sky-600 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
