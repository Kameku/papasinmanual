import { GoogleGenAI } from "@google/genai";

export interface UploadedFile {
  mimeType: string;
  data: string; // Base64 string
}

export interface ExamOptions {
  questionCount: number;
  style: 'free' | 'worksheet';
  lang: 'es' | 'en' | 'both';
}

export type MenuSection = 'guide' | 'exam' | 'reading' | 'writing' | 'coloring';

const MODEL = "gemini-3.1-pro-preview";
const IMAGE_MODEL = "gemini-3-pro-image-preview";

function getApiClient() {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key not found");
  }
  return new GoogleGenAI({ apiKey });
}

// ════════════════════════════════════════════════════════════
//  PASO 1: Generar contenido y textos para la guía de estudio
// ════════════════════════════════════════════════════════════
export async function generateStudyGuide(
  subject: string,
  age: string,
  lang: 'es' | 'en',
  materialText: string,
  files: UploadedFile[] = []
): Promise<string> {
  const ai = getApiClient();
  const isSpanish = lang === 'es';

  const systemPrompt = isSpanish
    ? `Actúa como un maestro creativo experto en diseñar GUÍAS DE ESTUDIO INTERACTIVAS Y DIDÁCTICAS para niños de ${age} años.

MATERIA: ${subject}

Tu objetivo es crear una guía que el niño pueda IMPRIMIR y COMPLETAR A MANO. NO es una guía de lectura larga. Es una guía PRÁCTICA y DINÁMICA para reforzar temas vistos en clase.

ESTRUCTURA OBLIGATORIA:

## 🎯 ¡Aprende sobre [tema]!
Explicación breve y divertida del tema (máximo 6-8 líneas). Usa lenguaje simple, analogías y ejemplos cotidianos. Incluye 2-3 datos curiosos integrados.

## 📝 Conceptos Clave
Tabla con los conceptos más importantes y sus definiciones cortas (máximo 5-6 conceptos):
| Concepto | ¿Qué significa? |
|----------|-----------------|

## ✏️ Ejercicio 1: Verdadero o Falso
Crea 6-8 afirmaciones sobre el tema. El niño debe marcar V o F.
Formato:
1. [afirmación] ( V / F )
2. [afirmación] ( V / F )

## 🔗 Ejercicio 2: Une con Líneas
Dos columnas en tabla: la columna izquierda tiene conceptos/preguntas, la columna derecha tiene respuestas DESORDENADAS. El niño debe unir.
| Columna A | Columna B |
|-----------|-----------|
Usa 5-6 pares.

## 🔤 Ejercicio 3: Sopa de Letras
Crea una sopa de letras REAL como tabla Markdown de 10x10 o 12x12. Las letras deben estar en mayúsculas, una letra por celda. Esconde 5-6 palabras clave del tema (horizontal y vertical). Debajo lista las palabras a encontrar.

IMPORTANTE para la sopa de letras:
- Usa una tabla Markdown donde cada celda tiene UNA sola letra
- Las palabras deben estar realmente escondidas en la grilla
- Formato: | A | B | C | D | ... |

## 🧩 Ejercicio 4: Completa los Espacios
5-6 oraciones sobre el tema con espacios en blanco (usa "________") que el niño debe rellenar.
Debajo proporciona un banco de palabras desordenadas.

## 🎨 Ejercicio 5: Actividad Creativa
Una actividad donde el niño dibuja, crea o escribe algo creativo relacionado al tema. Incluye un espacio grande marcado con un recuadro: [ESPACIO PARA DIBUJAR O ESCRIBIR]

## ✅ Respuestas
Todas las respuestas de los ejercicios anteriores, claramente organizadas por ejercicio.

REGLAS:
- Todo en ESPAÑOL
- Usa emojis en los títulos de sección
- El contenido debe ser CORTO y PRÁCTICO, NO largas explicaciones
- Los ejercicios deben ser realizables a mano en papel impreso
- Adapta la dificultad a ${age} años
- Usa tablas Markdown para todo lo que necesite estructura visual
- Genera SOLO Markdown, nada más`

    : `Act as a creative teacher expert in designing INTERACTIVE AND DIDACTIC STUDY GUIDES for ${age}-year-old children.

SUBJECT: ${subject}

Your goal is to create a guide that the child can PRINT and COMPLETE BY HAND. It is NOT a long reading guide. It's a PRACTICAL and DYNAMIC guide to reinforce topics seen in class.

MANDATORY STRUCTURE:

## 🎯 Learn about [topic]!
Brief and fun explanation of the topic (maximum 6-8 lines). Use simple language, analogies and everyday examples. Include 2-3 fun facts integrated.

## 📝 Key Concepts
Table with the most important concepts and their short definitions (maximum 5-6 concepts):
| Concept | What does it mean? |
|---------|-------------------|

## ✏️ Exercise 1: True or False
Create 6-8 statements about the topic. The child must mark T or F.
Format:
1. [statement] ( T / F )
2. [statement] ( T / F )

## 🔗 Exercise 2: Match the Columns
Two columns in a table: left column has concepts/questions, right column has SHUFFLED answers. The child must match them.
| Column A | Column B |
|----------|----------|
Use 5-6 pairs.

## 🔤 Exercise 3: Word Search
Create a REAL word search as a Markdown table of 10x10 or 12x12. Letters must be UPPERCASE, one letter per cell. Hide 5-6 key words from the topic (horizontal and vertical). Below list the words to find.

IMPORTANT for word search:
- Use a Markdown table where each cell has ONE single letter
- Words must actually be hidden in the grid
- Format: | A | B | C | D | ... |

## 🧩 Exercise 4: Fill in the Blanks
5-6 sentences about the topic with blank spaces (use "________") that the child must fill in.
Below provide a scrambled word bank.

## 🎨 Exercise 5: Creative Activity
An activity where the child draws, creates or writes something creative related to the topic. Include a large space marked with: [SPACE TO DRAW OR WRITE]

## ✅ Answers
All answers from previous exercises, clearly organized by exercise.

RULES:
- Everything in ENGLISH
- Use emojis in section titles
- Content must be SHORT and PRACTICAL, NOT long explanations
- Exercises must be doable by hand on printed paper
- Adapt difficulty to ${age} years old
- Use Markdown tables for everything that needs visual structure
- Generate ONLY Markdown, nothing else`;

  const parts: any[] = [{ text: systemPrompt }];

  if (materialText) {
    parts.push({ text: `${isSpanish ? 'Material de referencia del tema visto en clase' : 'Reference material from the topic seen in class'}:\n${materialText}` });
  }

  files.forEach(file => {
    parts.push({ inlineData: { mimeType: file.mimeType, data: file.data } });
  });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: { role: "user", parts },
  });

  return response.text || (isSpanish
    ? "Lo siento, no pude generar el contenido."
    : "Sorry, I couldn't generate the content.");
}

