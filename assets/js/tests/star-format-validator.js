/**
 * Tests for STAR Format Experience Data
 * Validates that each experience has proper STAR structure
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test suite
class STARFormatValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passedTests = 0;
    this.failedTests = 0;
  }

  /**
   * Validate a single experience object
   */
  validateExperience(experience, index, language) {
    const prefix = `[${language}] Experience #${index} (${experience.id})`;
    
    // Required fields
    const requiredFields = ['id', 'title', 'company', 'location', 'period', 'summary', 'star', 'highlights', 'technologies'];
    for (const field of requiredFields) {
      if (!(field in experience)) {
        this.errors.push(`${prefix}: Missing required field '${field}'`);
        this.failedTests++;
      } else {
        this.passedTests++;
      }
    }

    // Validate period structure
    if (experience.period) {
      if (!experience.period.start || !experience.period.end) {
        this.errors.push(`${prefix}: Period must have 'start' and 'end' fields`);
        this.failedTests++;
      } else {
        this.passedTests++;
      }
    }

    // Validate STAR structure
    if (experience.star) {
      const starFields = ['situation', 'task', 'action', 'result'];
      for (const field of starFields) {
        if (!experience.star[field]) {
          this.errors.push(`${prefix}: STAR missing field '${field}'`);
          this.failedTests++;
        } else if (typeof experience.star[field] !== 'string' || experience.star[field].trim().length === 0) {
          this.errors.push(`${prefix}: STAR field '${field}' must be a non-empty string`);
          this.failedTests++;
        } else {
          this.passedTests++;
        }
      }
    } else {
      this.errors.push(`${prefix}: Missing STAR object`);
      this.failedTests++;
    }

    // Validate summary
    if (!experience.summary || typeof experience.summary !== 'string' || experience.summary.trim().length === 0) {
      this.errors.push(`${prefix}: Summary must be a non-empty string`);
      this.failedTests++;
    } else {
      this.passedTests++;
    }

    // Validate highlights array
    if (!Array.isArray(experience.highlights) || experience.highlights.length === 0) {
      this.errors.push(`${prefix}: Highlights must be a non-empty array`);
      this.failedTests++;
    } else {
      this.passedTests++;
    }

    // Validate technologies array
    if (!Array.isArray(experience.technologies) || experience.technologies.length === 0) {
      this.warnings.push(`${prefix}: Technologies should be a non-empty array`);
    }
  }

  /**
   * Load and validate experiences file
   */
  async validateFile(filePath, language) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(content);

      if (!data.experiences || !Array.isArray(data.experiences)) {
        this.errors.push(`[${language}] File must have 'experiences' array at root level`);
        this.failedTests++;
        return;
      }

      if (data.experiences.length === 0) {
        this.warnings.push(`[${language}] Experiences array is empty`);
      }

      data.experiences.forEach((exp, index) => {
        this.validateExperience(exp, index, language);
      });

      console.log(`✓ Validated ${data.experiences.length} experiences from ${language} file`);
    } catch (error) {
      this.errors.push(`[${language}] Failed to load or parse file: ${error.message}`);
      this.failedTests++;
    }
  }

  /**
   * Run all validation tests
   */
  async runTests() {
    console.log('🧪 Running STAR Format Validation Tests...\n');

    const dataDir = join(__dirname, '../../../data/experiences');
    const languages = ['en', 'es'];

    for (const lang of languages) {
      const filePath = join(dataDir, `experiences-${lang}.json`);
      await this.validateFile(filePath, lang);
    }

    // Print results
    console.log('\n📊 Test Results:');
    console.log('================');
    console.log(`✅ Passed: ${this.passedTests}`);
    console.log(`❌ Failed: ${this.failedTests}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);

    if (this.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.errors.forEach(err => console.log(`  - ${err}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.warnings.forEach(warn => console.log(`  - ${warn}`));
    }

    if (this.failedTests === 0 && this.errors.length === 0) {
      console.log('\n✅ All tests passed! STAR format is valid.');
      return 0;
    } else {
      console.log('\n❌ Some tests failed. Please fix the issues above.');
      return 1;
    }
  }
}

// Run tests if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new STARFormatValidator();
  validator.runTests().then(exitCode => {
    process.exit(exitCode);
  });
}

export { STARFormatValidator };
