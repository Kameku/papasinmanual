import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Brain, BookOpenCheck, PenLine, Pencil, ArrowRight, Heart, Tv, BookOpen, Users, Shield } from 'lucide-react';
import DonationModal from '../components/DonationModal';

const TOOLS = [
  { 
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
    icon: <PenLine className="w-10 h-10 sm:w-12 sm:h-12 text-white" />, 
    title: 'Laboratorio de Escritura', 
    desc: 'Mejora su caligrafía, ortografía y expresión escrita de forma creativa.',
    howTo: 'Generamos hojas pautadas para escribir a mano, usar vocabulario nuevo o guiar una historia.',
    cardClasses: 'bg-purple-500 hover:bg-purple-400 shadow-purple-500/40',
    iconBoxClasses: 'bg-purple-400',
    textColor: 'text-white',
    descColor: 'text-purple-50',
    howBg: 'bg-purple-700/20',
  },
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
  const [donationOpen, setDonationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sky-50">

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
                Un Papá <span className="text-yellow-300">Sin Manual</span>
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
                src="/images/landing/hero.png"
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

      {/* ══════ HERRAMIENTAS ══════ */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 mb-2 sm:mb-3">Herramientas Educativas</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
              Genera material educativo personalizado en segundos. Solo necesitas la edad de tu hijo y el tema.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Link
                  to="/herramientas"
                  className={`block rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group active:scale-[0.98] h-full flex flex-col relative overflow-hidden ${tool.cardClasses}`}
                >
                  {/* Decorative shape overlay */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 mb-6 sm:mb-8">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center rounded-full ${tool.iconBoxClasses} shadow-inner group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className={`text-2xl sm:text-3xl font-black ${tool.textColor} tracking-tight mb-2 drop-shadow-sm`}>
                          {tool.title}
                        </h3>
                        <p className={`${tool.descColor} font-medium text-base sm:text-lg leading-snug`}>
                          {tool.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className={`${tool.howBg} rounded-3xl p-5 sm:p-6 backdrop-blur-sm border border-white/10 group-hover:bg-black/10 transition-colors`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">✨</span>
                          <strong className={`font-bold uppercase tracking-wider text-sm ${tool.textColor} drop-shadow-sm`}>¿Cómo se usa?</strong>
                        </div>
                        <p className={`${tool.descColor} text-sm sm:text-base leading-relaxed`}>
                          {tool.howTo}
                        </p>
                      </div>
                    </div>
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
                  <Heart className="w-4 h-4 text-sky-400 fill-sky-400" /> Un Papá Sin Manual
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

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-slate-800 text-slate-400 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-bold text-white mb-2 text-sm sm:text-base">Un Papá Sin Manual</p>
          <p className="text-xs sm:text-sm mb-4">Herramientas educativas gratuitas hechas con amor de papá.</p>
          <div className="flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link to="/herramientas" className="hover:text-white transition-colors">Herramientas</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <button id="btn-donar-footer" onClick={() => setDonationOpen(true)} className="hover:text-white transition-colors">Donar</button>
          </div>
          <p className="text-xs mt-6 text-slate-500">
            © {new Date().getFullYear()} Un Papá Sin Manual. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <DonationModal open={donationOpen} onClose={() => setDonationOpen(false)} />
    </div>
  );
}