// ════════════════════════════════════════════════════════════
//  PASO 2: Generar imágenes estilo animado para la guía
// ════════════════════════════════════════════════════════════
export async function generateStudyImage(subject: string, age: string): Promise<string | null> {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: {
        parts: [{
          text: `Crea una ilustración educativa infantil estilo "cartoon animado moderno" sobre: ${subject}.
Para niños de ${age} años.
Estilo: colores vibrantes tipo acuarela digital, personajes adorables estilo chibi/kawaii, expresiones alegres y divertidas, fondo con elementos educativos relacionados al tema.
La ilustración debe ser horizontal (landscape), sin texto, transmitir alegría por aprender.
Estilo visual tipo Bluey, Pocoyo o similares - simple, colorido y amigable.`,
        }],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

// ════════════════════════════════════════════════════════════
//  Examen Práctico
// ════════════════════════════════════════════════════════════
export async function generateExamMaterial(
  subject: string,
  age: string,
  materialText: string,
  files: UploadedFile[] = [],
  examOptions: ExamOptions
): Promise<string> {
  const ai = getApiClient();

  const langInstruction = examOptions.lang === 'en'
    ? 'Write the ENTIRE exam in English.'
    : examOptions.lang === 'both'
      ? 'Write the exam bilingual: each question first in English then the Spanish translation in parentheses.'
      : 'Escribe el examen en español.';

  const examContentInstruction = examOptions.style === 'worksheet'
    ? `- Crea exactamente ${examOptions.questionCount} ejercicios en estilo WORKSHEET/HOJA DE TRABAJO.
- Usa formatos como: tablas para analizar, oraciones con espacios en blanco (usa "________"), ejercicios de unir con líneas, completar frases, ordenar palabras.
- Usa tablas Markdown cuando sea apropiado para crear grids visuales.
- Incluye las respuestas al final en una sección separada "Respuestas".`
    : `- Crea exactamente ${examOptions.questionCount} preguntas variadas (Selección Múltiple, Verdadero/Falso, Completar la frase).
- Incluye las respuestas al final en una sección separada "Respuestas".`;

  const systemPrompt = `
    Actúa como un maestro divertido y motivador para niños de ${age} años.
    Tu tarea es crear un Examen de Práctica sobre: ${subject}.
    Utiliza el material proporcionado como base.

    Requisitos:
    1. Tono divertido, alentador, adaptado a la edad. Usa emojis.
    2. Estructura:
       - Título divertido y llamativo
       - Mensaje de bienvenida corto
       - Contenido: ${examContentInstruction}
       - Actividad creativa al final
    3. Formato: Markdown limpio con tablas cuando sea necesario.
    4. ${langInstruction}

    Genera SOLO Markdown.
  `;

  const parts: any[] = [{ text: systemPrompt }];
  if (materialText) parts.push({ text: `Material de estudio:\n${materialText}` });
  files.forEach(file => { parts.push({ inlineData: { mimeType: file.mimeType, data: file.data } }); });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: { role: "user", parts },
  });

  return response.text || "Lo siento, no pude generar el contenido.";
}

