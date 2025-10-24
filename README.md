# Personal Portfolio — Astro Version

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

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

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

## How to Add a New Language

1. Create a new JSON file in `public/locales/` (e.g., `fr.json`)
2. Update `src/core/i18n.js` to include the new language
3. Add option to language selector in `src/components/LanguageSelector.astro`
4. Test translations across all components

## Contributing

1. Create a feature branch from `astro-migration`
2. Make changes following the development workflow
3. Run tests and linting
4. Submit a pull request with detailed description

## Documentation

- [`docs/migracion-astro-story.md`](docs/migracion-astro-story.md) - Migration story
- [`docs/project-architecture.md`](docs/project-architecture.md) - Architecture overview
- [`docs/testing-guide.md`](docs/testing-guide.md) - Testing guidelines
- [`docs/astro-quickstart.md`](docs/astro-quickstart.md) - Astro setup guide
