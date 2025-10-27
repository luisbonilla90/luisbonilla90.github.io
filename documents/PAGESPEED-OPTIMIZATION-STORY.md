# PageSpeed Optimization Story

## **Epic**: Mejora de Rendimiento Web - Google PageSpeed Issues

**Fecha**: 27 de octubre de 2025  
**Estado**: En Planificación  
**Prioridad**: Alta  
**Impacto**: Core Web Vitals, SEO, UX

---

## **Contexto Técnico**

El análisis de Google PageSpeed ha identificado **3 problemas críticos** que afectan el rendimiento de la página, específicamente impactando el **LCP (Largest Contentful Paint)** y **FCP (First Contentful Paint)**:

### **Análisis del Sitio Actual**

- **Stack**: Astro 5.14.5 + GitHub Pages
- **Deployment**: Estático en `/docs`
- **Build Output**: Assets con hash automático
- **Analytics**: Pirsch Analytics + Web Vitals monitoring
- **Dominio**: `luisbonilla90.github.io`

---

## **Problemas Identificados**

### **1. 🚫 Solicitudes que bloquean el renderizado**

**Impacto**: 320ms de ahorro estimado

```
URL: …css/slug_-Brwjqqt2.css (luisbonilla90.github.io)
Tamaño: 6.5 KiB
Duración: 160ms
```

**Análisis técnico**:

- El CSS principal está bloqueando el primer renderizado
- Astro está generando el CSS con hash pero sin optimizaciones de carga
- No hay preloading del CSS crítico

**Archivos involucrados**:

- `src/layouts/BaseLayout.astro` - Layout principal
- `src/styles/main.css` - Estilos principales
- `astro.config.mjs` - Configuración de build

### **2. 📊 Árbol de dependencia de red**

**Impacto**: Latencia de ruta crítica máxima de 1022ms

**Cadena crítica identificada**:

```
Navegación inicial → 76ms
web-vitals@4/+esm (cdn.jsdelivr.net) → 343ms
css/slug_-Brwjqqt2.css → 169ms
js/main.js → 148ms
components/*.js (múltiples) → 354-418ms
api.pirsch.io/hit → 1022ms ⚠️
locales/en.json → 602ms
core/*.js (múltiples) → 352-464ms
```

**Problemas**:

- **Carga secuencial** de módulos JavaScript
- **Web Vitals desde CDN** añade latencia inicial
- **Analytics blocking** la cadena crítica
- **Sin resource hints** para dominios externos
- **Sin modulepreload** para dependencias críticas

**Archivos involucrados**:

- `src/components/WebVitals.astro`
- `src/layouts/BaseLayout.astro` - Scripts de analytics
- `public/assets/js/main.js` y dependencias

### **3. ⏰ Tiempos de vida de caché ineficientes**

**Impacto**: 25 KiB de ahorro estimado

**Recursos con caché subóptimo**:

```
Recursos propios (luisbonilla90.github.io): 10min
- css/slug_-Brwjqqt2.css: 7 KiB
- js/main.js: 3 KiB
- core/*.js: 2 KiB cada uno
- components/*.js: 2 KiB cada uno

VS. Recursos externos:
- api.pirsch.io/pa.js: 1d
- cdn.jsdelivr.net/web-vitals: 7d
```

**Limitación técnica**:

- GitHub Pages controla los headers de caché
- No podemos modificar directamente los cache headers
- Necesitamos soluciones alternativas

---

## **Soluciones Propuestas**

### **Story 1: Critical Resource Preloading**

**Objetivo**: Eliminar bloqueo de renderizado CSS

**Tareas técnicas**:

1. **Implementar preload de CSS crítico** en `BaseLayout.astro`

   ```html
   <link
     rel="preload"
     href="/assets/css/main.css"
     as="style"
     onload="this.onload=null;this.rel='stylesheet'"
   />
   ```

2. **Critical CSS inlining** para estilos above-the-fold

   - Extraer CSS crítico del layout principal
   - Inline en `<head>` para renderizado inmediato

3. **Lazy loading para CSS no crítico**
   - Mover estilos de componentes a carga diferida

**Estimación**: 5 story points  
**Archivos a modificar**:

- `src/layouts/BaseLayout.astro`
- `src/styles/main.css`
- Potencial nuevo: `src/styles/critical.css`

### **Story 2: Resource Hints & Preconnections**

**Objetivo**: Optimizar cadena de dependencias

**Tareas técnicas**:

1. **Añadir DNS prefetch y preconnect**

   ```html
   <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
   <link rel="dns-prefetch" href="//api.pirsch.io" />
   <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
   <link rel="preconnect" href="https://api.pirsch.io" />
   ```

