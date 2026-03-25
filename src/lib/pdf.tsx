import { marked } from 'marked';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { GeneratedBook } from './gemini';

// ── Colors (hex only – no oklch) ───────────────────────────
const C = {
  sky700: '#0369a1',
  sky600: '#0284c7',
  sky500: '#0ea5e9',
  sky200: '#bae6fd',
  sky100: '#e0f2fe',
  sky50: '#f0f9ff',
  orange500: '#f97316',
  orange100: '#ffedd5',
  slate700: '#334155',
  slate600: '#475569',
  slate400: '#94a3b8',
  slate300: '#cbd5e1',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  white: '#ffffff',
};

export interface PdfParams {
  content: string;
  subject: string;
  age: string;
  sectionLabel: string;
  langLabel?: string;
  image: string | null;
}

function buildHtml(params: PdfParams): string {
  const { content, subject, age, sectionLabel, langLabel, image } = params;
  const bodyHtml = marked.parse(content, { async: false }) as string;
  const subtitle = `${sectionLabel}${langLabel ? ` &bull; ${langLabel}` : ''} &bull; ${age} Años`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Fredoka', 'Segoe UI', Arial, sans-serif;
    font-size: 13px;
    line-height: 1.65;
    color: ${C.slate700};
    background: ${C.white};
    width: 816px;
    padding: 50px 50px 60px 50px;
  }

  /* ═══ HEADER ═══ */
  .pdf-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 4px solid ${C.sky200};
    padding-bottom: 14px;
    margin-bottom: 20px;
  }
  .pdf-header-title {
    font-size: 24px;
    font-weight: 700;
    color: ${C.sky600};
    margin: 0;
    line-height: 1.2;
  }
  .pdf-header .subtitle {
    font-size: 10px;
    color: ${C.slate400};
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-top: 3px;
  }
  .pdf-header-img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid ${C.sky100};
  }

  /* ═══ BANNER ═══ */
  .pdf-banner {
    width: 100%;
    max-height: 180px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 20px;
    border: 2px solid ${C.sky100};
  }

  /* ═══ HEADINGS ═══ */
  h1 {
    font-size: 20px;
    font-weight: 700;
    color: ${C.sky600};
    margin: 22px 0 8px 0;
    padding-bottom: 4px;
    border-bottom: 2px solid ${C.sky100};
  }
  h2 {
    font-size: 17px;
    font-weight: 700;
    color: ${C.orange500};
    margin: 18px 0 8px 0;
  }
  h3 {
    font-size: 15px;
    font-weight: 600;
    color: ${C.slate600};
    margin: 14px 0 6px 0;
  }
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: ${C.slate600};
    margin: 10px 0 4px 0;
  }

  /* ═══ TEXT ═══ */
  p { margin-bottom: 8px; }
  strong { font-weight: 700; color: ${C.sky700}; }
  em { font-style: italic; }

  /* ═══ LISTS ═══ */
  ul, ol {
    margin: 6px 0 10px 22px;
    padding: 0;
  }
  li {
    margin-bottom: 3px;
    padding-left: 4px;
  }
  li::marker { color: ${C.sky500}; font-weight: 600; }

  /* ═══ TABLE (critical for word search, matching, etc.) ═══ */
  table {
    width: auto;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
    font-size: 12px;
    page-break-inside: avoid;
  }
  th, td {
    border: 1px solid ${C.slate200};
    padding: 5px 8px;
    text-align: center;
    vertical-align: middle;
  }
  thead th {
    background: ${C.sky100};
    color: ${C.sky700};
    font-weight: 700;
    font-size: 12px;
    border-bottom: 2px solid ${C.sky500};
  }
  tbody tr:nth-child(even) td {
    background: #f8fafc;
  }

  /* Word search specific: single-letter cells should be square-ish */
  td:only-child, td {
    min-width: 24px;
    font-weight: 500;
  }

  /* ═══ BLOCKQUOTE ═══ */
  blockquote {
    border-left: 4px solid ${C.sky500};
    background: ${C.sky50};
    padding: 10px 14px;
    margin: 10px 0;
    border-radius: 4px;
    font-style: italic;
  }
  blockquote p { margin-bottom: 4px; }

  /* ═══ CODE ═══ */
  code {
    background: ${C.slate100};
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 11px;
    font-family: 'Courier New', monospace;
  }
  pre {
    background: ${C.slate100};
    padding: 12px;
    border-radius: 6px;
    margin: 10px 0;
    overflow-x: auto;
    font-size: 11px;
  }
  pre code { background: none; padding: 0; }

  /* ═══ HR ═══ */
  hr {
    border: none;
    border-top: 2px dashed ${C.slate200};
    margin: 16px 0;
  }

  /* ═══ LINKS ═══ */
  a { color: ${C.sky600}; text-decoration: underline; }

  /* ═══ FILL-IN BLANKS ═══ */
  /* Make underscores more visible */

  /* ═══ CREATIVE SPACE ═══ */
  .pdf-content p:has(+ p) { }

  /* ═══ FOOTER ═══ */
  .pdf-footer {
    margin-top: 30px;
    padding-top: 12px;
    border-top: 2px solid ${C.slate200};
    text-align: center;
    font-size: 10px;
    color: ${C.slate300};
  }

  /* ═══ IMAGES ═══ */
  img:not(.pdf-header-img):not(.pdf-banner) {
    max-width: 100%;
    border-radius: 8px;
    margin: 8px 0;
  }
