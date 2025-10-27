import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Static site generation (no adapter needed for static builds)
  output: 'static',
  
  // Base configuration for GitHub Pages
  site: 'https://luisbonilla90.github.io',
  
  // Build configuration - output to /docs instead of /dist
  outDir: './docs',
  build: {
    assets: 'assets',
    assetsPrefix: '',
  },
  
  // Disable trailing slash to maintain clean URLs
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  
  // Vite configuration for asset naming
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Prevent underscore prefix on auto-generated chunks
          chunkFileNames: (chunkInfo) => {
            // Remove underscore prefix from chunk names
            const name = chunkInfo.name.startsWith('_') ? chunkInfo.name.slice(1) : chunkInfo.name;
            return `assets/js/${name}-[hash].js`;
          },
          entryFileNames: (chunkInfo) => {
            // Remove underscore prefix from entry names
            const name = chunkInfo.name.startsWith('_') ? chunkInfo.name.slice(1) : chunkInfo.name;
            return `assets/js/${name}-[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo?.names?.[0] || 'asset';
            // Remove underscore prefix from asset names
            const cleanName = fileName.startsWith('_') ? fileName.slice(1) : fileName;
            const info = cleanName.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|gif|svg/.test(ext)) {
              return `assets/img/[name]-[hash][extname]`;
            } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            } else if (ext === 'css') {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      },
    },
  },
  
  // SEO integrations
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
        },
      },
    }),
  ],
});
