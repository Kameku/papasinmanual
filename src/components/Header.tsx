import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, LogIn, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DonationModal from './DonationModal';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/herramientas', label: 'Herramientas' },
  { to: '/blog', label: 'Blog' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-sky-100 sticky top-0 z-50 print:hidden safe-top">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="bg-sky-500 p-1.5 rounded-lg group-hover:bg-sky-600 transition-colors">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
            </div>
            <span className="text-base sm:text-lg font-bold text-slate-700">
              Papá <span className="text-sky-600">Sin Manual</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-500 hover:text-sky-600 hover:bg-sky-50/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              id="btn-donar-header"
              onClick={() => setDonationOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-200/50 transition-all active:scale-95 hover:shadow-xl hover:shadow-amber-300/50"
            >
              <Heart className="w-4 h-4 fill-white" />
              Donar
            </button>

            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-bold transition-all active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              Ingresar
            </Link>
          </div>

          {/* Mobile: hamburger only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-sky-600 -mr-1"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-sky-50 bg-white overflow-hidden"
            >
              <div className="px-3 pb-4 pt-2 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        isActive
                          ? 'bg-sky-50 text-sky-700'
                          : 'text-slate-500 hover:text-sky-600 hover:bg-sky-50/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="border-t border-slate-100 my-2" />

                {/* Login */}
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-500 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
                >
                  <LogIn className="w-5 h-5" />
                  Ingresar
                </Link>

                {/* Donate — big and prominent */}
                <button
                  onClick={() => { setDonationOpen(true); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl text-base font-bold shadow-lg shadow-amber-200/50 transition-all active:scale-95 mt-1"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  Apoyar con una Donación
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Modal de donación */}
      <DonationModal open={donationOpen} onClose={() => setDonationOpen(false)} />
    </>
  );
}
