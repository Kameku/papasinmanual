import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Brain, BookOpenCheck, PenLine, Pencil, ArrowRight, Heart, Tv, BookOpen, Users, Shield, BookHeart, Sparkles, Clock, Download, Instagram, Youtube } from 'lucide-react';
import DonationModal from '../components/DonationModal';
import SEOHead from '../components/SEOHead';
import Disclaimer from '../components/Disclaimer';

const TOOLS = [
  { 
    toolKey: 'guide',
    icon: <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-white" />, 
    title: 'Guías de Estudio', 
    desc: 'Transforma cualquier tema aburrido en una actividad divertida para imprimir.',
    howTo: 'Sube una foto del cuaderno o escribe el tema. Generamos hoja con sopa de letras, V/F y más.',
    cardClasses: 'bg-sky-500 hover:bg-sky-400 shadow-sky-500/40',
    iconBoxClasses: 'bg-sky-400',
    textColor: 'text-white',
    descColor: 'text-sky-50',
    howBg: 'bg-sky-700/20',
  },
  { 
    toolKey: 'exam',
    icon: <Pencil className="w-10 h-10 sm:w-12 sm:h-12 text-white" />, 
    title: 'Exámenes Prácticos', 
    desc: 'Evalúa lo que han aprendido en casa sin la presión de la escuela.',
    howTo: 'Elige el número de preguntas y el estilo (hoja de trabajo o selección). Disponible en bilingüe.',
    cardClasses: 'bg-orange-500 hover:bg-orange-400 shadow-orange-500/40',
    iconBoxClasses: 'bg-orange-400',
    textColor: 'text-white',
    descColor: 'text-orange-50',
    howBg: 'bg-orange-700/20',
  },
  { 
    toolKey: 'reading',
    icon: <BookOpenCheck className="w-10 h-10 sm:w-12 sm:h-12 text-white" />, 
    title: 'Lecturas a Medida', 
    desc: 'Fomenta el hábito de la lectura con historias creadas especialmente para ellos.',
    howTo: 'Elige un tipo (cuento, fábula, etc.) y tema. Recibes historia ilustrada con preguntas.',
    cardClasses: 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/40',
    iconBoxClasses: 'bg-emerald-400',
    textColor: 'text-white',
    descColor: 'text-emerald-50',
    howBg: 'bg-emerald-700/20',
  },
  { 
    toolKey: 'writing',
    icon: <PenLine className="w-10 h-10 sm:w-12 sm:h-12 text-white" />, 
    title: 'Caligrafía y Ortografía',
    desc: 'Mejora el trazo, la letra y la ortografía de tu hijo con ejercicios para imprimir.',
    howTo: 'Elige entre caligrafía, dictados, ortografía, sílabas, oraciones o copia creativa. Todo adaptado a su edad.',
    cardClasses: 'bg-purple-500 hover:bg-purple-400 shadow-purple-500/40',
    iconBoxClasses: 'bg-purple-400',
    textColor: 'text-white',
    descColor: 'text-purple-50',
    howBg: 'bg-purple-700/20',
  },
];

// (Removed local BLOG_POSTS array, importing from data/blog.ts instead)
import { BLOG_POSTS } from '../data/blog';

