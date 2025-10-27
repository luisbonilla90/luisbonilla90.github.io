#!/usr/bin/env node

/**
 * Post-build script to rename assets that start with underscore
 * This ensures no assets begin with "_" as required
 */

console.warn('🔄 Renaming assets that start with underscore...');

import fs from 'fs';
import path from 'path';

const docsDir = path.join(__dirname, '..', 'docs');

function renameUnderscoreFiles(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      renameUnderscoreFiles(fullPath);
    } else if (stat.isFile() && item.startsWith('_')) {
      // Rename file by removing the underscore prefix
      const newName = item.substring(1);
      const newPath = path.join(dir, newName);

      console.warn(`Renaming: ${item} -> ${newName}`);
      fs.renameSync(fullPath, newPath);
    }
  }
}

renameUnderscoreFiles(docsDir);
console.warn('✅ Asset renaming complete!');