// ════════════════════════════════════════════════════════════
//  Tipos de lectura disponibles
// ════════════════════════════════════════════════════════════
export const READING_TYPES = [
  { key: 'cuento', label: 'Cuento', emoji: '📖' },
  { key: 'fabula', label: 'Fábula', emoji: '🦊' },
  { key: 'copla', label: 'Copla', emoji: '🎶' },
  { key: 'poema', label: 'Poema', emoji: '✨' },
  { key: 'leyenda', label: 'Leyenda', emoji: '🏔️' },
  { key: 'mito', label: 'Mito', emoji: '⚡' },
  { key: 'noticia', label: 'Noticia', emoji: '📰' },
  { key: 'carta', label: 'Carta', emoji: '✉️' },
  { key: 'dialogo', label: 'Diálogo', emoji: '💬' },
  { key: 'trabalenguas', label: 'Trabalenguas y Rimas', emoji: '🗣️' },
] as const;

export type ReadingType = typeof READING_TYPES[number]['key'];

// ════════════════════════════════════════════════════════════
//  Lectura
// ════════════════════════════════════════════════════════════
export async function generateReadingMaterial(
  age: string,
  readingType: ReadingType,
  readingLength: 'short' | 'long',
  description: string,
  materialText: string,
  files: UploadedFile[] = []
): Promise<string> {
  const ai = getApiClient();

  const ageNum = parseInt(age) || 8;
  const isShort = readingLength === 'short';

  // Adaptar longitud y complejidad según edad Y preferencia de longitud
  let lengthGuide: string;
  let vocabGuide: string;
  if (ageNum <= 6) {
    lengthGuide = isShort
      ? 'La lectura debe ser MUY CORTA (60-100 palabras). Oraciones de 4-6 palabras. Vocabulario muy básico y cotidiano. Párrafos de 1 oración.'
      : 'La lectura debe tener entre 100-180 palabras. Oraciones simples de 5-8 palabras. Vocabulario básico. Párrafos de 1-2 oraciones.';
    vocabGuide = isShort ? '2-3 palabras nuevas' : '4-5 palabras nuevas';
  } else if (ageNum <= 8) {
    lengthGuide = isShort
      ? 'La lectura debe ser CORTA (100-200 palabras). Oraciones simples y claras. Vocabulario sencillo. Párrafos de 2 oraciones.'
      : 'La lectura debe tener entre 250-400 palabras. Oraciones claras con alguna complejidad. Vocabulario sencillo con palabras nuevas. Párrafos de 2-3 oraciones.';
    vocabGuide = isShort ? '3-5 palabras nuevas' : '5-7 palabras nuevas';
  } else if (ageNum <= 10) {
    lengthGuide = isShort
      ? 'La lectura debe tener entre 200-300 palabras. Oraciones de complejidad media. Vocabulario variado. Párrafos de 2-3 oraciones.'
      : 'La lectura debe tener entre 400-600 palabras. Oraciones más elaboradas. Vocabulario amplio. Párrafos de 3-4 oraciones.';
    vocabGuide = isShort ? '4-6 palabras nuevas' : '6-8 palabras nuevas';
  } else {
    lengthGuide = isShort
      ? 'La lectura debe tener entre 300-450 palabras. Oraciones elaboradas. Vocabulario desafiante. Párrafos de 3-4 oraciones.'
      : 'La lectura debe tener entre 500-800 palabras. Oraciones complejas con subordinadas. Vocabulario amplio y desafiante. Párrafos de 4-5 oraciones con estructura elaborada.';
    vocabGuide = isShort ? '5-7 palabras nuevas' : '8-10 palabras nuevas con ejemplo de uso';
  }

  const readingLabel = READING_TYPES.find(r => r.key === readingType)?.label || readingType;

  const systemPrompt = `Actúa como un escritor y maestro experto en literatura infantil para niños de ${age} años.

Tu tarea es crear una GUÍA DE LECTURA completa basada en un/una **${readingLabel}**.
${description ? `\nTema o descripción del usuario: "${description}"` : '\nElige un tema creativo, interesante y educativo apropiado para la edad.'}

═══ REGLAS DE EXTENSIÓN Y VOCABULARIO ═══
${lengthGuide}

═══ ESTRUCTURA OBLIGATORIA ═══

## 📖 [Título creativo del ${readingLabel}]

### ✨ Antes de Leer
2-3 preguntas cortas para activar conocimientos previos del niño. Ejemplo: "¿Alguna vez has visto...?", "¿Qué crees que pasará si...?"

### 📚 ${readingLabel}: [Título]
Aquí va la lectura completa. Debe ser un/una ${readingLabel} original, creativo/a e interesante.
- Si es FÁBULA: debe tener moraleja al final
- Si es COPLA: debe tener rima y ritmo
- Si es POEMA: versos con rima, estrofas claras
- Si es CUENTO: inicio, nudo y desenlace claros
- Si es LEYENDA/MITO: elementos fantásticos culturales
- Si es NOTICIA: formato periodístico adaptado
- Si es CARTA: formato epistolar con remitente y destinatario
- Si es DIÁLOGO: formato teatral con personajes
- Si es TRABALENGUAS Y RIMAS: varios trabalenguas y rimas divertidas

### 📝 Vocabulario Nuevo
${vocabGuide}. Formato tabla:
| Palabra | Significado |
|---------|------------|

### 🤔 ¿Comprendiste la Lectura?
Preguntas de comprensión adaptadas a la edad:
- 2-3 preguntas literales (respuesta directa en el texto)
- 2 preguntas inferenciales (pensar más allá)
- 1 pregunta de opinión personal

### 🎨 ¡Ahora Dibuja!
Invita al niño a hacer un dibujo que represente lo que más le gustó de la lectura o una escena importante. Incluye:
- Una instrucción clara y motivadora de qué dibujar
- Un recuadro grande marcado: [ESPACIO PARA TU DIBUJO]

### ✅ Respuestas
Respuestas de las preguntas de comprensión.

═══ REGLAS FINALES ═══
- Todo en español
- Usa emojis en títulos de sección
- La lectura debe ser ORIGINAL y CREATIVA
- Adapta TODO al nivel de un niño de ${age} años
- Formato: Markdown limpio
- Genera SOLO Markdown`;

  const parts: any[] = [{ text: systemPrompt }];
  if (materialText) parts.push({ text: `Material de referencia adicional:\n${materialText}` });
  files.forEach(file => { parts.push({ inlineData: { mimeType: file.mimeType, data: file.data } }); });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: { role: "user", parts },
  });

  return response.text || "Lo siento, no pude generar el contenido.";
}