</style>
</head>
<body>
  <!-- Header -->
  <div class="pdf-header">
    <div>
      <div class="pdf-header-title">${subject}</div>
      <div class="subtitle">${subtitle}</div>
    </div>
    ${image ? `<img class="pdf-header-img" src="${image}" />` : ''}
  </div>

  <!-- Banner -->
  ${image ? `<img class="pdf-banner" src="${image}" />` : ''}

  <!-- Content -->
  <div class="pdf-content">
    ${bodyHtml}
  </div>

  <!-- Footer -->
  <div class="pdf-footer">
    Generado con Solo un Papá REAL ⭐
  </div>
</body>
</html>`;
}

export async function generateAndDownloadPdf(params: PdfParams, filename: string): Promise<void> {
  const html = buildHtml(params);

  // Create a hidden iframe – completely isolated from Tailwind/oklch
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-10000px';
  iframe.style.top = '0';
  iframe.style.width = '816px';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    document.body.removeChild(iframe);
    throw new Error('Could not access iframe document');
  }

  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();

  // Wait for fonts and images to fully load
  await new Promise<void>((resolve) => {
    const check = () => {
      if (iframeDoc.readyState === 'complete') {
        setTimeout(resolve, 1000); // extra time for Google Fonts
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });

  // Resize iframe to actual content height
  const body = iframeDoc.body;
  iframe.style.height = body.scrollHeight + 100 + 'px';

  // Small extra wait after resize
  await new Promise(r => setTimeout(r, 200));

  try {
    const canvas = await html2canvas(body, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 816,
      windowWidth: 816,
    });

    // Letter: 215.9mm x 279.4mm
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
    const pageW = 215.9;
    const pageH = 279.4;
    const imgW = pageW;
    const imgH = (canvas.height * imgW) / canvas.width;

    if (imgH <= pageH) {
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, imgW, imgH);
    } else {
      const pxPerPage = (pageH / imgH) * canvas.height;
      const totalPages = Math.ceil(canvas.height / pxPerPage);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();

        const srcY = Math.floor(i * pxPerPage);
        const srcH = Math.min(Math.ceil(pxPerPage), canvas.height - srcY);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = srcH;
        const ctx = pageCanvas.getContext('2d');
        if (!ctx) continue;

        ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

        const sliceH = (srcH * imgW) / canvas.width;
        pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, imgW, sliceH);
      }
    }

    pdf.save(filename);
  } finally {
    document.body.removeChild(iframe);
  }
}

// ── Book PDF ────────────────────────────────────────────────

function buildBookHtml(book: GeneratedBook, age: string): string {
  const chapters = book.chapters || [];

  const coverPage = `
    <div style="page-break-after: always; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 950px; text-align: center;">
      ${book.coverImage ? `<img src="${book.coverImage}" style="width: 100%; max-height: 600px; object-fit: contain; border-radius: 16px; margin-bottom: 30px;" />` : ''}
      <h1 style="font-size: 32px; font-weight: 700; color: ${C.sky600}; margin-bottom: 12px; line-height: 1.3;">${book.bookTitle}</h1>
      <p style="font-size: 14px; color: ${C.slate400}; letter-spacing: 1px; text-transform: uppercase;">Libro de la Semana &bull; ${age} Años</p>
      <p style="font-size: 12px; color: ${C.slate300}; margin-top: 8px;">Un capítulo por día &bull; 20 minutos de lectura</p>
    </div>
  `;

  const chapterPages = chapters.map((ch) => {
    const contentHtml = marked.parse(ch.content, { async: false }) as string;
    return `
      <div style="page-break-before: always; padding-top: 20px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 3px solid ${C.sky200};">
          <div style="background: ${C.sky500}; color: white; font-weight: 700; font-size: 14px; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ${ch.day}
          </div>
          <div>
            <div style="font-size: 10px; color: ${C.slate400}; text-transform: uppercase; letter-spacing: 1px;">Día ${ch.day}</div>
            <div style="font-size: 20px; font-weight: 700; color: ${C.sky600};">${ch.title}</div>
          </div>
        </div>
        ${ch.image ? `<img src="${ch.image}" style="width: 100%; max-height: 320px; object-fit: contain; border-radius: 12px; margin-bottom: 16px; border: 2px solid ${C.sky100};" />` : ''}
        <div class="pdf-content" style="font-size: 14px; line-height: 1.8;">
          ${contentHtml}
        </div>
      </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Fredoka', 'Segoe UI', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: ${C.slate700};
    background: ${C.white};
    width: 816px;
    padding: 50px 50px 60px 50px;
  }
  h1, h2, h3 { color: ${C.sky600}; }
  h2 { font-size: 17px; font-weight: 700; color: ${C.orange500}; margin: 16px 0 8px 0; }
  h3 { font-size: 15px; font-weight: 600; margin: 12px 0 6px 0; }
  p { margin-bottom: 10px; }
  strong { font-weight: 700; color: ${C.sky700}; }
  em { font-style: italic; }
  ul, ol { margin: 6px 0 10px 22px; }
  li { margin-bottom: 4px; }
  li::marker { color: ${C.sky500}; font-weight: 600; }
  blockquote {
    border-left: 4px solid ${C.sky500};
    background: ${C.sky50};
    padding: 10px 14px;
    margin: 10px 0;
    border-radius: 4px;
    font-style: italic;
  }
  img { max-width: 100%; }
  .pdf-footer {
    margin-top: 40px;
    padding-top: 12px;
    border-top: 2px solid ${C.slate200};
    text-align: center;
    font-size: 10px;
    color: ${C.slate300};
  }
