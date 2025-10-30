# GitHub Space Instructions: Personal Themeable Website

## Project Requirements

### Core Principles

- **Progressive Enhancement**: Start with HTML, CSS, JS. Expand as needed
- **Themeable Architecture**: Highly customizable design system
- **UI/UX Best Practices**: Modern, accessible, user-centric design
- **100% Accessibility**: WCAG 2.1 AA compliance
- **OWASP Security Standards**: Secure development practices
- **i18n Ready**: Built for multilingual content from day one

## File Structure

```
personal-website/
├── index.html
├── about.html
├── portfolio/
│   ├── index.html
│   └── project-detail.html
├── blog/
│   ├── index.html
│   └── post-detail.html
├── contact.html
├── assets/
│   ├── css/
│   │   ├── base/
│   │   │   ├── reset.css
│   │   │   ├── variables.css
│   │   │   └── typography.css
│   │   ├── components/
│   │   │   ├── header.css
│   │   │   ├── navigation.css
│   │   │   └── theme-switcher.css
│   │   ├── themes/
│   │   │   ├── light.css
│   │   │   ├── dark.css
│   │   │   └── professional.css
│   │   └── main.css
│   ├── js/
│   │   ├── core/
│   │   │   ├── theme-manager.js
│   │   │   ├── i18n.js
│   │   │   └── security.js
│   │   ├── components/
│   │   │   ├── navigation.js
│   │   │   └── form-validator.js
│   │   └── main.js
│   └── images/
│       ├── icons/
│       └── content/
├── locales/
│   ├── en.json
│   └── es.json
└── README.md
```

## Implementation Phases

### Phase 1: Foundation (HTML + CSS + JS)

```html
<!-- Basic HTML structure with i18n attributes -->
<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Personal website"
      data-i18n="meta_description"
    />
    <title data-i18n="page_title">Personal Website</title>
    <link rel="stylesheet" href="assets/css/main.css" />
  </head>
  <body>
    <header role="banner">
      <nav role="navigation" aria-label="Main navigation">
        <!-- Navigation content -->
      </nav>
      <div class="theme-controls">
        <button id="theme-toggle" aria-label="Toggle theme">
          <span class="theme-icon" aria-hidden="true">🌙</span>
        </button>
      </div>
      <div class="language-switcher">
        <select id="language-select" aria-label="Select language">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </header>

    <main role="main">
      <!-- Main content -->
    </main>

    <footer role="contentinfo">
      <!-- Footer content -->
    </footer>

    <script src="assets/js/main.js" type="module"></script>
  </body>
</html>
```

### Phase 2: CSS Architecture with Theme Variables

```css
/* assets/css/base/variables.css */
:root {
  /* Color System */
  --color-primary: #ffffff;
  --color-secondary: #f8f9fa;
  --color-accent: #007bff;
  --color-text: #212529;
  --color-text-muted: #6c757d;

  /* Typography */
  --font-family-base: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-heading: "Georgia", serif;
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
  --line-height-base: 1.6;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Borders */
  --border-radius: 0.375rem;
  --border-width: 1px;

  /* Transitions */
  --transition-base: all 0.3s ease;
}

/* Dark theme */
[data-theme="dark"] {
  --color-primary: #1a1a1a;
  --color-secondary: #2d2d2d;
  --color-accent: #4dabf7;
  --color-text: #e9ecef;
  --color-text-muted: #adb5bd;
}

/* Professional theme */
[data-theme="professional"] {
  --color-primary: #f8f9fa;
  --color-secondary: #e9ecef;
  --color-accent: #2c3e50;
  --color-text: #2c3e50;
  --font-family-heading: "Helvetica Neue", sans-serif;
}
```

### Phase 3: JavaScript Module Structure

```javascript
// assets/js/core/theme-manager.js
export class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
  }

  applyTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    this.currentTheme = themeName;

    // Dispatch custom event for theme change
    window.dispatchEvent(
      new CustomEvent("themeChanged", { detail: themeName })
    );
  }

  setupEventListeners() {
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    const themes = ["light", "dark", "professional"];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.applyTheme(themes[nextIndex]);
  }
}
```

