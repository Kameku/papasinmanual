# 📚 Solo un Papá REAL

> Herramientas educativas gratuitas con IA para padres. Genera guías de estudio, exámenes prácticos, lecturas y ejercicios de escritura personalizados para tus hijos, en segundos.

---

## ✨ ¿Qué es esto?

**Solo un Papá REAL** es una aplicación web progresiva (PWA) que usa la API de **Gemini AI** para generar material educativo personalizado según la edad del niño y la materia. Pensada para padres que quieren apoyar el aprendizaje de sus hijos en casa sin ser docentes.

---

## 🚀 Funcionalidades

| Módulo | Descripción |
|---|---|
| 📘 **Guía de Estudio** | Genera dos PDFs (Español e Inglés) con sopa de letras, V/F, unir con líneas, completar espacios y actividad creativa |
| ✏️ **Examen Práctico** | Exámenes personalizados: selección múltiple, worksheet, bilingüe o en español/inglés |
| 📖 **Lectura** | Cuentos, fábulas, coplas, poemas, leyendas, mitos, noticias, cartas y más, con ilustración generada por IA |
| 🖊️ **Escritura** | Ejercicios de escritura creativa, ortografía y expresión escrita con rúbrica de autoevaluación |

### Características adicionales
- 🎨 **Imágenes generadas por IA** — ilustraciones estilo cartoon para cada material
- 📄 **Descarga en PDF** — listos para imprimir directamente
- 🖨️ **Impresión directa** desde el navegador
- 📎 **Adjunta archivos** — sube PDFs o imágenes del cuaderno para contextualizar el material
- 📱 **PWA instalable** — funciona como app nativa en móvil y escritorio
- 🌐 **Soporte bilingüe** — contenido en Español e Inglés

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **React 19** | UI y lógica de estado |
| **TypeScript** | Tipado estático |
| **Vite 6** | Bundler y servidor de desarrollo |
| **TailwindCSS v4** | Estilos |
| **Gemini AI** (`@google/genai`) | Generación de texto e imágenes |
| **Motion** | Animaciones (framer-motion) |
| **React Router v7** | Enrutamiento |
| **jsPDF + html2canvas** | Exportación a PDF |
| **vite-plugin-pwa + Workbox** | Service Worker y caché offline |

---

## ⚙️ Configuración local

### Prerequisitos
- Node.js ≥ 18
- Una [API Key de Gemini](https://aistudio.google.com/app/apikey)

### Instalación

```bash
# 1. Clona el repositorio
git clone <url-del-repositorio>
cd studdy

# 2. Instala dependencias
npm install

# 3. Crea el archivo de entorno
cp .env.example .env
```

### Variables de entorno

Edita el archivo `.env` con tu API key:

```env
GEMINI_API_KEY="tu_api_key_aquí"
APP_URL="http://localhost:3000"
```

### Ejecutar en desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:3000` |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualizar el build de producción |
| `npm run clean` | Elimina la carpeta `dist/` |
| `npm run lint` | Verifica tipos con TypeScript |

---

## 📂 Estructura del proyecto

```
studdy/
├── public/              # Assets estáticos (favicon, íconos PWA)
├── src/
│   ├── components/      # Componentes reutilizables (Header, InstallPrompt)
│   ├── data/            # Datos estáticos (blogPosts)
│   ├── lib/
│   │   ├── gemini.ts    # Integración con Gemini AI (texto + imágenes)
│   │   └── pdf.tsx      # Generación y descarga de PDFs
│   ├── pages/           # Páginas (Landing, Blog, Login)
│   ├── App.tsx          # Aplicación principal y flujo de generación
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos globales
├── .env.example         # Plantilla de variables de entorno
├── vite.config.ts       # Configuración de Vite + PWA
└── tsconfig.json        # Configuración de TypeScript
```

---

## 🤖 Modelos de IA utilizados

| Función | Modelo |
|---|---|
| Generación de texto (guías, exámenes, lecturas, escritura) | `gemini-3.1-pro-preview` |
| Generación de imágenes ilustrativas | `gemini-3-pro-image-preview` |

---

## 🎯 Materias soportadas

Matemáticas · Inglés · Castellano · Sociales · Naturales · Geometría

---

## 📄 Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

---

<p align="center">
  Hecho con ❤️ para padres que le ponen ganas
</p>
