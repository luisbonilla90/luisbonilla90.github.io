# Personal Portfolio — Starter

This repository contains a minimal themeable personal website scaffold with bilingual support (English/Spanish).

Structure created:

- `index.html` — site entry
- `assets/css/main.css` — main styles
- `assets/css/base/variables.css` — theme variables
- `assets/js/main.js` — app entry (ES modules)
- `assets/js/core/theme-manager.js` — theme switching utility
- `assets/js/core/i18n.js` — internationalization module
- `locales/en.json`, `locales/es.json` — translation files
- `docs/project-architecture.md` — project architecture and plan (renamed from plan.md)

## Features

- ✅ **Bilingual Support**: Switch between English and Spanish dynamically
- ✅ **Theme Switching**: Light, Dark, and Professional themes
- ✅ **Responsive Design**: Mobile-friendly layout with hamburger menu
- ✅ **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- ✅ **Persistent Preferences**: Language and theme choices saved in localStorage
- ✅ **STAR Format Experiences**: Professional experiences structured with Situation, Task, Action, Result
- ✅ **Dynamic Content**: JSON-based data structure for experiences, portfolio, and blog
- ✅ **Analytics Dashboard**: Private dashboard with metrics and gamification badges
- ✅ **SEO Optimized**: JSON-LD structured data for better search engine understanding

## How to Run Locally

Serve the folder with a static server, for example:

```bash
# Python 3
python3 -m http.server 8000

# or using Node.js
npx http-server -c-1
```

Open http://localhost:8000 in your browser.

### Running Tests

To validate the STAR format data structure:

```bash
npm test
# or directly:
node assets/js/tests/star-format-validator.js
```

### Accessing the Analytics Dashboard

Navigate to http://localhost:8000/dashboard.html

Default password: `password`

**Note**: For production use, implement proper authentication with a backend service.

## How to Add a New Language

The internationalization system makes it easy to add new languages:

### 1. Create Translation File

Create a new JSON file in the `locales/` directory (e.g., `locales/fr.json` for French):

```json
{
  "page_title": "Your Translated Title",
  "meta_description": "Your translated description",
  "header": {
    "site_title": "Site Title",
    "nav": {
      "about": "About",
      "skills": "Skills",
      ...
    }
  }
  ...
}
```

Use `locales/en.json` as a reference for the complete structure.

## Data Structure

The site uses JSON files for dynamic content:

### Experiences (STAR Format)
- `data/experiences/experiences-en.json` - English experiences
- `data/experiences/experiences-es.json` - Spanish experiences

Each experience includes:
- Summary for quick overview
- STAR format (Situation, Task, Action, Result) for detailed breakdown
- Highlights and technologies used
- Period and company information

### Portfolio Projects
- `data/portfolio/projects-en.json` - English projects
- `data/portfolio/projects-es.json` - Spanish projects

### Blog Posts
- `data/blog/posts-en.json` - English posts
- `data/blog/posts-es.json` - Spanish posts

See `docs/dynamic-content-features.md` for detailed documentation on data structures and usage.

### 2. Update Supported Languages

Edit `assets/js/core/i18n.js` and add your language code to the `supportedLanguages` array:

```javascript
this.supportedLanguages = ['en', 'es', 'fr']; // Added French
```

### 3. Add Language Option

Edit `index.html` and add a new option to the language selector:

```html
<select id="language-select" aria-label="Select language">
  <option value="en">English</option>
  <option value="es">Español</option>
  <option value="fr">Français</option>
</select>
```

### 4. Test

1. Refresh the page
2. Select your new language from the dropdown
3. Verify all content is translated correctly

## Translation Structure

All text content uses the `data-i18n` attribute system:

- **Text content**: `<element data-i18n="key.path">Default Text</element>`
- **ARIA labels**: `<element data-i18n-aria-label="key.path" aria-label="Default">`
- **Placeholders**: `<input data-i18n="key.path" placeholder="Default">`

The translation keys use dot notation (e.g., `header.nav.about`) to access nested values in the JSON files.

## Next Steps

- Add actual content to `index.html`
- Implement components and enhance styles
- Add accessibility checks and SEO metadata per `docs/project-architecture.md`
- Build portfolio and blog UI components to render from JSON data
- Integrate analytics dashboard with real Pirsch API data
- Add search and filter functionality for experiences, projects, and posts