```javascript
// assets/js/core/i18n.js
export class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem("language") || "en";
    this.translations = {};
    this.init();
  }

  async init() {
    await this.loadTranslations(this.currentLanguage);
    this.applyTranslations();
    this.setupEventListeners();
  }

  async loadTranslations(lang) {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      this.translations = await response.json();
    } catch (error) {
      console.error("Failed to load translations:", error);
    }
  }

  applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (this.translations[key]) {
        if (element.tagName === "INPUT" && element.placeholder) {
          element.placeholder = this.translations[key];
        } else {
          element.textContent = this.translations[key];
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;
  }

  async changeLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem("language", lang);
    await this.loadTranslations(lang);
    this.applyTranslations();

    // Dispatch language change event
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: lang }));
  }

  setupEventListeners() {
    document
      .getElementById("language-select")
      ?.addEventListener("change", (e) => {
        this.changeLanguage(e.target.value);
      });
  }
}
```

### Phase 4: Security Implementation

```javascript
// assets/js/core/security.js
export class SecurityManager {
  static init() {
    this.applyCSP();
    this.sanitizeInputs();
    this.setupSecurityHeaders();
  }

  static applyCSP() {
    // Content Security Policy would be set via server headers
    // This is a client-side helper for development
    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-Security-Policy";
    meta.content =
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
    document.head.appendChild(meta);
  }

  static sanitizeInputs() {
    // Add input sanitization for forms
    document.addEventListener("submit", (e) => {
      const form = e.target;
      this.sanitizeFormData(form);
    });
  }

  static sanitizeFormData(form) {
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      // Basic XSS prevention
      input.value = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    });
  }

  static setupSecurityHeaders() {
    // These would be implemented server-side
    // Client-side awareness for development
    console.log("Security headers should include:");
    console.log("- X-Content-Type-Options: nosniff");
    console.log("- X-Frame-Options: DENY");
    console.log("- X-XSS-Protection: 1; mode=block");
    console.log("- Strict-Transport-Security: max-age=31536000");
  }
}
```

### Phase 5: Main Application Entry Point

```javascript
// assets/js/main.js
import { ThemeManager } from "./core/theme-manager.js";
import { I18n } from "./core/i18n.js";
import { SecurityManager } from "./core/security.js";

class PersonalWebsite {
  constructor() {
    this.init();
  }

  async init() {
    // Initialize security first
    SecurityManager.init();

    // Initialize theme system
    this.themeManager = new ThemeManager();

    // Initialize internationalization
    this.i18n = new I18n();

    // Initialize components
    this.initComponents();

    // Setup global event listeners
    this.setupGlobalListeners();
  }

  initComponents() {
    // Initialize navigation
    this.initNavigation();

    // Initialize form validation
    this.initForms();
  }

  initNavigation() {
    // Mobile navigation toggle
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.setAttribute(
          "aria-expanded",
          navToggle.getAttribute("aria-expanded") === "true" ? "false" : "true"
        );
      });
    }
  }

  initForms() {
    // Form validation and sanitization
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", this.handleFormSubmit);
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    // Add form validation logic
    const formData = new FormData(e.target);
    // Process form data securely
  }

  setupGlobalListeners() {
    // Listen for theme changes
    window.addEventListener("themeChanged", (e) => {
      console.log("Theme changed to:", e.detail);
    });

    // Listen for language changes
    window.addEventListener("languageChanged", (e) => {
      console.log("Language changed to:", e.detail);
    });
  }
}

// Initialize application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PersonalWebsite();
});
```

## Development Guidelines

### Accessibility Checklist

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management
- Alt text for images

### Security Checklist

- Input validation and sanitization
- XSS prevention
- CSP implementation
- Secure headers
- Form protection
- No mixed content

### i18n Preparation

- Text extraction ready
- RTL language support
- Date/number formatting considerations
- Cultural appropriateness
- Flexible layout for text expansion

### Performance Considerations

- Critical CSS inlining
- Lazy loading for images
- Minimal JavaScript footprint
- Efficient theme switching
- Cache strategies for translation files
