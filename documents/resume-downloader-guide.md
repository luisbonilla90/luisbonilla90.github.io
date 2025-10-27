# Resume Downloader Component

## 📋 Descripción

Componente de vanilla JavaScript que convierte el archivo `docs/resume.md` (formato Markdown) a un PDF profesionalmente formateado y lo descarga automáticamente.

## 🚀 Características

- ✅ **Conversión Markdown → HTML → PDF**: Parseo completo de markdown con soporte para headers, listas, enlaces, énfasis, etc.
- ✅ **Estilos profesionales**: PDF formateado con tipografía limpia y estructura clara
- ✅ **Feedback visual**: Indicador de carga mientras se genera el PDF
- ✅ **Manejo de errores**: Mensajes claros si algo falla
- ✅ **Vanilla JS**: Sin dependencias de frameworks (React, Vue, etc.)
- ✅ **Módulos ES6**: Código organizado y mantenible

## 📁 Estructura de Archivos

```
assets/js/
├── main.js                          # Entry point - inicializa el componente
└── components/
    └── resume-downloader.js         # Lógica de conversión MD → PDF
```

## 🔧 Dependencias

El componente utiliza dos librerías CDN:

### 1. **marked.js** (v11.1.1)

- **Propósito**: Parsear Markdown a HTML
- **CDN**: `https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js`
- **Documentación**: https://marked.js.org/

### 2. **html2pdf.js** (v0.10.1)

- **Propósito**: Convertir HTML a PDF
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js`
- **Documentación**: https://ekoopmans.github.io/html2pdf.js/
- **Incluye**: jsPDF + html2canvas (bundle completo)

## 🛠️ Implementación

### 1. HTML (index.html)

```html
<!-- Librerías CDN antes del script principal -->
<script src="https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<!-- Script principal -->
<script type="module" src="assets/js/main.js"></script>

<!-- Botón con ID -->
<a href="#" id="download-resume-btn" class="btn btn-secondary"
  >Download Resume</a
>
```

### 2. JavaScript (main.js)

```javascript
import ResumeDownloader from "./components/resume-downloader.js";

document.addEventListener("DOMContentLoaded", () => {
  const resumeDownloader = new ResumeDownloader();

  const downloadResumeBtn = document.getElementById("download-resume-btn");
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resumeDownloader.descargarResume(downloadResumeBtn);
    });
  }
});
```

## 📝 API del Componente

### Class: `ResumeDownloader`

#### Constructor

```javascript
const downloader = new ResumeDownloader();
```

**Propiedades configurables:**

- `resumePath`: Ruta al archivo markdown (default: `'docs/resume.md'`)
- `fileName`: Nombre del PDF generado (default: `'Luis_Bonilla_Resume.pdf'`)

#### Método Principal

```javascript
async descargarResume(button = null)
```

**Parámetros:**

- `button` (opcional): Elemento DOM del botón. Si se proporciona, mostrará feedback visual (loading state)

**Proceso:**

1. Muestra indicador de carga
2. Fetch del archivo markdown
3. Conversión Markdown → HTML
4. Aplicación de estilos CSS
5. Generación del PDF
6. Descarga automática
7. Oculta indicador de carga

**Retorno:** `Promise<void>`

**Errores:** Captura y muestra alertas con mensajes descriptivos

## 🎨 Estilos del PDF

El PDF generado incluye:

- **Tipografía**: Segoe UI (sans-serif profesional)
- **Tamaño de página**: Letter (8.5" x 11")
- **Márgenes**: 15mm en todos los lados
- **Colores**:

  - Headers: #2c3e50, #34495e
  - Texto principal: #333
  - Enlaces: #3498db
  - Borders: #95a5a6, #bdc3c7

- **Formato**:
  - H1: 24pt, border inferior azul
  - H2: 18pt, border inferior gris
  - H3: 14pt
  - Body: 11pt, line-height 1.6
  - Listas con indentación apropiada

## 🔄 Flujo de Conversión

```
resume.md
    ↓ (fetch)
Markdown String
    ↓ (marked.parse o fallback)
HTML String
    ↓ (styleHTML)
Styled HTML
    ↓ (html2pdf)
PDF Blob
    ↓ (save)
