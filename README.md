# Personal Portfolio — Starter

This repository contains a minimal themeable personal website scaffold.

Structure created:

- `index.html` — site entry
- `assets/css/main.css` — main styles
- `assets/css/base/variables.css` — theme variables
- `assets/js/main.js` — app entry (ES modules)
- `assets/js/core/theme-manager.js` — theme switching utility
- `locales/en.json`, `locales/es.json` — basic i18n files
- `docs/project-architecture.md` — project architecture and plan (renamed from plan.md)

How to run locally:

Serve the folder with a static server, for example:

```bash
# Python 3
python3 -m http.server 8000

# or using Node.js
npx http-server -c-1
```

Open http://localhost:8000 in your browser.

Next steps:
- Add actual content to `index.html`
- Implement components and enhance styles
- Add accessibility checks and SEO metadata per `docs/project-architecture.md`
