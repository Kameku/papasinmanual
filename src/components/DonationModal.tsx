import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles } from 'lucide-react';

interface DonationModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DonationModal({ open, onClose }: DonationModalProps) {
  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">

              {/* Decoración superior */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-t-3xl" />

              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="px-6 pt-8 pb-8 text-center">

                {/* Ícono */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mb-4">
                  <Heart className="w-7 h-7 text-amber-500 fill-amber-500" />
                </div>

                {/* Título */}
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  ¡Apoya este proyecto!
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  Es grato saber que te es útil. Tu donación nos ayuda a seguir trabajando
                  para crear nuevas herramientas y funciones.
                </p>

                {/* QR */}
                <div className="flex justify-center mb-5">
                  <div className="p-3 bg-slate-50 border-2 border-amber-100 rounded-2xl shadow-inner">
                    <img
                      src="/qr-donacion.png"
                      alt="QR de donación"
                      className="w-44 h-44 object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Instrucción */}
                <div className="flex items-center gap-2 justify-center bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-5">
                  <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <p className="text-amber-700 text-xs font-medium text-left">
                    Escanea el QR con tu cámara o app de pagos para donar.
                    ¡Cada aporte cuenta muchísimo! 🙌
                  </p>
                </div>

                {/* Firma */}
                <p className="text-slate-400 text-xs italic">
                  — Con gratitud, Un Papá Sin Manual ❤️
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