// ════════════════════════════════════════════════════════════
//  Imagen para lectura (relacionada al contenido)
// ════════════════════════════════════════════════════════════
export async function generateReadingImage(
  readingLabel: string,
  description: string,
  age: string
): Promise<string | null> {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const ai = new GoogleGenAI({ apiKey });

  const theme = description || readingLabel;

  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: {
        parts: [{
          text: `Crea una ilustración infantil para acompañar un/una ${readingLabel} para niños de ${age} años.
Tema: ${theme}.
Estilo: ilustración tipo libro de cuentos infantil, colores suaves tipo acuarela, personajes tiernos y expresivos estilo cartoon moderno (como Bluey, Pocoyo), escena que represente el tema de la lectura.
La imagen debe ser horizontal (landscape), sin texto, alegre y que invite a leer.
Debe parecer la portada o ilustración principal de un cuento infantil impreso.`,
        }],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating reading image:", error);
    return null;
  }
}

// ════════════════════════════════════════════════════════════
//  Escritura
// ════════════════════════════════════════════════════════════
export async function generateWritingMaterial(
  subject: string,
  age: string,
  materialText: string,
  files: UploadedFile[] = []
): Promise<string> {
  const ai = getApiClient();

  const systemPrompt = `
    Actúa como un maestro experto en escritura creativa para niños de ${age} años.
    Crea un ejercicio de ESCRITURA sobre: ${subject}.
    Usa el material proporcionado como base.

    Estructura:
    - Título motivador
    - Calentamiento: completar oraciones cortas
    - Ejercicio de ortografía: 10 palabras clave
    - Vocabulario: usar palabras en oraciones propias
    - Escritura guiada paso a paso
    - Escritura libre creativa
    - Rúbrica simple de autoevaluación
    Incluye líneas (________) donde el niño debe escribir.

    Formato: Markdown limpio. Español. Usa emojis en títulos.
    Genera SOLO Markdown.
  `;

  const parts: any[] = [{ text: systemPrompt }];
  if (materialText) parts.push({ text: `Material de referencia:\n${materialText}` });
  files.forEach(file => { parts.push({ inlineData: { mimeType: file.mimeType, data: file.data } }); });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: { role: "user", parts },
  });

  return response.text || "Lo siento, no pude generar el contenido.";
}

