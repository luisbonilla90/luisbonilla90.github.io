import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Static site generation (no adapter needed for static builds)
  output: 'static',
  
  // Base configuration for GitHub Pages
  site: 'https://luisbonilla90.github.io',
  
  // Build configuration
  build: {
    assets: 'assets',
  },
  
  // i18n configuration for bilingual support
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
