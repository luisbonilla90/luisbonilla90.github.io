# Personal Portfolio — Luis Bonilla

This repository contains a modern personal website built with Astro framework, featuring bilingual support (English/Spanish), theme switching, and optimized performance.

> **✅ Astro Migration Complete**: The site has been fully migrated to Astro on the `astro-migration` branch. See [`docs/migracion-astro-story.md`](docs/migracion-astro-story.md) for the migration story.

## Features

- ✅ **Astro Framework**: Modern static site generation with component-based architecture
- ✅ **Bilingual Support**: Switch between English and Spanish dynamically
- ✅ **Theme Switching**: Light, Dark, and Professional themes
- ✅ **Responsive Design**: Mobile-friendly layout with hamburger menu
- ✅ **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- ✅ **SEO Optimized**: Structured data, meta tags, and performance monitoring
- ✅ **Persistent Preferences**: Language and theme choices saved in localStorage
- ✅ **Core Web Vitals**: Integrated performance monitoring

## Project Structure

```
src/
├── components/          # Reusable Astro components
├── layouts/            # Page layouts
├── pages/              # Route pages
├── styles/             # CSS stylesheets
├── content/            # Content collections
└── core/               # Utility modules
public/                 # Static assets
docs/                   # Documentation
```

## 🌐 Multi-Language Routing

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Site will be available at http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

Open http://localhost:4321 in your browser.

## Development Workflow

### Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Cleanup and Maintenance

```bash
# Check for obsolete files
npm run cleanup

# Remove obsolete files automatically
node scripts/cleanup.js --remove
```

## Onboarding for New Developers

### 1. Environment Setup

1. Clone the repository: `git clone https://github.com/luisbonilla90/luisbonilla90.github.io.git`
2. Switch to astro-migration branch: `git checkout astro-migration`
3. Install dependencies: `npm install`
4. Start development: `npm run dev`

### 2. Understanding the Architecture

- **Components**: Located in `src/components/`, use `.astro` for static content, `.js/.ts` for client-side logic
- **Pages**: Routes in `src/pages/`, support dynamic routing with `[slug].astro`
- **Styles**: CSS in `src/styles/`, with theme variables in `base/variables.css`
- **Internationalization**: Translation files in `public/locales/`, managed by `src/core/i18n.js`
- **Themes**: Handled by `src/core/theme-manager.js`

### 3. Adding New Content

- **Pages**: Create new `.astro` files in `src/pages/`
- **Components**: Add to `src/components/` and import in layouts/pages
- **Translations**: Update `public/locales/en.json` and `es.json`
- **Styles**: Modify `src/styles/` files

### 4. Best Practices

- Use TypeScript for type safety
- Follow ESLint rules
- Write tests for new features
- Update documentation in `docs/`
- Commit with descriptive messages

### 5. Deployment

The site is configured for static deployment. Build with `npm run build` and deploy the `dist/` folder.

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check
```

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Hero.astro
│   │   ├── Skills.astro
│   │   └── seo/            # SEO components
│   ├── content/
│   │   └── blog/           # Blog posts (Markdown)
│   ├── layouts/
│   │   ├── BaseLayout.astro      # Main layout with header/footer
│   │   └── BlogPostLayout.astro  # Blog post layout
│   ├── pages/
│   │   ├── index.astro           # English homepage
│   │   ├── about.astro           # English about page
│   │   ├── portfolio.astro       # English portfolio
│   │   ├── contact.astro         # English contact
│   │   ├── blog/
│   │   │   ├── index.astro       # Blog listing
│   │   │   └── [...slug].astro   # Dynamic blog routes
│   │   └── es/                   # Spanish pages
│   │       ├── index.astro
│   │       ├── about.astro
│   │       ├── portfolio.astro
│   │       └── contact.astro
│   └── styles/             # Global styles
├── public/
│   ├── assets/             # Static assets
│   │   ├── js/             # Client-side JavaScript
│   │   ├── img/            # Images
│   │   └── css/            # Additional CSS
│   └── robots.txt
├── locales/
│   ├── en.json             # English translations
│   └── es.json             # Spanish translations
├── docs/                   # Documentation
└── astro.config.mjs        # Astro configuration
```

