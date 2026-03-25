import { motion } from 'motion/react';
import { LogIn, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function Login() {
  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 py-8">
      <SEOHead
        title="Ingresar"
        description="Accede a tu cuenta en Solo un Papá REAL. Próximamente: dashboard personal para guardar materiales educativos."
        path="/login"
      />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-sm"
      >
        <div className="mb-3 sm:mb-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-sky-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-sky-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-sky-50 rounded-2xl mb-4">
            <LogIn className="w-6 h-6 sm:w-7 sm:h-7 text-sky-500" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-700 mb-2">Ingresar</h1>
          <p className="text-slate-500 text-sm mb-6">
            Próximamente podrás crear una cuenta para guardar tus materiales y acceder a tu dashboard personal.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Correo electrónico"
              disabled
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm"
            />
            <input
              type="password"
              placeholder="Contraseña"
              disabled
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm"
            />
            <button
              disabled
              className="w-full px-4 py-3 bg-sky-300 text-white rounded-xl font-bold text-sm cursor-not-allowed"
            >
              Próximamente
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
