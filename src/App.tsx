import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Printer, RefreshCcw, Pencil, Brain, Download, Paperclip, X, FileText, Image as ImageIcon, BookOpenCheck, PenLine, ArrowLeft, Palette, ClipboardList, BookHeart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateAndDownloadPdf, generateBookPdf } from './lib/pdf';
import SEOHead from './components/SEOHead';
import { useLocation } from 'react-router-dom';
import {
  generateStudyGuide,
  generateExamMaterial,
  generateReadingMaterial,
  generateReadingImage,
  generateWritingMaterial,
  generateStudyImage,
  UploadedFile,
  ExamOptions,
  MenuSection,
  READING_TYPES,
  ReadingType,
  COLORING_CATEGORIES,
  ColoringCategory,
  ColoringMode,
  generateColoringImage,
  WRITING_TYPES,
  WritingType,
  WORKSHEET_FORMATS,
  WorksheetFormat,
  WorksheetLang,
  generateWorksheetImage,
  generateWeeklyBook,
  GeneratedBook,
} from './lib/gemini';

type Step = 'menu' | 'input' | 'generating' | 'result';
type ExamStyle = 'free' | 'worksheet';
type ExamLang = 'es' | 'en' | 'both';

const SUBJECTS = [
  "Matemáticas",
  "Inglés",
  "Castellano",
  "Sociales",
  "Naturales",
  "Geometría"
];

const MENU_ITEMS: { key: MenuSection; label: string; description: string; icon: React.ReactNode; color: string; bgColor: string; borderColor: string }[] = [
  {
    key: 'book',
    label: 'Libro de la Semana',
    description: 'Crea un libro ilustrado personalizado de 7 capítulos para leer 20 min al día',
    icon: <BookHeart className="w-8 h-8 sm:w-10 sm:h-10" />,
    color: 'text-rose-600',
    bgColor: 'bg-gradient-to-br from-rose-50 to-amber-50',
    borderColor: 'border-rose-200 hover:border-rose-400',
  },
  {
    key: 'guide',
    label: 'Guía de Estudio',
    description: 'Sopa de letras, parejas, V/F, completar y más',
    icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10" />,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200 hover:border-sky-400',
  },
  {
    key: 'exam',
    label: 'Examen Práctico',
    description: 'Exámenes personalizados con diferentes formatos',
    icon: <Pencil className="w-8 h-8 sm:w-10 sm:h-10" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200 hover:border-orange-400',
  },
  {
    key: 'reading',
    label: 'Lectura',
    description: 'Cuentos, fábulas, coplas, poemas adaptados a la edad',
    icon: <BookOpenCheck className="w-8 h-8 sm:w-10 sm:h-10" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
  },
  {
    key: 'writing',
    label: 'Escritura',
    description: 'Caligrafía, ortografía, dictados y práctica de trazo',
    icon: <PenLine className="w-8 h-8 sm:w-10 sm:h-10" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200 hover:border-purple-400',
  },
  {
    key: 'coloring',
    label: 'Colorear',
    description: 'Dibujos para colorear y unir puntos para imprimir',
    icon: <Palette className="w-8 h-8 sm:w-10 sm:h-10" />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200 hover:border-pink-400',
  },
  {
    key: 'worksheet',
    label: 'Worksheets',
    description: 'Hojas de trabajo visuales con imágenes y ejercicios',
    icon: <ClipboardList className="w-8 h-8 sm:w-10 sm:h-10" />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200 hover:border-teal-400',
  },
];

function getSectionColors(section: MenuSection) {
  switch (section) {
    case 'book': return { primary: 'rose', accent: 'rose' };
    case 'guide': return { primary: 'sky', accent: 'sky' };
    case 'exam': return { primary: 'orange', accent: 'orange' };
    case 'reading': return { primary: 'emerald', accent: 'emerald' };
    case 'writing': return { primary: 'purple', accent: 'purple' };
    case 'coloring': return { primary: 'pink', accent: 'pink' };
    case 'worksheet': return { primary: 'teal', accent: 'teal' };
  }
}