## 🎨 Theming System

The site includes four themes that can be switched dynamically:

1. **Light** - Clean, bright theme
2. **Dark** - Easy on the eyes
3. **Professional** - Business-oriented
4. **Cyberpunk** - Futuristic neon style

Theme preference is saved in `localStorage` and persists across sessions.

## 🌍 Adding a New Language

To add support for additional languages (e.g., French):

## Contributing

Create `locales/fr.json`:

```json
{
  "page_title": "Luis Bonilla - Ingénieur Logiciel",
  "header": {
    "site_title": "Luis Bonilla",
    "nav": {
      "about": "À propos",
      "skills": "Compétences",
      ...
    }
  }
}
```

### 2. Update Astro Configuration

Edit `astro.config.mjs`:

```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'], // Add 'fr'
  routing: {
    prefixDefaultLocale: false,
  },
}
```

### 3. Create Language Pages

Create `src/pages/fr/` directory and add translated pages:

- `src/pages/fr/index.astro`
- `src/pages/fr/about.astro`
- etc.

### 4. Update SEO Component

Update hreflang tags in affected pages to include the new language.

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Astro Quickstart](docs/astro-quickstart.md)** - Getting started with Astro
- **[Migration Notes](MIGRATION_NOTES.md)** - Component migration details
- **[Phase 3 Completion](docs/PHASE3-COMPLETION.md)** - SEO implementation
- **[Phase 4 Checklist](docs/PHASE4-ACCESSIBILITY-CHECKLIST.md)** - Accessibility & quality
- **[SEO Implementation](docs/SEO-IMPLEMENTATION.md)** - SEO features guide
- **[Testing Guide](docs/testing-guide.md)** - Testing procedures
- **[Project Architecture](docs/project-architecture.md)** - System design

## 🔧 Configuration

### Astro Configuration (`astro.config.mjs`)

Key features configured:

- Static site generation (SSG)
- i18n routing (en/es)
- Sitemap generation with i18n support
- GitHub Pages deployment

### Environment Setup

No environment variables required for basic functionality. Analytics and external services are configured in the code.

## 📊 SEO Features

- **Structured Data**: JSON-LD schemas for Person, Article, WebSite, FAQ
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Sitemap**: Auto-generated with i18n support
- **RSS Feed**: Blog syndication at `/rss.xml`
- **Robots.txt**: Configured for crawler access
- **Hreflang**: Multi-language SEO tags

## ♿ Accessibility

The site follows WCAG 2.1 AA guidelines:

- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Mobile touch target sizes

See [Phase 4 Accessibility Checklist](docs/PHASE4-ACCESSIBILITY-CHECKLIST.md) for testing procedures.

## 🚢 Deployment

### GitHub Pages

The site is configured for GitHub Pages deployment:

```bash
# Build the site
npm run build

# The dist/ folder contains the static site
# GitHub Pages will serve from this folder
```

### Configuration

- Site URL: `https://luisbonilla90.github.io`
- Base path: `/` (root)
- Build output: `dist/`

## 📈 Migration Status

| Phase   | Status      | Description                              |
| ------- | ----------- | ---------------------------------------- |
| Phase 1 | ✅ Complete | Project setup and base Astro structure   |
| Phase 2 | ✅ Complete | Component migration from HTML            |
| Phase 3 | ✅ Complete | SEO optimization and blog implementation |
| Phase 4 | ✅ Complete | i18n routing and accessibility           |

## 🤝 Contributing

This is a personal portfolio project. For suggestions or issues, please open an issue on GitHub.

## 📄 License

ISC License - See LICENSE file for details.

## 👤 Author

**Luis Bonilla Villalobos**

- Software Engineer & Technical Lead
- Location: San José, Costa Rica
- Email: lbonillav7@gmail.com
- GitHub: [@luisbonilla90](https://github.com/luisbonilla90)
- LinkedIn: [luisbonilla90](https://linkedin.com/in/luisbonilla90)

---

**Built with:** Astro, TypeScript, JavaScript (ES6+)  
**Last Updated:** October 2025  
**Version:** 1.0.0
