import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';
const RECIPIENT_EMAIL = 'kameku01@gmail.com';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `¿Cuánto es ${a} + ${b}?`, answer: a + b };
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function SuggestionButton() {
  const [open, setOpen] = useState(false);
  const [tema, setTema] = useState('');
  const [observacion, setObservacion] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const resetForm = useCallback(() => {
    setTema('');
    setObservacion('');
    setCaptchaInput('');
    setCaptcha(generateCaptcha());
    setHoneypot('');
    setStatus('idle');
    setErrorMsg('');
  }, []);

  const handleOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Block body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Honeypot check (bots fill this hidden field)
    if (honeypot) return;

    // Validate fields
    if (!tema.trim() || !observacion.trim()) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    // Validate captcha
    if (parseInt(captchaInput) !== captcha.answer) {
      setErrorMsg('La respuesta del captcha es incorrecta. Intenta de nuevo.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Sugerencia - Un Papá Sin Manual: ${tema}`,
          from_name: 'Un Papá Sin Manual - Formulario de Sugerencias',
          to: RECIPIENT_EMAIL,
          tema: tema,
          observacion: observacion,
          botcheck: '',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        throw new Error(data.message || 'Error al enviar');
      }
    } catch (err: any) {
      console.error('Error sending suggestion:', err);
      setStatus('error');
      setErrorMsg(err?.message || 'No se pudo enviar. Intenta más tarde.');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={handleOpen}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg shadow-sky-500/30 font-bold text-sm transition-all active:scale-95 print:hidden group"
        aria-label="Enviar sugerencias"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">¿Tienes sugerencias?</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="suggestion-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />

            {/* Form Panel */}
            <motion.div
              key="suggestion-panel"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] z-[101] safe-bottom"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-sky-500 px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <MessageCircle className="w-5 h-5" />
                    <h3 className="font-bold text-base">¿Tienes sugerencias?</h3>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-5">
                  {status === 'success' ? (
                    /* Success State */
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-6"
                    >
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-50 rounded-full mb-4">
                        <CheckCircle className="w-7 h-7 text-emerald-500" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-700 mb-2">¡Gracias!</h4>
                      <p className="text-slate-500 text-sm mb-5">
                        Tu sugerencia fue enviada correctamente. La revisaremos pronto.
                      </p>
                      <button
                        onClick={handleClose}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-all"
                      >
                        Cerrar
                      </button>
                    </motion.div>
                  ) : (
                    /* Form */
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        Envíanos tus sugerencias, ideas o si encontraste alguna falla para que la revisemos. Tu opinión nos ayuda a mejorar.
                      </p>

                      {/* Honeypot - hidden from real users */}
                      <input
                        type="text"
                        name="botfield"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      {/* Tema */}
                      <div>
                        <label htmlFor="suggestion-tema" className="block text-sm font-bold text-slate-700 mb-1.5">
                          Tema
                        </label>
                        <input
                          id="suggestion-tema"
                          type="text"
                          value={tema}
                          onChange={(e) => setTema(e.target.value)}
                          placeholder="Ej: Nuevo tipo de ejercicio, error en lecturas..."
                          maxLength={100}
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all text-sm"
                          disabled={status === 'sending'}
                        />
                      </div>

                      {/* Observación */}
                      <div>
                        <label htmlFor="suggestion-obs" className="block text-sm font-bold text-slate-700 mb-1.5">
                          Observación
                        </label>
                        <textarea
                          id="suggestion-obs"
                          value={observacion}
                          onChange={(e) => setObservacion(e.target.value)}
                          placeholder="Cuéntanos con detalle tu sugerencia o el problema que encontraste..."
                          rows={4}
                          maxLength={1000}
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all text-sm resize-none"
                          disabled={status === 'sending'}
                        />
                      </div>

                      {/* Captcha */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                        <label htmlFor="suggestion-captcha" className="block text-sm font-bold text-slate-600 mb-2">
                          Verificación anti-spam
                        </label>
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold text-sky-600 bg-white px-3 py-1.5 rounded-lg border border-sky-200 select-none whitespace-nowrap">
                            {captcha.question}
                          </span>
                          <input
                            id="suggestion-captcha"
                            type="number"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            placeholder="?"
                            className="w-20 px-3 py-1.5 rounded-lg border-2 border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all text-sm text-center font-bold"
                            disabled={status === 'sending'}
                          />
                        </div>
                      </div>

                      {/* Error message */}
                      {errorMsg && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs sm:text-sm">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {errorMsg}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Enviar Sugerencia
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