Descarga automática
```

## 🛡️ Manejo de Errores

### Casos cubiertos:

1. **Archivo no encontrado**: Si `docs/resume.md` no existe
2. **Librería faltante**: Si html2pdf.js no está cargado
3. **Error de conversión**: Problemas durante el parseo o generación
4. **Timeout**: Problemas de red al hacer fetch

**Comportamiento:**

- Muestra alert con mensaje descriptivo
- Registra error en console para debugging
- Restaura el estado del botón (oculta loading)

## 📦 Fallback Markdown Parser

Si `marked.js` no está disponible, el componente incluye un parser básico que soporta:

- Headers (H1, H2, H3)
- Bold (`**texto**`, `__texto__`)
- Italic (`*texto*`, `_texto_`)
- Enlaces `[texto](url)`
- Listas (`*` y `-`)
- Horizontal rules (`---`)
- Párrafos

**Nota:** Para mejor fidelidad, se recomienda usar marked.js (incluido por defecto).

## 🚀 Uso en Producción

### Recomendaciones:

1. **Hospedar librerías localmente** (opcional):

   ```bash
   npm install marked html2pdf.js
   cp node_modules/marked/marked.min.js assets/js/lib/
   cp node_modules/html2pdf.js/dist/html2pdf.bundle.min.js assets/js/lib/
   ```

2. **Minificar código**:

   ```bash
   npx terser assets/js/components/resume-downloader.js -c -m -o assets/js/components/resume-downloader.min.js
   ```

3. **Versioning**: Usar URLs versionadas para CDN (ya implementado)

4. **Integrity checks**: SRI hashes incluidos para seguridad

## 🧪 Testing

### Prueba manual:

1. Abrir `index.html` en navegador
2. Click en botón "Download Resume"
3. Verificar:
   - Botón muestra "Generating PDF..."
   - PDF se descarga con nombre `Luis_Bonilla_Resume.pdf`
   - Contenido del PDF refleja `docs/resume.md`
   - Formato es profesional y legible

### Console debugging:

```javascript
// En DevTools Console
const downloader = new ResumeDownloader();
await downloader.descargarResume();
```

## 📊 Configuración Avanzada

### Personalizar opciones del PDF:

Editar en `resume-downloader.js` → método `generatePDF()`:

```javascript
const opt = {
  margin: [15, 15, 15, 15], // Márgenes [top, right, bottom, left] en mm
  filename: this.fileName,
  image: {
    type: "jpeg", // 'jpeg' o 'png'
    quality: 0.98, // 0-1
  },
  html2canvas: {
    scale: 2, // Resolución (1-4, más alto = mejor calidad)
    useCORS: true,
    letterRendering: true,
  },
  jsPDF: {
    unit: "mm", // 'mm', 'pt', 'in'
    format: "letter", // 'a4', 'letter', 'legal'
    orientation: "portrait", // 'portrait' o 'landscape'
    compress: true,
  },
  pagebreak: {
    mode: ["avoid-all", "css", "legacy"], // Control de saltos de página
  },
};
```

### Cambiar estilos del PDF:

Editar en `resume-downloader.js` → método `styleHTML()`:

```javascript
<style>/* Modificar colores, fonts, spacing, etc. */</style>
```

## 🔍 Troubleshooting

### El PDF no se descarga

**Posibles causas:**

1. Librerías CDN no cargadas → Verificar en DevTools Network
2. CORS issues con `docs/resume.md` → Servir con servidor local
3. Bloqueador de popups → Permitir descargas del sitio

**Solución:**

```bash
# Servir con servidor local
python -m http.server 8000
# o
npx serve
```

### PDF con formato incorrecto

**Verificar:**

1. Markdown está bien formateado en `docs/resume.md`
2. Estilos CSS en `styleHTML()` son válidos
3. Scale en html2canvas no es demasiado alto (consume memoria)

### Botón se queda en "Generating PDF..."

**Causa:** Error no capturado o timeout

**Solución:** Verificar console para errores específicos

## 📚 Referencias

- [Marked.js Documentation](https://marked.js.org/)
- [html2pdf.js Documentation](https://ekoopmans.github.io/html2pdf.js/)
- [jsPDF Documentation](https://artskydj.github.io/jsPDF/docs/)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## ✅ Checklist de Implementación

- [x] Crear `resume-downloader.js` component
- [x] Importar en `main.js`
- [x] Agregar ID al botón HTML
- [x] Incluir librerías CDN (marked.js, html2pdf.js)
- [x] Configurar event listener
- [x] Implementar feedback visual (loading state)
- [x] Manejo de errores
- [x] Documentación completa

## 🎯 Resultado

El usuario puede descargar su resume profesional en formato PDF con un solo click, generado dinámicamente desde el archivo Markdown con estilos limpios y profesionales.
