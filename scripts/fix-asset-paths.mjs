#!/usr/bin/env node

/**
 * Post-build script to fix asset paths in HTML files
 * Converts absolute paths (/assets/...) to relative paths (assets/...)
 * and fixes CSS file names with underscores
 */

console.warn('🔧 Fixing asset paths in HTML files...');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const docsDir = path.join(__dirname, '..', 'docs');

function fixAssetPaths(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      fixAssetPaths(fullPath);
    } else if (stat.isFile() && item.endsWith('.html')) {
      // Read HTML file
      let content = fs.readFileSync(fullPath, 'utf-8');
      let modified = false;

      // Fix CSS path: convert /assets/css/_slug_-*.css to assets/css/slug_-*.css
      const cssRegex = /href="\/assets\/css\/_slug_-([^"]*\.css)"/g;
      if (cssRegex.test(content)) {
        content = content.replace(cssRegex, 'href="assets/css/slug_-$1"');
        modified = true;
        console.warn(`  ✓ Fixed CSS paths in ${item}`);
      }

      // Fix JS paths: convert /assets/js/ to assets/js/
      const jsRegex = /src="\/assets\/js\/([^"]*)"/g;
      if (jsRegex.test(content)) {
        content = content.replace(jsRegex, 'src="assets/js/$1"');
        modified = true;
        console.warn(`  ✓ Fixed JS paths in ${item}`);
      }

      // Fix general asset paths: convert /assets/ to assets/
      const assetRegex = /href="\/assets\/([^"]*)"/g;
      if (assetRegex.test(content)) {
        content = content.replace(assetRegex, 'href="assets/$1"');
        modified = true;
        console.warn(`  ✓ Fixed general asset paths in ${item}`);
      }

      // Write back if modified
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf-8');
      }
    }
  }
}

fixAssetPaths(docsDir);
console.warn('✅ Asset path fixing complete!');
