import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, LogIn, Sparkles } from 'lucide-react';
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

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              id="btn-donar-header"
              onClick={() => setDonationOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-sm font-semibold border border-amber-200 transition-all active:scale-95"
            >
              <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="hidden sm:inline">Donar</span>
            </button>

            <Link
              to="/login"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-semibold transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Ingresar</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-sky-600 -mr-1"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-sky-50 bg-white px-3 pb-4 pt-2 space-y-1 safe-bottom">
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
          </nav>
        )}
      </header>

      {/* Modal de donación */}
      <DonationModal open={donationOpen} onClose={() => setDonationOpen(false)} />
    </>
  );
}
