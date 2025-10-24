#!/usr/bin/env node

/**
 * Cleanup script for Astro migration
 * Detects and removes obsolete files from the legacy site
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');

// Files and directories to check for removal
const obsoletePaths = [
  'index.html', // Legacy HTML file
  'assets',     // Legacy assets
  'js',         // Legacy JS
  'locales'     // Legacy locales (duplicated in public/)
];

console.warn('🔍 Scanning for obsolete files...\n');

obsoletePaths.forEach(relativePath => {
  const fullPath = path.join(rootDir, relativePath);

  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      console.warn(`📁 Found obsolete directory: ${relativePath}`);
      // In a real scenario, you might want to prompt or auto-remove
      // For now, just log
    } else {
      console.warn(`📄 Found obsolete file: ${relativePath}`);
    }
  } else {
    console.warn(`✅ ${relativePath} already removed`);
  }
});

console.warn('\n✨ Cleanup scan complete.');
console.warn('Run with --remove flag to automatically delete found files.');

// If --remove flag is passed, remove the files
if (process.argv.includes('--remove')) {
  console.warn('\n🗑️  Removing obsolete files...');
  obsoletePaths.forEach(relativePath => {
    const fullPath = path.join(rootDir, relativePath);
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.warn(`🗑️  Removed: ${relativePath}`);
    }
  });
  console.warn('\n✅ Cleanup complete!');
}