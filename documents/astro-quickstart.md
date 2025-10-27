# Astro Migration - Quick Start Guide

## Setup Commands

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

## File Structure Quick Reference

```
Key Directories:
├── src/pages/          ← Add .astro files here (become routes)
├── src/styles/         ← CSS files (imported in components)
├── public/             ← Static assets (served as-is)
│   ├── assets/         ← Original CSS, JS, images
│   └── locales/        ← Translation JSON files
└── dist/               ← Build output (don't commit)
```

## Creating a New Page

1. Create file: `src/pages/about.astro`
2. Add frontmatter and HTML:

```astro
---
const title = "About";
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>{title}</title>
    <link rel="stylesheet" href="/assets/css/main.css" />
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

3. Access at: `/about`

## Using CSS

### Option 1: Link from public/

```astro
<link rel="stylesheet" href="/assets/css/main.css" />
```

### Option 2: Import from src/styles/

```astro
---
import '../styles/main.css';
---
```

## Accessing Locales

Locales are in `public/locales/`:

- `/locales/en.json`
- `/locales/es.json`

Fetch in Astro components:

```astro
---
const response = await fetch('/locales/en.json');
const translations = await response.json();
---
```

## i18n Configuration

Configured in `astro.config.mjs`:

- Default locale: `en`
- Supported: `en`, `es`
- No prefix for default locale

## Theme Support

CSS variables for themes in `src/styles/base/variables.css`:

- Light theme: default `:root`
- Dark theme: `[data-theme="dark"]`
- Professional: `[data-theme="professional"]`

## Common Commands

```bash
# Add a new package
npm install package-name

# Run Astro CLI
npm run astro -- [command]

# Check for type errors
npm run build
```

## Important Notes

- ✅ Original files preserved (assets/, locales/, index.html)
- ✅ Assets duplicated in public/ for easy access
- ✅ CSS variables work without changes
- ⚠️ JavaScript modules need adaptation for Astro
- ⚠️ Client scripts need `client:*` directives

## Phase 1 Status

✅ **Completed:**

- Branch created
- Astro initialized
- Assets migrated
- Locales migrated
- CSS validated
- Build working

📋 **Next Phase:**

- Component migration
- i18n integration
- JavaScript adaptation
- Content migration