function getSectionLabel(section: MenuSection) {
  switch (section) {
    case 'book': return 'Libro de la Semana';
    case 'guide': return 'Guía de Estudio';
    case 'exam': return 'Examen Práctico';
    case 'reading': return 'Lectura';
    case 'writing': return 'Escritura';
    case 'coloring': return 'Colorear';
    case 'worksheet': return 'Worksheet';
  }
}

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function App() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const toolParam = searchParams.get('tool') as MenuSection | null;

  const [step, setStep] = useState<Step>(toolParam ? 'input' : 'menu');
  const [activeSection, setActiveSection] = useState<MenuSection>(toolParam || 'guide');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [age, setAge] = useState('8');
  const [materialText, setMaterialText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{file: File, data: UploadedFile}[]>([]);
  const [questionCount, setQuestionCount] = useState('10');
  const [examStyle, setExamStyle] = useState<ExamStyle>('free');
  const [examLang, setExamLang] = useState<ExamLang>('es');
  // Reading options
  const [readingType, setReadingType] = useState<ReadingType>('cuento');
  const [readingLength, setReadingLength] = useState<'short' | 'long'>('short');
  const [readingDescription, setReadingDescription] = useState('');
  // Book options
  const [bookTheme, setBookTheme] = useState('');
  const [generatedBook, setGeneratedBook] = useState<GeneratedBook | null>(null);
  const [bookProgress, setBookProgress] = useState('');
  // Writing options
  const [writingType, setWritingType] = useState<WritingType>('caligrafia');
  // Worksheet options
  const [worksheetFormat, setWorksheetFormat] = useState<WorksheetFormat>('table-fill');
  const [worksheetLang, setWorksheetLang] = useState<WorksheetLang>('es');
  const [worksheetTopic, setWorksheetTopic] = useState('');
  const [worksheetDescription, setWorksheetDescription] = useState('');
  // Coloring options
  const [coloringCategory, setColoringCategory] = useState<ColoringCategory>('animales');
  const [coloringMode, setColoringMode] = useState<ColoringMode>('outline');
  const [coloringDescription, setColoringDescription] = useState('');
  // For study guides: two independent contents
  const [generatedContentEs, setGeneratedContentEs] = useState('');
  const [generatedContentEn, setGeneratedContentEn] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);

  // Estimated generation times (seconds) per module
  const ESTIMATED_TIMES: Record<string, number> = {
    book: 180, guide: 60, exam: 30, reading: 40, writing: 25, coloring: 20, worksheet: 30,
  };

  // Simulated progress bar — asymptotic (fast start, slows, never 100% until done)
  useEffect(() => {
    if (step !== 'generating') {
      if (step === 'result') setGeneratingProgress(100);
      return;
    }
    setGeneratingProgress(0);
    const estimatedSec = ESTIMATED_TIMES[activeSection] || 30;
    const start = Date.now();

    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      // Logarithmic curve that approaches 92% at estimated time
      const progress = Math.min(92, 92 * (1 - Math.exp(-2.5 * elapsed / estimatedSec)));
      setGeneratingProgress(progress);
    }, 400);

    return () => clearInterval(id);
  }, [step, activeSection]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: {file: File, data: UploadedFile}[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert(`El archivo ${file.name} no es compatible. Solo PDF e imágenes.`);
        continue;
      }

      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const base64Data = base64.split(',')[1];

        newFiles.push({
          file,
          data: {
            mimeType: file.type,
            data: base64Data
          }
        });
      } catch (err) {
        console.error("Error reading file:", err);
      }
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSelectSection = (section: MenuSection) => {
    setActiveSection(section);
    setStep('input');
    setError('');
  };

  const handleBackToMenu = () => {
    setStep('menu');
    setGeneratedContent('');
    setGeneratedContentEs('');
    setGeneratedContentEn('');
    setGeneratedImage(null);
    setGeneratedBook(null);
    setBookProgress('');
    setError('');
  };

  const handleGenerate = async () => {
    // Sections with custom validation
    if (activeSection === 'book' && !bookTheme) {
      setError('Por favor escribe el tema o interés para el libro.');
      return;
    }
    if (activeSection === 'worksheet' && !worksheetTopic) {
      setError('Por favor escribe el tema del worksheet.');
      return;
    }
    if (!subject || (activeSection !== 'reading' && activeSection !== 'coloring' && activeSection !== 'worksheet' && activeSection !== 'book' && !materialText && uploadedFiles.length === 0)) {
      setError('Por favor selecciona una materia y proporciona material (texto o archivos).');
      return;
    }

    if (window.aistudio) {
      try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await window.aistudio.openSelectKey();
        }
      } catch (e) {
        console.error("Error checking API key:", e);
      }
    }

    setError('');
    setStep('generating');
    setGeneratedImage(null);
    setGeneratedContent('');
    setGeneratedContentEs('');
    setGeneratedContentEn('');

    try {
      const filesData = uploadedFiles.map(f => f.data);

      if (activeSection === 'book') {
        const book = await generateWeeklyBook(bookTheme, age, (step) => setBookProgress(step));
        setGeneratedBook(book);
      } else if (activeSection === 'guide') {
        // Generate sequentially to avoid rate limiting, image in background
        const imagePromise = generateStudyImage(subject, age);
        const contentEs = await generateStudyGuide(subject, age, 'es', materialText, filesData);
        setGeneratedContentEs(contentEs);
        const contentEn = await generateStudyGuide(subject, age, 'en', materialText, filesData);
        setGeneratedContentEn(contentEn);
        const image = await imagePromise;
        setGeneratedImage(image);
      } else if (activeSection === 'exam') {
        const examOptions: ExamOptions = {
          questionCount: parseInt(questionCount) || 10,
          style: examStyle,
          lang: examLang,
        };
        const [content, image] = await Promise.all([
          generateExamMaterial(subject, age, materialText, filesData, examOptions),
          generateStudyImage(subject, age)
        ]);
        setGeneratedContent(content);
        setGeneratedImage(image);
      } else if (activeSection === 'reading') {
        // Step 1: Generate reading content
        const content = await generateReadingMaterial(age, readingType, readingLength, readingDescription, materialText, filesData);
        setGeneratedContent(content);
        // Step 2: Generate illustration for the reading
        const readingLabel = READING_TYPES.find(r => r.key === readingType)?.label || readingType;
        const image = await generateReadingImage(readingLabel, readingDescription, age);
        setGeneratedImage(image);
      } else if (activeSection === 'writing') {
        const [content, image] = await Promise.all([
          generateWritingMaterial(subject, age, materialText, filesData, writingType),
          generateStudyImage(subject, age)
        ]);
        setGeneratedContent(content);
        setGeneratedImage(image);
      } else if (activeSection === 'coloring') {
        const image = await generateColoringImage(coloringCategory, coloringMode, coloringDescription, age);
        setGeneratedImage(image);
      } else if (activeSection === 'worksheet') {
        const image = await generateWorksheetImage(worksheetTopic, worksheetFormat, worksheetLang, age, worksheetDescription);
        setGeneratedImage(image);
      }

      setStep('result');
    } catch (err: any) {
      console.error("Generation error:", err);
      const msg = err?.message || err?.toString() || 'Error desconocido';
      setError(`Error: ${msg}`);
      setStep('input');
    }
  };

  const handleDownloadPDF = async (content: string, filename: string, langLabel?: string) => {
    setDownloadingPdf(filename);
    try {
      const pdfSubject = activeSection === 'reading'
        ? (READING_TYPES.find(r => r.key === readingType)?.label || 'Lectura')
        : subject;
      await generateAndDownloadPdf({
        content,
        subject: pdfSubject,
        age,
        sectionLabel: getSectionLabel(activeSection),
        langLabel,
        image: generatedImage,
      }, filename);
    } catch (err: any) {
      console.error("Error generating PDF:", err);
      alert(`Error al generar PDF: ${err?.message || err}`);
    } finally {
      setDownloadingPdf(null);
    }
  };

  const handleDownloadBookPdf = async (book: GeneratedBook) => {
    setDownloadingPdf('book');
    try {
      await generateBookPdf(book, age);
    } catch (err: any) {
      console.error("Error generating book PDF:", err);
      alert(`Error al generar PDF: ${err?.message || err}`);
    } finally {
      setDownloadingPdf(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getPaperTitle = () => {
    if (activeSection === 'reading') {
      const rt = READING_TYPES.find(r => r.key === readingType);
      return `${rt?.emoji || '📖'} ${rt?.label || 'Lectura'}`;
    }
    return subject;
  };

  const renderPaperContent = (content: string, langLabel?: string) => (
    <div className="bg-white w-full max-w-[215.9mm] min-h-auto sm:min-h-[279.4mm] p-4 sm:p-[20mm] shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-none print:shadow-none print:w-full print:max-w-none print:p-0">
      {/* Header */}
      <div className="border-b-4 border-sky-200 pb-4 sm:pb-6 mb-6 sm:mb-8 flex justify-between items-center gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-3xl font-bold text-sky-600 mb-1 truncate">{getPaperTitle()}</h1>
          <p className="text-slate-400 font-medium uppercase tracking-wider text-xs sm:text-sm">
            {getSectionLabel(activeSection)} {langLabel ? `• ${langLabel} ` : ''}• {age} Años
          </p>
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-sky-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
          {generatedImage ? (
            <img src={generatedImage} alt={subject} className="w-full h-full object-cover" />
          ) : (
            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-sky-500" />
          )}
        </div>
      </div>

      {/* Generated Image Banner */}
      {generatedImage && (
        <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 border-sky-100">
          <img src={generatedImage} alt="Tema de estudio" className="w-full h-40 sm:h-48 md:h-64 object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-sm sm:prose-lg prose-sky max-w-none prose-headings:font-bold prose-h1:text-sky-600 prose-h2:text-orange-500 prose-strong:text-sky-700 prose-li:marker:text-sky-300 overflow-x-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t-2 border-slate-100 text-center text-slate-300 text-xs sm:text-sm">
        Generado con cariño por Solo un Papá REAL
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sky-50 px-3 py-4 sm:p-4 md:p-8 font-sans text-slate-700">
      <SEOHead
        title="Herramientas Educativas"
        description="Genera guías de estudio, exámenes prácticos, lecturas y ejercicios de escritura personalizados para tus hijos. Herramientas educativas gratuitas para imprimir."
        path="/herramientas"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Herramientas Educativas - Solo un Papá REAL',
          description: 'Genera material educativo personalizado: guías de estudio, exámenes, lecturas y ejercicios de escritura para niños.',
          url: 'https://solounpapareal.com/herramientas',
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }}
      />
      <div className="max-w-4xl mx-auto">

        {/* Page Title */}
        <div className="text-center mb-6 sm:mb-8 print:hidden">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-600 mb-1 tracking-tight">
            Herramientas Educativas
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Genera material educativo personalizado en segundos
          </p>
        </div>

        {/* Main Content */}
        <main>

          {/* ==================== MENU ==================== */}
          {step === 'menu' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-center text-slate-600 mb-4 sm:mb-6">¿Qué quieres hacer hoy?</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {MENU_ITEMS.map((item) => (
                  <motion.button
                    key={item.key}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelectSection(item.key)}
                    className={`${item.key === 'book' ? 'col-span-2 p-5 sm:p-6 flex-row sm:flex-row gap-4 sm:gap-5' : 'p-4 sm:p-6 flex-col gap-2 sm:gap-3'} rounded-2xl sm:rounded-3xl border-2 ${item.borderColor} ${item.bgColor} flex items-center transition-all shadow-sm hover:shadow-lg text-center active:shadow-md ${item.key === 'book' ? 'text-left' : ''}`}
                  >
                    <div className={item.color}>{item.icon}</div>
                    <div className={item.key === 'book' ? 'flex-1' : ''}>
                      <span className={`text-base sm:text-xl font-bold ${item.color} ${item.key === 'book' ? 'block' : ''}`}>{item.label}</span>
                      <span className={`text-xs sm:text-sm text-slate-500 ${item.key === 'book' ? 'block mt-0.5' : 'hidden sm:block'}`}>{item.description}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ==================== INPUT ==================== */}
          {step === 'input' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-10 border-2 sm:border-4 border-sky-100"
            >
              <div className="grid gap-8">

                {/* Back to menu */}
                <button
                  onClick={handleBackToMenu}
                  className="flex items-center gap-2 text-slate-400 hover:text-sky-600 font-bold transition-colors w-fit"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Volver al Menú
                </button>

                {/* Section indicator */}
                <div className="text-center">
                  <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${
                    activeSection === 'book' ? 'bg-rose-100 text-rose-700' :
                    activeSection === 'guide' ? 'bg-sky-100 text-sky-700' :
                    activeSection === 'exam' ? 'bg-orange-100 text-orange-700' :
                    activeSection === 'reading' ? 'bg-emerald-100 text-emerald-700' :
                    activeSection === 'coloring' ? 'bg-pink-100 text-pink-700' :
                    activeSection === 'worksheet' ? 'bg-teal-100 text-teal-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {getSectionLabel(activeSection)}
                  </span>
                </div>

                {/* Subject & Age (Subject hidden for reading) */}
                <div className={`grid ${activeSection === 'reading' || activeSection === 'coloring' || activeSection === 'worksheet' || activeSection === 'book' ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
                  {activeSection !== 'reading' && activeSection !== 'coloring' && activeSection !== 'worksheet' && activeSection !== 'book' && (
                    <div className="space-y-2">
                      <label className="block text-lg font-bold text-sky-700">Materia</label>
                      <div className="relative">
                        <BookOpen className="absolute left-4 top-3.5 text-sky-300 w-5 h-5" />
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-sky-100 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all text-lg appearance-none bg-white"
                        >
                          {SUBJECTS.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none text-sky-400">▼</div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="block text-lg font-bold text-sky-700">Edad del Niño/a</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-sky-300 font-bold text-lg">🎂</span>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-sky-100 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all text-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Exam Options (only for exam section) */}
                {activeSection === 'exam' && (
                  <div className="space-y-6 p-6 bg-orange-50 rounded-2xl border-2 border-orange-100">
                    <h3 className="text-lg font-bold text-orange-600">Opciones del Examen</h3>

                    <div className="space-y-2">
                      <label className="block font-bold text-orange-700">Cantidad de preguntas</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-bold text-orange-700">Idioma</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['es', 'en', 'both'] as ExamLang[]).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setExamLang(lang)}
                            className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${examLang === lang ? 'border-orange-500 bg-white text-orange-700 shadow-md' : 'border-orange-100 text-slate-400 hover:border-orange-200'}`}
                          >
                            {lang === 'es' ? 'Español' : lang === 'en' ? 'English' : 'Bilingüe'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-bold text-orange-700">Estilo del examen</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setExamStyle('free')}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${examStyle === 'free' ? 'border-orange-500 bg-white text-orange-700 shadow-md' : 'border-orange-100 text-slate-400 hover:border-orange-200'}`}
                        >
                          <BookOpen className="w-6 h-6" />
                          <span className="font-bold text-sm">Libre</span>
                          <span className="text-xs text-center">Selección múltiple, V/F, completar</span>
                        </button>
                        <button
                          onClick={() => setExamStyle('worksheet')}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${examStyle === 'worksheet' ? 'border-orange-500 bg-white text-orange-700 shadow-md' : 'border-orange-100 text-slate-400 hover:border-orange-200'}`}
                        >
                          <FileText className="w-6 h-6" />
                          <span className="font-bold text-sm">Worksheet</span>
                          <span className="text-xs text-center">Tablas, rellenar espacios, unir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reading Options (only for reading section) */}
                {activeSection === 'reading' && (
                  <div className="space-y-6 p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                    <h3 className="text-lg font-bold text-emerald-600">Tipo de Lectura</h3>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {READING_TYPES.map((rt) => (
                        <button
                          key={rt.key}
                          onClick={() => setReadingType(rt.key)}
                          className={`p-3 rounded-xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-1 ${
                            readingType === rt.key
                              ? 'border-emerald-500 bg-white text-emerald-700 shadow-md scale-105'
                              : 'border-emerald-100 text-slate-400 hover:border-emerald-200'
                          }`}
                        >
                          <span className="text-xl">{rt.emoji}</span>
                          <span>{rt.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Reading length */}
                    <div className="space-y-2">
                      <label className="block font-bold text-emerald-700">Extensión de la lectura</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setReadingLength('short')}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                            readingLength === 'short'
                              ? 'border-emerald-500 bg-white text-emerald-700 shadow-md'
                              : 'border-emerald-100 text-slate-400 hover:border-emerald-200'
                          }`}
                        >
                          <span className="text-2xl">📄</span>
                          <span className="font-bold text-sm">Corta</span>
                          <span className="text-xs text-center">Lectura breve y sencilla</span>
                        </button>
                        <button
                          onClick={() => setReadingLength('long')}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                            readingLength === 'long'
                              ? 'border-emerald-500 bg-white text-emerald-700 shadow-md'
                              : 'border-emerald-100 text-slate-400 hover:border-emerald-200'
                          }`}
                        >
                          <span className="text-2xl">📚</span>
                          <span className="font-bold text-sm">Larga</span>
                          <span className="text-xs text-center">Lectura más extensa y detallada</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-bold text-emerald-700">Descripción adicional <span className="font-normal text-slate-400 text-sm">(opcional)</span></label>
                      <input
                        type="text"
                        value={readingDescription}
                        onChange={(e) => setReadingDescription(e.target.value)}
                        placeholder="Ej: sobre animales del bosque, que enseñe sobre la amistad..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-base"
                      />
                    </div>

                    <div className="p-3 bg-emerald-100/50 rounded-xl">
                      <p className="text-emerald-700 text-sm">
                        📖 Se creará una lectura <strong>{readingLength === 'short' ? 'corta' : 'larga'}</strong> adaptada a <strong>{age} años</strong> con ilustraciones, vocabulario, preguntas de comprensión y un espacio para dibujar.
                      </p>
                    </div>
                  </div>
                )}

                {/* Coloring Options */}
                {activeSection === 'coloring' && (
                  <div className="space-y-6 p-6 bg-pink-50 rounded-2xl border-2 border-pink-100">
                    <h3 className="text-lg font-bold text-pink-600">Tipo de Dibujo</h3>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setColoringMode('outline')}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                          coloringMode === 'outline'
                            ? 'border-pink-500 bg-white text-pink-700 shadow-md'
                            : 'border-pink-100 text-slate-400 hover:border-pink-200'
                        }`}
                      >
                        <span className="text-2xl">🖍️</span>
                        <span className="font-bold text-sm">Para Colorear</span>
                        <span className="text-xs text-center">Contornos limpios para pintar</span>
                      </button>
                      <button
                        onClick={() => setColoringMode('dotted')}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                          coloringMode === 'dotted'
                            ? 'border-pink-500 bg-white text-pink-700 shadow-md'
                            : 'border-pink-100 text-slate-400 hover:border-pink-200'
                        }`}
                      >
                        <span className="text-2xl">🔢</span>
                        <span className="font-bold text-sm">Unir Puntos</span>
                        <span className="text-xs text-center">Conecta los puntos numerados</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-bold text-pink-700">Categoría</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {COLORING_CATEGORIES.map((cat) => (
                          <button
                            key={cat.key}
                            onClick={() => setColoringCategory(cat.key)}
                            className={`p-3 rounded-xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-1 ${
                              coloringCategory === cat.key
                                ? 'border-pink-500 bg-white text-pink-700 shadow-md scale-105'
                                : 'border-pink-100 text-slate-400 hover:border-pink-200'
                            }`}
                          >
                            <span className="text-xl">{cat.emoji}</span>
                            <span className="text-xs">{cat.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-bold text-pink-700">Descripción <span className="font-normal text-slate-400 text-sm">(opcional)</span></label>
                      <input
                        type="text"
                        value={coloringDescription}
                        onChange={(e) => setColoringDescription(e.target.value)}
                        placeholder="Ej: un gato jugando con una pelota, Bugs Bunny comiendo zanahoria..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all text-base"
                      />
                    </div>

                    <div className="p-3 bg-pink-100/50 rounded-xl">
                      <p className="text-pink-700 text-sm">
                        🎨 Se generará un dibujo <strong>{coloringMode === 'outline' ? 'para colorear' : 'de unir puntos'}</strong> de <strong>{COLORING_CATEGORIES.find(c => c.key === coloringCategory)?.label}</strong> listo para imprimir.
                      </p>
                    </div>

                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-amber-700 text-sm">
                        <strong>⚠️ Nota:</strong> Por políticas de los proveedores de inteligencia artificial, algunas imágenes con personajes protegidos por derechos de autor (como personajes de series, películas o marcas registradas) podrían no generarse. Si esto ocurre, intenta con una descripción diferente o elige otra categoría.
                      </p>
                    </div>
                  </div>
                )}

                {/* Book Options */}
                {activeSection === 'book' && (
                  <div className="space-y-6 p-6 bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl border-2 border-rose-100">
                    <h3 className="text-lg font-bold text-rose-600">Crea el Libro de la Semana</h3>

                    <div className="space-y-2">
                      <label className="block font-bold text-rose-700">¿Sobre qué tema o interés de tu hijo? *</label>
                      <input
                        type="text"
                        value={bookTheme}
                        onChange={(e) => setBookTheme(e.target.value)}
                        placeholder="Ej: dinosaurios que viajan al espacio, una gatita valiente, piratas que buscan tesoros..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-rose-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-base"
                      />
                    </div>

                    <div className="p-4 bg-white/60 rounded-xl border border-rose-100 space-y-3">
                      <p className="text-rose-700 text-sm font-semibold">📚 ¿Cómo funciona?</p>
                      <ul className="text-rose-600 text-sm space-y-1.5">
                        <li>• Se genera un <strong>libro ilustrado de 7 capítulos</strong> (uno por día)</li>
                        <li>• Cada capítulo está pensado para una lectura de <strong>~20 minutos</strong></li>
                        <li>• Cada capítulo incluye una <strong>ilustración original</strong> de alta calidad</li>
                        <li>• La historia se adapta a la <strong>edad de {age} años</strong></li>
                        <li>• El libro gira alrededor de los <strong>intereses de tu hijo</strong></li>
                      </ul>
                    </div>

                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-amber-700 text-sm">
                        <strong>⏱️ Nota:</strong> La generación puede tomar entre 1-3 minutos porque se crea la historia completa y se ilustra cada capítulo individualmente.
                      </p>
                    </div>
                  </div>
                )}

                {/* Worksheet Options */}
                {activeSection === 'worksheet' && (
                  <div className="space-y-6 p-6 bg-teal-50 rounded-2xl border-2 border-teal-100">
                    <h3 className="text-lg font-bold text-teal-600">Configura tu Worksheet</h3>

                    <div className="space-y-2">
                      <label className="block font-bold text-teal-700">Tema *</label>
                      <input
                        type="text"
                        value={worksheetTopic}
                        onChange={(e) => setWorksheetTopic(e.target.value)}
                        placeholder="Ej: can / can't, los animales, las frutas, sumas, los colores..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-teal-100 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 outline-none transition-all text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-bold text-teal-700">Formato</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {WORKSHEET_FORMATS.map((fmt) => (
                          <button
                            key={fmt.key}
                            onClick={() => setWorksheetFormat(fmt.key)}
                            className={`p-3 rounded-xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-1 ${
                              worksheetFormat === fmt.key
                                ? 'border-teal-500 bg-white text-teal-700 shadow-md scale-105'
                                : 'border-teal-100 text-slate-400 hover:border-teal-200'
                            }`}
                          >
                            <span className="text-xl">{fmt.emoji}</span>
                            <span className="text-xs text-center">{fmt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-bold text-teal-700">Idioma</label>
                      <div className="grid grid-cols-3 gap-3">
                        {([['es', 'Español'], ['en', 'English'], ['both', 'Bilingüe']] as [WorksheetLang, string][]).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => setWorksheetLang(key)}
                            className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${
                              worksheetLang === key
                                ? 'border-teal-500 bg-white text-teal-700 shadow-md'
                                : 'border-teal-100 text-slate-400 hover:border-teal-200'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-bold text-teal-700">Detalle adicional <span className="font-normal text-slate-400 text-sm">(opcional)</span></label>
                      <input
                        type="text"
                        value={worksheetDescription}
                        onChange={(e) => setWorksheetDescription(e.target.value)}
                        placeholder="Ej: usar nombres de animales de granja, incluir dibujos de comida..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-teal-100 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 outline-none transition-all text-base"
                      />
                    </div>

                    <div className="p-3 bg-teal-100/50 rounded-xl">
                      <p className="text-teal-700 text-sm">
                        📊 Se generará un worksheet visual de <strong>{WORKSHEET_FORMATS.find(f => f.key === worksheetFormat)?.label}</strong> sobre <strong>"{worksheetTopic || '...'}"</strong> en <strong>{worksheetLang === 'es' ? 'Español' : worksheetLang === 'en' ? 'Inglés' : 'Bilingüe'}</strong>, adaptado a <strong>{age} años</strong>. Listo para imprimir.
                      </p>
                    </div>
                  </div>
                )}

                {/* Writing Options */}
                {activeSection === 'writing' && (
                  <div className="space-y-6 p-6 bg-purple-50 rounded-2xl border-2 border-purple-100">
                    <h3 className="text-lg font-bold text-purple-600">Tipo de Ejercicio</h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {WRITING_TYPES.map((wt) => (
                        <button
                          key={wt.key}
                          onClick={() => setWritingType(wt.key)}
                          className={`p-3 rounded-xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-1 ${
                            writingType === wt.key
                              ? 'border-purple-500 bg-white text-purple-700 shadow-md scale-105'
                              : 'border-purple-100 text-slate-400 hover:border-purple-200'
                          }`}
                        >
                          <span className="text-xl">{wt.emoji}</span>
                          <span>{wt.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="p-3 bg-purple-100/50 rounded-xl">
                      <p className="text-purple-700 text-sm">
                        {WRITING_TYPES.find(w => w.key === writingType)?.emoji} {WRITING_TYPES.find(w => w.key === writingType)?.desc}. Adaptado a <strong>{age} años</strong>, listo para imprimir.
                      </p>
                    </div>
                  </div>
                )}

                {/* Guide info note */}
                {activeSection === 'guide' && (
                  <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-100">
                    <p className="text-sky-700 font-medium text-sm">
                      📚 Se generarán <strong>dos PDFs independientes</strong> (Español e Inglés) con guías <strong>interactivas para imprimir</strong>: explicación breve del tema + ejercicios prácticos (verdadero/falso, unir con líneas, sopa de letras, completar espacios y actividad creativa) para reforzar lo visto en clase.
                    </p>
                  </div>
                )}

                {/* Material Input (hidden for reading, coloring, worksheet & book) */}
                {activeSection !== 'reading' && activeSection !== 'coloring' && activeSection !== 'worksheet' && activeSection !== 'book' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-lg font-bold text-sky-700">Material de Estudio</label>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">Sube archivos (PDF, Imágenes) o pega el texto del tema.</p>

                  <div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center hover:bg-sky-50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,image/*,.txt"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                    />
                    <div className="flex flex-col items-center gap-2 text-sky-400">
                      <Paperclip className="w-8 h-8" />
                      <span className="font-medium">Haz clic o arrastra archivos aquí</span>
                      <span className="text-xs text-sky-300">PDF, JPG, PNG</span>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {uploadedFiles.map((fileObj, index) => (
                        <div key={index} className="flex items-center gap-2 bg-white border border-sky-100 px-3 py-1.5 rounded-lg shadow-sm text-sm text-sky-700">
                          {fileObj.data.mimeType.includes('pdf') ? <FileText className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                          <span className="truncate max-w-[150px]">{fileObj.file.name}</span>
                          <button onClick={() => removeFile(index)} className="text-sky-300 hover:text-red-400">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <textarea
                    value={materialText}
                    onChange={(e) => setMaterialText(e.target.value)}
                    placeholder="O pega el contenido aquí..."
                    className="w-full h-32 p-4 rounded-xl border-2 border-sky-100 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all text-lg resize-none mt-2"
                  />
                </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  className="w-full py-3.5 sm:py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold text-lg sm:text-xl shadow-lg shadow-sky-200 transition-all active:scale-[0.97]"
                >
                  Generar Magia
                </button>

              </div>
            </motion.div>
          )}

          {/* ==================== GENERATING ==================== */}
          {step === 'generating' && (() => {
            const est = ESTIMATED_TIMES[activeSection] || 30;
            const estLabel = est >= 120 ? `${Math.round(est / 60)}-${Math.round(est / 60) + 1} minutos` : est >= 60 ? `1-2 minutos` : `${est}-${est + 15} segundos`;
            const messages: Record<string, string> = {
              book: bookProgress || 'Escribiendo la historia ilustrada...',
              guide: 'Generando tus guías en Español e Inglés...',
              exam: 'Creando el examen personalizado...',
              reading: 'Escribiendo la lectura e ilustrándola...',
              writing: 'Preparando los ejercicios de escritura...',
              coloring: 'Dibujando tu página para colorear...',
              worksheet: 'Diseñando tu worksheet visual...',
            };
            const colors: Record<string, { bar: string; text: string; bg: string }> = {
              book: { bar: 'bg-rose-500', text: 'text-rose-600', bg: 'bg-rose-100' },
              guide: { bar: 'bg-sky-500', text: 'text-sky-600', bg: 'bg-sky-100' },
              exam: { bar: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-100' },
              reading: { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-100' },
              writing: { bar: 'bg-purple-500', text: 'text-purple-600', bg: 'bg-purple-100' },
              coloring: { bar: 'bg-pink-500', text: 'text-pink-600', bg: 'bg-pink-100' },
              worksheet: { bar: 'bg-teal-500', text: 'text-teal-600', bg: 'bg-teal-100' },
            };
            const c = colors[activeSection] || colors.guide;

            return (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-10 border-2 border-slate-100 max-w-lg mx-auto"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mb-5"
                  >
                    <RefreshCcw className={`w-10 h-10 sm:w-12 sm:h-12 ${c.text}`} />
                  </motion.div>

                  <h2 className={`text-xl sm:text-2xl font-bold ${c.text} mb-2`}>
                    Creando algo especial...
                  </h2>

                  <p className="text-sm sm:text-base text-slate-400 mb-6">
                    {messages[activeSection]}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full mb-4">
                    <div className={`w-full h-3 ${c.bg} rounded-full overflow-hidden`}>
                      <motion.div
                        className={`h-full ${c.bar} rounded-full`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${generatingProgress}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-slate-400">{Math.round(generatingProgress)}%</span>
                      <span className="text-xs text-slate-400">
                        {generatingProgress < 30 ? 'Iniciando...' : generatingProgress < 60 ? 'Procesando...' : generatingProgress < 85 ? 'Casi listo...' : 'Finalizando...'}
                      </span>
                    </div>
                  </div>

                  {/* Estimated time */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
                    <span>⏱️</span>
                    <span>Tiempo estimado: <strong className="text-slate-500">{estLabel}</strong></span>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* ==================== RESULT ==================== */}
          {step === 'result' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-8"
            >
              {/* Actions Bar */}
              <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm print:hidden space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 sm:justify-between sm:items-center">
                <button
                  onClick={handleBackToMenu}
                  className="text-slate-500 hover:text-sky-600 font-bold flex items-center gap-2 transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Menú
                </button>
                <div className="grid grid-cols-2 sm:flex gap-2 sm:flex-wrap">
                  <button
                    onClick={handlePrint}
                    className="px-4 sm:px-6 py-2.5 bg-white border-2 border-sky-100 hover:border-sky-300 text-sky-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
                  >
                    <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
                    Imprimir
                  </button>

                  {activeSection === 'book' ? (
                    <>
                      <button
                        onClick={() => {
                          if (!generatedBook) return;
                          handleDownloadBookPdf(generatedBook);
                        }}
                        disabled={downloadingPdf !== null}
                        className="px-4 sm:px-6 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all text-sm sm:text-base"
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        {downloadingPdf ? '...' : 'Descargar PDF'}
                      </button>
                    </>
                  ) : activeSection === 'coloring' || activeSection === 'worksheet' ? (
                    <button
                      onClick={() => {
                        if (!generatedImage) return;
                        const link = document.createElement('a');
                        link.href = generatedImage;
                        link.download = activeSection === 'worksheet'
                          ? `worksheet_${worksheetFormat}_${worksheetLang}.png`
                          : `colorear_${coloringCategory}_${coloringMode}.png`;
                        link.click();
                      }}
                      disabled={!generatedImage}
                      className={`px-4 sm:px-6 py-2.5 ${activeSection === 'worksheet' ? 'bg-teal-500 hover:bg-teal-600 shadow-teal-200' : 'bg-pink-500 hover:bg-pink-600 shadow-pink-200'} disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all text-sm sm:text-base`}
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      Descargar
                    </button>
                  ) : activeSection === 'guide' ? (
                    <>
                      <button
                        onClick={() => handleDownloadPDF(generatedContentEs, `${subject.replace(/\s+/g, '_')}_guia_ES.pdf`, 'Español')}
                        disabled={downloadingPdf !== null}
                        className="px-4 sm:px-6 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-md shadow-sky-200 transition-all text-sm sm:text-base"
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        {downloadingPdf?.includes('_ES') ? '...' : 'PDF ES'}
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(generatedContentEn, `${subject.replace(/\s+/g, '_')}_guide_EN.pdf`, 'English')}
                        disabled={downloadingPdf !== null}
                        className="px-4 sm:px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-md shadow-emerald-200 transition-all text-sm sm:text-base col-span-2 sm:col-span-1"
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        {downloadingPdf?.includes('_EN') ? '...' : 'PDF EN'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        const fname = activeSection === 'reading'
                          ? `lectura_${readingType}_${age}años.pdf`
                          : `${subject.replace(/\s+/g, '_')}_${activeSection}.pdf`;
                        handleDownloadPDF(generatedContent, fname);
                      }}
                      disabled={downloadingPdf !== null}
                      className="px-4 sm:px-6 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-200 transition-all text-sm sm:text-base"
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      {downloadingPdf ? '...' : 'PDF'}
                    </button>
                  )}
                </div>
              </div>

              {/* Result Papers */}
              {activeSection === 'book' && generatedBook ? (
                <div className="space-y-8">
                  {/* Book cover */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl print:rounded-none print:shadow-none">
                    {generatedBook.coverImage ? (
                      <div className="relative">
                        <img
                          src={generatedBook.coverImage}
                          alt={`Portada: ${generatedBook.bookTitle}`}
                          className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10">
                          <p className="text-white/70 font-medium uppercase tracking-widest text-xs sm:text-sm mb-2">Libro de la Semana</p>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 leading-tight drop-shadow-lg">{generatedBook.bookTitle}</h2>
                          <div className="flex items-center gap-3 text-white/80 text-xs sm:text-sm">
                            <span>📖 7 capítulos</span>
                            <span>•</span>
                            <span>⏱️ 20 min/día</span>
                            <span>•</span>
                            <span>📅 1 semana</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-rose-500 to-amber-500 p-8 sm:p-12 text-center text-white">
                        <p className="text-rose-100 font-medium uppercase tracking-widest text-xs sm:text-sm mb-3">Libro de la Semana</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">{generatedBook.bookTitle}</h2>
                        <p className="text-rose-100 text-base sm:text-lg">Un libro ilustrado en 7 capítulos para {age} años</p>
                      </div>
                    )}
                  </div>

                  {/* Chapters */}
                  {generatedBook.chapters.map((chapter) => (
                    <div key={chapter.day} className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:break-before-page">
                      {/* Chapter illustration */}
                      {chapter.image && (
                        <div className="w-full aspect-video sm:aspect-[21/9] overflow-hidden">
                          <img
                            src={chapter.image}
                            alt={`Ilustración: ${chapter.title}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {/* Chapter content */}
                      <div className="p-6 sm:p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 text-rose-600 font-bold text-sm flex-shrink-0">
                            Día {chapter.day}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-700">{chapter.title}</h3>
                        </div>
                        <div className="prose prose-lg prose-slate max-w-none leading-relaxed text-slate-600 whitespace-pre-line">
                          {chapter.content}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* End card */}
                  <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-8 text-center border-2 border-rose-100 print:break-before-page">
                    <p className="text-4xl mb-3">📚</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-rose-600 mb-2">¡Fin!</h3>
                    <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
                      Esperamos que hayas disfrutado esta historia junto a tu hijo. La lectura compartida es uno de los regalos más valiosos que podemos darles.
                    </p>
                    <p className="text-slate-400 text-xs mt-4">Generado con cariño por Solo un Papá REAL</p>
                  </div>
                </div>
              ) : activeSection === 'coloring' ? (
                <div className="flex justify-center">
                  <div className="bg-white w-full max-w-[215.9mm] p-4 sm:p-[20mm] shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-none print:shadow-none print:w-full print:max-w-none print:p-0">
                    <div className="border-b-4 border-pink-200 pb-4 sm:pb-6 mb-6 sm:mb-8 text-center">
                      <h1 className="text-xl sm:text-3xl font-bold text-pink-600 mb-1">
                        🎨 {coloringMode === 'outline' ? 'Página para Colorear' : 'Unir los Puntos'}
                      </h1>
                      <p className="text-slate-400 font-medium uppercase tracking-wider text-xs sm:text-sm">
                        {COLORING_CATEGORIES.find(c => c.key === coloringCategory)?.label} • {age} Años
                      </p>
                    </div>
                    {generatedImage ? (
                      <div className="flex justify-center">
                        <img src={generatedImage} alt="Dibujo para colorear" className="max-w-full h-auto rounded-xl" />
                      </div>
                    ) : (
                      <div className="text-center py-16 text-slate-400">
                        <p className="text-lg">No se pudo generar la imagen. Intenta de nuevo.</p>
                      </div>
                    )}
                    <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t-2 border-slate-100 text-center text-slate-300 text-xs sm:text-sm">
                      Generado con cariño por Solo un Papá REAL
                    </div>
                  </div>
                </div>
              ) : activeSection === 'worksheet' ? (
                <div className="flex justify-center">
                  <div className="bg-white w-full max-w-[215.9mm] p-4 sm:p-[20mm] shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-none print:shadow-none print:w-full print:max-w-none print:p-0">
                    <div className="border-b-4 border-teal-200 pb-4 sm:pb-6 mb-6 sm:mb-8 text-center">
                      <h1 className="text-xl sm:text-3xl font-bold text-teal-600 mb-1">
                        📊 Worksheet: {worksheetTopic}
                      </h1>
                      <p className="text-slate-400 font-medium uppercase tracking-wider text-xs sm:text-sm">
                        {WORKSHEET_FORMATS.find(f => f.key === worksheetFormat)?.label} • {worksheetLang === 'es' ? 'Español' : worksheetLang === 'en' ? 'English' : 'Bilingüe'} • {age} Años
                      </p>
                    </div>
                    {generatedImage ? (
                      <div className="flex justify-center">
                        <img src={generatedImage} alt="Worksheet educativo" className="max-w-full h-auto rounded-xl" />
                      </div>
                    ) : (
                      <div className="text-center py-16 text-slate-400">
                        <p className="text-lg">No se pudo generar el worksheet. Intenta de nuevo.</p>
                      </div>
                    )}
                    <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t-2 border-slate-100 text-center text-slate-300 text-xs sm:text-sm">
                      Generado con cariño por Solo un Papá REAL
                    </div>
                  </div>
                </div>
              ) : activeSection === 'guide' ? (
                <div className="space-y-12">
                  {/* Spanish Guide */}
                  <div>
                    <h2 className="text-2xl font-bold text-sky-600 mb-4 print:hidden text-center">📘 Guía en Español</h2>
                    <div className="flex justify-center">
                      {renderPaperContent(generatedContentEs, 'Español')}
                    </div>
                  </div>

                  {/* English Guide */}
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-600 mb-4 print:hidden text-center">📗 Study Guide in English</h2>
                    <div className="flex justify-center">
                      {renderPaperContent(generatedContentEn, 'English')}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  {renderPaperContent(generatedContent)}
                </div>
              )}
            </motion.div>
          )}
        </main>

      </div>
    </div>
  );
}