2. **Module preloading** para JavaScript crítico

   ```html
   <link rel="modulepreload" href="/assets/js/main.js" />
   <link rel="modulepreload" href="/assets/js/core/i18n.js" />
   ```

3. **Optimizar orden de carga** de scripts
   - Analytics debe cargar async/defer
   - Web Vitals solo después del LCP

**Estimación**: 3 story points  
**Archivos a modificar**:

- `src/layouts/BaseLayout.astro`
- `src/components/WebVitals.astro`

### **Story 3: Script Loading Optimization**

**Objetivo**: Reducir blocking JavaScript

**Tareas técnicas**:

1. **Diferir Web Vitals** hasta después del load

   ```javascript
   window.addEventListener("load", () => {
     import("https://cdn.jsdelivr.net/npm/web-vitals@4/+esm").then(
       ({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
         // Initialize metrics
       }
     );
   });
   ```

2. **Analytics async loading**

   - Mover Pirsch analytics a carga diferida
   - Usar intersection observer para trigger

3. **Bundle optimization**
   - Revisar configuración Vite en `astro.config.mjs`
   - Optimizar chunking strategy

**Estimación**: 5 story points  
**Archivos a modificar**:

- `src/components/WebVitals.astro`
- `src/layouts/BaseLayout.astro`
- `astro.config.mjs`

### **Story 4: Static Asset Optimization**

**Objetivo**: Maximizar caché effectiveness (dentro de limitaciones de GitHub Pages)

**Tareas técnicas**:

1. **Asset fingerprinting optimization**

   - Configurar mejor estrategia de naming en Vite
   - Asegurar hashes consistentes para caché

2. **Resource bundling strategy**

   - Agrupar recursos pequeños para reducir requests
   - Optimizar tamaño de chunks

3. **Service Worker implementation** (opcional)
   - Implementar caché client-side como fallback
   - Solo para assets críticos

**Estimación**: 8 story points  
**Archivos a modificar**:

- `astro.config.mjs`
- Potencial nuevo: `public/sw.js`

---

## **Roadmap de Implementación**

### **Sprint 1** (Semana 1)

- Story 2: Resource Hints & Preconnections (3 SP)
- Story 3: Script Loading Optimization (5 SP)
- **Total**: 8 SP

### **Sprint 2** (Semana 2)

- Story 1: Critical Resource Preloading (5 SP)
- **Total**: 5 SP

### **Sprint 3** (Semana 3)

- Story 4: Static Asset Optimization (8 SP)
- Testing y validación con PageSpeed
- **Total**: 8 SP

**Total estimado**: 21 story points

---

## **Criterios de Aceptación**

### **Métricas objetivo post-optimización**:

- **LCP**: < 2.5s (actualmente afectado por 320ms de CSS blocking)
- **FCP**: < 1.8s (mejorar cadena crítica)
- **PageSpeed Score**: > 90 (móvil y desktop)
- **Ahorro de transferencia**: 25+ KiB (por mejoras de caché)

### **Testing requirements**:

1. **PageSpeed Insights** antes/después
2. **Web Vitals reales** en producción
3. **Lighthouse CI** en pipeline
4. **Testing cross-device** (móvil/desktop)

---

## **Riesgos y Mitigaciones**

### **Riesgo 1**: GitHub Pages cache limitations

**Mitigación**: Implementar estrategias client-side como Service Workers

### **Riesgo 2**: Breaking changes en analytics

**Mitigación**: Mantener fallbacks y monitoreo de errores

### **Riesgo 3**: Complejidad de critical CSS

**Mitigación**: Automatizar extracción con herramientas como `critical`

---

## **Referencias Técnicas**

### **Documentación relevante**:

- [Astro Build Configuration](https://docs.astro.build/en/reference/configuration-reference/#build-options)
- [Vite Build Options](https://vitejs.dev/config/build-options.html)
- [Web Vitals Best Practices](https://web.dev/vitals/)
- [Resource Hints Specification](https://www.w3.org/TR/resource-hints/)

### **Archivos del codebase**:

- `astro.config.mjs` - Configuración principal de build
- `src/layouts/BaseLayout.astro` - Layout base con head configuration
- `src/components/WebVitals.astro` - Web vitals monitoring
- `src/styles/main.css` - Estilos principales
- `package.json` - Dependencies y scripts
- `docs/` - Output directory (GitHub Pages)

### **Herramientas de testing**:

- Google PageSpeed Insights
- Chrome DevTools Coverage tab
- Lighthouse CI
- WebPageTest.org

---

**Owner**: Tech Director  
**Reviewers**: Frontend Team, Performance Team  
**Next Review**: Post-Sprint 1 implementation