// ════════════════════════════════════════════════════════════
//  Colorear — categorías y tipos
// ════════════════════════════════════════════════════════════
export const COLORING_CATEGORIES = [
  { key: 'animales', label: 'Animales', emoji: '🐾' },
  { key: 'dinosaurios', label: 'Dinosaurios', emoji: '🦕' },
  { key: 'mar', label: 'Vida Marina', emoji: '🐠' },
  { key: 'granja', label: 'Granja', emoji: '🐔' },
  { key: 'selva', label: 'Selva', emoji: '🦁' },
  { key: 'insectos', label: 'Insectos', emoji: '🦋' },
  { key: 'espacio', label: 'Espacio', emoji: '🚀' },
  { key: 'vehiculos', label: 'Vehículos', emoji: '🚗' },
  { key: 'castillos', label: 'Castillos', emoji: '🏰' },
  { key: 'robots', label: 'Robots', emoji: '🤖' },
  { key: 'piratas', label: 'Piratas', emoji: '🏴‍☠️' },
  { key: 'flores', label: 'Flores', emoji: '🌸' },
  { key: 'comida', label: 'Comida', emoji: '🍕' },
  { key: 'deportes', label: 'Deportes', emoji: '⚽' },
  { key: 'fantasia', label: 'Fantasía', emoji: '🧚' },
  { key: 'anime', label: 'Anime', emoji: '⭐' },
  { key: 'looney-tunes', label: 'Looney Tunes', emoji: '🐰' },
  { key: 'chavo', label: 'Chavo Animado', emoji: '🪣' },
] as const;

export type ColoringCategory = typeof COLORING_CATEGORIES[number]['key'];
export type ColoringMode = 'dotted' | 'outline';

// ════════════════════════════════════════════════════════════
//  Colorear — generar imagen para colorear
// ════════════════════════════════════════════════════════════
export async function generateColoringImage(
  category: ColoringCategory,
  mode: ColoringMode,
  description: string,
  age: string
): Promise<string | null> {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const ai = new GoogleGenAI({ apiKey });

  const categoryLabel = COLORING_CATEGORIES.find(c => c.key === category)?.label || category;

  const modePrompt = mode === 'dotted'
    ? `Crea un dibujo de UNIR PUNTOS (dot-to-dot / connect the dots) para niños de ${age} años.
El dibujo debe ser un personaje o escena de la categoría "${categoryLabel}".
${description ? `Tema específico: ${description}.` : ''}

REGLAS ESTRICTAS:
- Fondo completamente BLANCO
- Solo puntos numerados (1, 2, 3, 4...) conectados por líneas PUNTEADAS muy suaves
- Los números deben ser legibles y estar al lado de cada punto
- El personaje debe formarse al unir todos los puntos en orden
- Estilo limpio, simple, apto para imprimir en blanco y negro
- Los puntos deben estar bien espaciados para que un niño pueda seguirlos con lápiz
- Entre 30 y 60 puntos dependiendo de la complejidad
- NO usar colores, solo BLANCO Y NEGRO
- Orientación vertical (portrait), tamaño carta
- El dibujo debe ocupar la mayor parte de la página`

    : `Crea una página para COLOREAR (coloring page) para niños de ${age} años.
El dibujo debe ser un personaje o escena de la categoría "${categoryLabel}".
${description ? `Tema específico: ${description}.` : ''}

REGLAS ESTRICTAS:
- Fondo completamente BLANCO
- Solo CONTORNOS/LÍNEAS negras gruesas y limpias (line art)
- SIN relleno, SIN sombras, SIN colores — solo el contorno negro sobre fondo blanco
- Las líneas deben ser gruesas y definidas para que un niño pueda colorear dentro de ellas
- Estilo simple y amigable, adaptado a ${age} años
- El personaje debe ser reconocible y atractivo para niños
- Espacios amplios entre líneas para facilitar el coloreado
- Orientación vertical (portrait), tamaño carta
- El dibujo debe ocupar la mayor parte de la página
- Estilo de libro de colorear infantil profesional`;

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: {
      parts: [{ text: modePrompt }],
    },
    config: {
      responseModalities: ['image', 'text'],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No se pudo generar la imagen. La IA no devolvió una imagen. Intenta con otra descripción o categoría.");
}
