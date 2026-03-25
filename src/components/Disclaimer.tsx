import { Info } from 'lucide-react';

export default function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 ${className}`}>
      <div className="flex gap-3 items-start">
        <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          <strong className="text-slate-600">Aviso importante:</strong> Este sitio es un proyecto personal
          creado por un padre. No somos profesionales de la educación, psicología infantil ni pediatría.
          Todo el contenido publicado refleja opiniones y experiencias personales, no constituye consejo
          profesional ni reemplaza la orientación de un especialista. Para temas de salud, desarrollo o
          comportamiento infantil, consulta siempre a un profesional calificado.
        </p>
      </div>
    </div>
  );
}