</style>
</head>
<body>
  ${coverPage}
  ${chapterPages}
  <div class="pdf-footer">
    Generado con Solo un Papá REAL ⭐
  </div>
</body>
</html>`;
}

export async function generateBookPdf(book: GeneratedBook, age: string): Promise<void> {
  const html = buildBookHtml(book, age);

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-10000px';
  iframe.style.top = '0';
  iframe.style.width = '816px';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    document.body.removeChild(iframe);
    throw new Error('Could not access iframe document');
  }

  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();

  await new Promise<void>((resolve) => {
    const check = () => {
      if (iframeDoc.readyState === 'complete') {
        setTimeout(resolve, 1500); // extra time for fonts + images
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });

  const body = iframeDoc.body;
  iframe.style.height = body.scrollHeight + 200 + 'px';
  await new Promise(r => setTimeout(r, 300));

  try {
    const canvas = await html2canvas(body, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 816,
      windowWidth: 816,
    });

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
    const pageW = 215.9;
    const pageH = 279.4;
    const imgW = pageW;
    const imgH = (canvas.height * imgW) / canvas.width;

    if (imgH <= pageH) {
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, imgW, imgH);
    } else {
      const pxPerPage = (pageH / imgH) * canvas.height;
      const totalPages = Math.ceil(canvas.height / pxPerPage);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();
        const srcY = Math.floor(i * pxPerPage);
        const srcH = Math.min(Math.ceil(pxPerPage), canvas.height - srcY);
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = srcH;
        const ctx = pageCanvas.getContext('2d');
        if (!ctx) continue;
        ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);
        const sliceH = (srcH * imgW) / canvas.width;
        pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, imgW, sliceH);
      }
    }

    const safeName = book.bookTitle.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]/g, '').replace(/\s+/g, '_');
    pdf.save(`${safeName}_libro.pdf`);
  } finally {
    document.body.removeChild(iframe);
  }
}
