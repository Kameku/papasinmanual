import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Brain, BookOpenCheck, PenLine, Pencil, ArrowRight, Heart, Tv, BookOpen, Users, Shield } from 'lucide-react';

const TOOLS = [
  { icon: <Brain className="w-7 h-7 sm:w-8 sm:h-8" />, title: 'Guías de Estudio', desc: 'Ejercicios interactivos para imprimir: sopa de letras, V/F, unir y más', color: 'text-sky-600', bg: 'bg-sky-50' },
  { icon: <Pencil className="w-7 h-7 sm:w-8 sm:h-8" />, title: 'Exámenes Prácticos', desc: 'Exámenes personalizados para reforzar el aprendizaje', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: <BookOpenCheck className="w-7 h-7 sm:w-8 sm:h-8" />, title: 'Lecturas', desc: 'Cuentos, fábulas, poemas adaptados a cada edad', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: <PenLine className="w-7 h-7 sm:w-8 sm:h-8" />, title: 'Escritura', desc: 'Ejercicios de ortografía, vocabulario y escritura creativa', color: 'text-purple-600', bg: 'bg-purple-50' },
];

const BLOG_POSTS = [
  {
    title: '¿Por qué alejar a los niños de YouTube es una de las mejores decisiones?',
    excerpt: 'Las pantallas no son niñeras. Descubre cómo el consumo excesivo de contenido digital afecta el desarrollo cognitivo, emocional y social de nuestros hijos.',
    tag: 'Salud Digital',
    color: 'bg-red-50 text-red-600',
  },
  {
    title: 'Aprender jugando: la ciencia detrás del aprendizaje activo',
    excerpt: 'Los niños no aprenden sentados escuchando. Aprenden haciendo, tocando, creando. Convierte cualquier tema escolar en una actividad divertida.',
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

export default function Landing() {
  return (
    <div className="min-h-screen bg-sky-50">

      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 sm:w-40 h-32 sm:h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 sm:right-20 w-40 sm:w-60 h-40 sm:h-60 bg-yellow-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20 md:py-28 relative">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-3 sm:px-4 py-1.5 bg-white/20 backdrop-blur rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              100% Gratuito — Hecho con amor de papá
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Un Papá <span className="text-yellow-300">Sin Manual</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-sky-100 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              Herramientas educativas creadas por un padre para padres. Porque la mejor inversión
              que podemos hacer es <strong className="text-white">alejar a nuestros hijos de las pantallas</strong> y
              acercarlos al aprendizaje real.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                to="/herramientas"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-sky-700 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 sm:hover:scale-105"
              >
                Usar Herramientas Gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#blog"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur text-white border-2 border-white/30 rounded-2xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all active:scale-95"
              >
                Leer el Blog
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ MISIÓN ══════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: <Tv className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" />, bg: 'bg-red-50', title: 'Menos Pantallas', desc: 'YouTube y la televisión no educan. Reemplazamos el tiempo de pantalla con actividades que realmente desarrollan el cerebro de nuestros hijos.' },
              { icon: <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-sky-500" />, bg: 'bg-sky-50', title: 'Más Aprendizaje', desc: 'Guías interactivas, lecturas adaptadas, ejercicios creativos. Todo diseñado para que aprender sea tan divertido como jugar.' },
              { icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" />, bg: 'bg-amber-50', title: 'Padres Presentes', desc: 'No necesitas ser maestro. Solo necesitas estar presente. Estas herramientas te ayudan a acompañar a tus hijos en su educación.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 sm:p-6"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 ${item.bg} rounded-2xl mb-3 sm:mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-700 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HERRAMIENTAS ══════ */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 mb-2 sm:mb-3">Herramientas Educativas</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
              Genera material educativo personalizado en segundos. Solo necesitas la edad de tu hijo y el tema.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/herramientas"
                  className={`block p-4 sm:p-6 ${tool.bg} rounded-2xl border border-white/50 hover:shadow-lg transition-all group active:scale-[0.98]`}
                >
                  <div className={`${tool.color} mb-2 sm:mb-3`}>{tool.icon}</div>
                  <h3 className={`text-sm sm:text-lg font-bold ${tool.color} mb-1 group-hover:underline`}>{tool.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm hidden sm:block">{tool.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/herramientas"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-sm sm:text-base transition-all active:scale-95"
            >
              Comenzar Ahora — Es Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ BLOG ══════ */}
      <section id="blog" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 mb-2 sm:mb-3">Blog</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
              Reflexiones, experiencias y debates sobre crianza, educación responsable y el impacto de las pantallas en nuestros hijos.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-sky-50/50 rounded-2xl p-5 sm:p-6 border border-sky-100 hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
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
      </section>

      {/* ══════ CTA DONACIÓN ══════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-4 sm:mb-6">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500 fill-amber-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 mb-3 sm:mb-4">
            Este proyecto es gratuito
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            No hay suscripciones, ni versiones premium, ni anuncios. Solo un papá usando sus habilidades para ayudar a otros padres.
            Si este proyecto te resulta útil, puedes apoyarlo con un donativo voluntario.
          </p>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <Heart className="w-5 h-5 fill-white" />
            Apoyar el Proyecto
          </a>
        </div>
      </section>

      {/* ══════ MANIFIESTO ══════ */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-sky-100">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-700">Nuestro Compromiso</h2>
            </div>
            <div className="space-y-3 sm:space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                <strong className="text-slate-700">Creo que los niños merecen algo mejor que una pantalla.</strong> Como padre,
                he visto cómo YouTube y la televisión se convierten en la "solución fácil" para mantener a los niños quietos.
                Pero esa tranquilidad tiene un costo alto en su desarrollo.
              </p>
              <p>
                Este proyecto nace de mi experiencia real como papá. No soy pedagogo ni experto en educación.
                Soy un padre que decidió usar sus habilidades técnicas para crear algo útil:
                <strong className="text-slate-700"> herramientas que convierten el tiempo de estudio en algo divertido</strong>,
                que se pueden imprimir, que se hacen a mano, que requieren pensar y crear.
              </p>
              <p>
                La premisa es simple: <strong className="text-sky-600">menos pantallas, más lápices. Menos algoritmos, más imaginación.
                Menos consumo pasivo, más aprendizaje activo.</strong>
              </p>
              <p className="text-slate-500 text-xs sm:text-sm italic">
                — Un Papá Sin Manual
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-slate-800 text-slate-400 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-bold text-white mb-2 text-sm sm:text-base">Un Papá Sin Manual</p>
          <p className="text-xs sm:text-sm mb-4">Herramientas educativas gratuitas hechas con amor de papá.</p>
          <div className="flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link to="/herramientas" className="hover:text-white transition-colors">Herramientas</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Donar</a>
          </div>
          <p className="text-xs mt-6 text-slate-500">
            © {new Date().getFullYear()} Un Papá Sin Manual. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