export default function Landing() {
  const [donationOpen, setDonationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sky-50">
      <SEOHead
        title="Solo un Papá REAL — Herramientas Educativas Gratuitas para Padres"
        description="Herramientas educativas gratuitas creadas por un padre para padres. Guías de estudio, exámenes, lecturas y ejercicios de escritura para niños. Menos pantallas, más aprendizaje real."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Solo un Papá REAL',
          url: 'https://solounpapareal.com',
          description: 'Herramientas educativas gratuitas creadas por un padre para padres.',
          inLanguage: 'es',
          publisher: {
            '@type': 'Organization',
            name: 'Solo un Papá REAL',
            url: 'https://solounpapareal.com',
          },
        }}
      />

      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 sm:w-40 h-32 sm:h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 sm:right-20 w-40 sm:w-60 h-40 sm:h-60 bg-yellow-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Texto Hero */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 bg-white/20 backdrop-blur rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                100% Gratuito — Hecho con amor de papá
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Solo un Papá <span className="text-yellow-300">REAL</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-sky-100 max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
                Herramientas educativas creadas por un padre para padres. Porque la mejor inversión
                que podemos hacer es <strong className="text-white">alejar a nuestros hijos de las pantallas</strong> y
                acercarlos al aprendizaje real.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
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

            {/* Imagen Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/30 to-yellow-300/30 rounded-3xl blur-2xl transform rotate-3" />
              <img
                src="/images/landing/solounpapareal.jpg"
                alt="Padre e hijo leyendo un libro, disfrutando tiempo juntos sin pantallas"
                className="relative rounded-3xl shadow-2xl border-4 border-white/20 object-cover w-full h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ MISIÓN ══════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: <Tv className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" />, bg: 'bg-red-50', title: 'Menos Pantallas', desc: 'YouTube y la televisión no educan. Reemplazamos el tiempo de pantalla con actividades que realmente desarrollan el cerebro de nuestros hijos.', image: '/images/landing/mission_1.png' },
              { icon: <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-sky-500" />, bg: 'bg-sky-50', title: 'Más Aprendizaje', desc: 'Guías interactivas, lecturas adaptadas, ejercicios creativos. Todo diseñado para que aprender sea tan divertido como jugar.', image: '/images/landing/mission_2.png' },
              { icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" />, bg: 'bg-amber-50', title: 'Padres Presentes', desc: 'No necesitas ser maestro. Solo necesitas estar presente. Estas herramientas te ayudan a acompañar a tus hijos en su educación.', image: '/images/landing/mission_3.png' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col h-full bg-slate-50/50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow"
              >
                {item.image ? (
                  <div className="h-48 w-full overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-amber-100 flex items-center justify-center">
                    <Heart className="w-20 h-20 text-amber-300 drop-shadow-sm" />
                  </div>
                )}
                <div className="p-6 text-center flex-1 flex flex-col">
                  <div className="flex justify-center mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 ${item.bg} rounded-2xl`}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ LIBRO DE LA SEMANA ══════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-br from-rose-50 via-white to-amber-50 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* Illustration side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl border border-rose-100 p-5 sm:p-7">
                {/* Book cover image */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-inner">
                  <img
                    src="/images/landing/dinosaurio_libro.png"
                    alt="Portada del libro El Dinosaurio que Viajó a las Estrellas"
                    className="w-full h-full object-cover"
                  />
                  {/* Decorative spine */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 to-transparent shadow-[inset_-1px_0_2px_rgba(0,0,0,0.2)] mix-blend-overlay" />
                  {/* Lighting effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-black/30 pointer-events-none mix-blend-overlay" />
                </div>

                {/* Mini chapter previews */}
                <div className="flex gap-2 mt-4 overflow-hidden">
                  {[1,2,3,4,5,6,7].map(d => (
                    <div key={d} className="flex-1 min-w-0 bg-rose-50 rounded-lg p-2 text-center border border-rose-100">
                      <div className="text-xs font-bold text-rose-400">Día {d}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-amber-400 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-amber-300/50 rotate-6">
                <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                Nuevo
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center lg:text-left"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 text-rose-600 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-5">
                <BookHeart className="w-4 h-4" />
                Herramienta Destacada
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-5 leading-tight">
                Crea el <span className="text-rose-500">Libro de la Semana</span> de tu hijo
              </h2>

              <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Un libro ilustrado de 7 capítulos, personalizado con los intereses de tu hijo.
                Diseñado para leerse <strong className="text-slate-700">un capítulo por día, 20 minutos de lectura</strong>,
                y construir el hábito que cambia todo.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 text-left">
                {[
                  { icon: <Sparkles className="w-5 h-5 text-amber-500" />, title: 'Personalizado con IA', desc: 'Basado en lo que a tu hijo le apasiona: dinosaurios, espacio, princesas, robots...' },
                  { icon: <BookOpen className="w-5 h-5 text-rose-500" />, title: '7 capítulos ilustrados', desc: 'Cada capítulo incluye una ilustración única generada especialmente para la historia.' },
                  { icon: <Clock className="w-5 h-5 text-sky-500" />, title: '20 min por día', desc: 'La cantidad perfecta para crear el hábito de lectura sin agotar su atención.' },
                  { icon: <Download className="w-5 h-5 text-emerald-500" />, title: 'Descarga en PDF', desc: 'Imprime el libro completo con portada, ilustraciones y todos los capítulos.' },
                ].map((feat, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/80 border border-slate-100">
                    <div className="mt-0.5 flex-shrink-0">{feat.icon}</div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{feat.title}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stat highlight */}
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  <strong className="text-rose-600">Los niños que leen 20 minutos al día</strong> están expuestos a
                  <strong className="text-slate-800"> 1.8 millones de palabras al año</strong> y superan al 90% de sus compañeros en pruebas estandarizadas.
                </p>
              </div>

              <Link
                to="/herramientas?tool=book"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg shadow-rose-300/40 hover:shadow-xl transition-all active:scale-95"
              >
                <BookHeart className="w-5 h-5" />
                Crear un Libro Ahora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="h-full"
              >
                <Link
                  to={`/herramientas?tool=${tool.toolKey}`}
                  className={`block rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group active:scale-[0.98] relative overflow-hidden h-full flex flex-col ${tool.cardClasses}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-8 -mt-8" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 shrink-0 flex items-center justify-center rounded-xl ${tool.iconBoxClasses} group-hover:scale-110 transition-transform`}>
                        <div className="[&>svg]:w-7 [&>svg]:h-7">{tool.icon}</div>
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-bold ${tool.textColor} tracking-tight`}>
                        {tool.title}
                      </h3>
                    </div>
                    <p className={`${tool.descColor} text-base leading-relaxed mb-4`}>
                      {tool.desc}
                    </p>
                    <p className={`${tool.descColor} text-sm leading-relaxed opacity-80 mt-auto`}>
                      <span className="font-semibold">¿Cómo?</span> {tool.howTo}
                    </p>
                  </div>
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
              <Link to={`/blog/${post.slug}`} key={i} className="block group">
                <motion.article
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-sky-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all flex flex-col h-full overflow-hidden"
                >
                  <div className="rounded-xl overflow-hidden mb-4 relative aspect-video">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                    <img style={{ objectPosition: post.imagePosition || 'center' }} src={post.coverImage} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${post.color}`}>
                      {post.tag}
                    </span>
                    <span className="text-slate-400 font-medium text-xs">• {post.readTime}</span>
                    <span className="text-slate-400 font-medium text-xs">• Por {post.author}</span>
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
          <button
            id="btn-donar-landing"
            onClick={() => setDonationOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <Heart className="w-5 h-5 fill-white" />
            Apoyar el Proyecto
          </button>
        </div>
      </section>

      {/* ══════ MANIFIESTO ══════ */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-sky-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              
              <div className="order-2 md:order-1 space-y-5 sm:space-y-6 text-slate-600 leading-relaxed text-base sm:text-lg">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="p-3 bg-sky-100 rounded-xl">
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">Nuestro Compromiso</h2>
                </div>
                
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
                <p className="border-l-4 border-sky-400 pl-4 py-1 italic text-slate-700 bg-sky-50 rounded-r-lg">
                  La premisa es simple: <strong className="text-sky-600">menos pantallas, más lápices. Menos algoritmos, más imaginación.
                  Menos consumo pasivo, más aprendizaje activo.</strong>
                </p>
                <p className="text-slate-500 text-sm font-medium mt-8 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-sky-400 fill-sky-400" /> Solo un Papá REAL
                </p>
              </div>

              <div className="order-1 md:order-2">
                <img 
                  src="/images/landing/manifesto.png" 
                  alt="Padre abrazando a su hija en un parque soleado" 
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-lg border-4 border-white"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════ DISCLAIMER ══════ */}
      <section className="pb-8 sm:pb-10 pt-0">
        <div className="max-w-3xl mx-auto px-4">
          <Disclaimer />
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-slate-800 text-slate-400 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-bold text-white mb-2 text-sm sm:text-base">Solo un Papá REAL</p>
          <p className="text-xs sm:text-sm mb-4">Herramientas educativas gratuitas hechas con amor de papá.</p>
          <div className="flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link to="/herramientas" className="hover:text-white transition-colors">Herramientas</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <button id="btn-donar-footer" onClick={() => setDonationOpen(true)} className="hover:text-white transition-colors">Donar</button>
          </div>
          <div className="flex justify-center gap-6 mt-8 mb-2">
            <a href="#" className="text-slate-400 hover:text-rose-400 transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">TikTok</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v10a7 7 0 1 1-7-7v3a4 4 0 0 0 4 4" />
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-red-500 transition-colors">
              <span className="sr-only">YouTube</span>
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
          <p className="text-xs mt-6 text-slate-500">
            © {new Date().getFullYear()} Solo un Papá REAL. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <DonationModal open={donationOpen} onClose={() => setDonationOpen(false)} />
    </div>
  );
}
