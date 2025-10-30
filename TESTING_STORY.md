# Story: Implementar Suite de Pruebas Automatizadas para Sitio Web de Portfolio

## Como Senior QA Engineer

Quiero implementar una suite completa de pruebas automatizadas (unitarias y end-to-end) para el sitio web de portfolio de Luis Bonilla para asegurar la calidad, estabilidad y correcto funcionamiento de todas las funcionalidades críticas del sitio.

## Criterios de Aceptación

### Pruebas Unitarias (Jest + Testing Library)

#### 1. Componentes Interactivos

- [ ] **WebVitals Component**: Verificar que el script de web-vitals se importa correctamente sin errores
- [ ] **Theme Toggle**: Probar cambio entre temas claro/oscuro y persistencia en localStorage
- [ ] **Language Selector**: Validar cambio de idioma y actualización de textos i18n
- [ ] **Mobile Menu**: Probar apertura/cierre del menú móvil y actualización de aria-expanded
- [ ] **Back to Top Button**: Verificar funcionalidad de scroll y accesibilidad

#### 2. Utilidades y Funciones

- [ ] **Asset Path Helpers**: Validar que las rutas de assets sean relativas (`assets/...`)
- [ ] **i18n Functions**: Probar carga y cambio de idiomas
- [ ] **LocalStorage/SessionStorage**: Verificar persistencia de preferencias de usuario

#### 3. Layout y Estructura

- [ ] **BaseLayout**: Confirmar que incluye todos los componentes necesarios
- [ ] **SEO Meta Tags**: Validar generación correcta de meta tags
- [ ] **Structured Data**: Verificar JSON-LD para WebSite y Person

### Pruebas End-to-End (Playwright)

#### 4. Navegación y Rutas

- [ ] **Home Page Load**: Verificar carga completa del sitio sin errores de consola
- [ ] **Asset Loading**: Confirmar que todos los assets (CSS, JS, imágenes) cargan correctamente
- [ ] **Navigation Links**: Probar navegación entre secciones usando anclas (#about, #skills, etc.)
- [ ] **Responsive Design**: Validar funcionamiento en diferentes tamaños de pantalla

#### 5. Interactividad Completa

- [ ] **Mobile Menu E2E**: Abrir menú móvil, navegar a secciones, verificar cierre automático
- [ ] **Theme Switching E2E**: Cambiar tema y verificar persistencia entre sesiones
- [ ] **Language Switching E2E**: Cambiar idioma y verificar actualización de todos los textos
- [ ] **Warning Banner**: Mostrar/ocultar banner de construcción y verificar sessionStorage

#### 6. Contenido y SEO

- [ ] **Meta Tags Validation**: Verificar presencia y contenido correcto de meta tags
- [ ] **Structured Data**: Validar JSON-LD con herramientas de testing de schema.org
- [ ] **Accessibility**: Ejecutar pruebas de accesibilidad con axe-core
- [ ] **Performance**: Verificar Core Web Vitals (CLS, FID, FCP, LCP, TTFB)

#### 7. Integraciones Externas

- [ ] **Analytics Script**: Verificar carga del script de Pirsch sin errores
- [ ] **RSS Feed**: Validar enlace y contenido del feed RSS
- [ ] **External Links**: Probar enlaces a LinkedIn, GitHub, etc.

### Configuración Técnica

#### Herramientas y Frameworks

- **Unit Testing**: Jest + @testing-library/jest-dom + @testing-library/astro
- **E2E Testing**: Playwright con configuración multi-browser
- **Accessibility**: axe-playwright para pruebas de accesibilidad
- **Visual Testing**: Playwright para comparación visual de componentes
- **CI/CD**: Integración con GitHub Actions para ejecución automática

#### Scripts de Package.json

```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:accessibility": "playwright test --grep accessibility",
  "test:coverage": "jest --coverage"
}
```

#### Estructura de Archivos

```
tests/
├── unit/
│   ├── components/
│   │   ├── WebVitals.test.js
│   │   ├── ThemeToggle.test.js
│   │   └── LanguageSelector.test.js
│   ├── utils/
│   │   ├── assetPaths.test.js
│   │   └── i18n.test.js
│   └── layouts/
│       └── BaseLayout.test.js
├── e2e/
│   ├── navigation.spec.js
│   ├── interactivity.spec.js
│   ├── accessibility.spec.js
│   └── performance.spec.js
└── fixtures/
    └── test-data.json
```

### Definición de Hecho (DoD)

- [ ] Todas las pruebas unitarias pasan con cobertura >85%
- [ ] Todas las pruebas E2E pasan en Chrome, Firefox y Safari
- [ ] Pruebas de accesibilidad pasan con score >90
- [ ] Pruebas integradas en CI/CD con ejecución automática
- [ ] Documentación de pruebas actualizada
- [ ] Scripts de testing documentados en README

### Notas Técnicas

- Configurar Playwright para testing en múltiples viewports (mobile, tablet, desktop)
- Implementar mocking para scripts externos en pruebas unitarias
- Usar data-testid para elementos interactivos sin texto visible
- Configurar timeouts apropiados para pruebas E2E
- Implementar paralelización de pruebas para optimizar tiempo de ejecución
