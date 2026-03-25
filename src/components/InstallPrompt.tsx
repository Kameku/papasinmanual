import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed as standalone
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || ('standalone' in window.navigator && (window.navigator as any).standalone === true);
    setIsStandalone(standalone);

    if (standalone) return;

    // Check if dismissed recently (don't show again for 7 days)
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) return;
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if mobile
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
      || window.innerWidth <= 768;

    if (!isMobile) return;

    // For Android/Chrome - listen for the install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show modal after a brief delay so user sees the app first
      setTimeout(() => setShowModal(true), 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS - show instructions after delay
    if (isIOSDevice) {
      setTimeout(() => setShowModal(true), 2000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
    setShowModal(false);
  };

  const handleDismiss = () => {
    setShowModal(false);
    localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
  };

  if (isStandalone || !showModal) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] p-4 safe-bottom"
          >
            <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md mx-auto">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-500 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-sky-500" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-700 text-center mb-2">
                Instala la App
              </h3>
              <p className="text-slate-500 text-sm text-center mb-6 leading-relaxed">
                Agrega <strong className="text-sky-600">Solo un Papá REAL</strong> a tu pantalla de inicio para acceder más rápido y tener una mejor experiencia.
              </p>

              {isIOS ? (
                /* iOS Instructions */
                <div className="space-y-3">
                  <div className="bg-sky-50 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      <p className="text-sm text-slate-600 pt-0.5">
                        Toca el botón <strong>Compartir</strong> <span className="inline-block w-5 h-5 align-text-bottom">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-500">
                            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
                          </svg>
                        </span> en Safari
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <p className="text-sm text-slate-600 pt-0.5">
                        Busca y toca <strong>"Agregar a pantalla de inicio"</strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      <p className="text-sm text-slate-600 pt-0.5">
                        Confirma tocando <strong>"Agregar"</strong>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-sm transition-all"
                  >
                    Entendido
                  </button>
                </div>
              ) : (
                /* Android/Chrome install button */
                <div className="space-y-3">
                  <button
                    onClick={handleInstall}
                    className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-sky-200 transition-all active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" />
                    Instalar App
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl font-bold text-sm transition-all"
                  >
                    Ahora no
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
