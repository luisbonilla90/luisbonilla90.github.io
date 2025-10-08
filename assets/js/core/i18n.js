/**
 * Internationalization (i18n) Module
 * Single Responsibility: Manage language selection and content translation
 * Clean Code: Clear separation of concerns, descriptive method names
 */

// Constants
const STORAGE_KEY = 'language';
const SUPPORTED_LANGUAGES = ['en', 'es'];
const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_SELECT_ID = 'language-select';

export class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem(STORAGE_KEY) || this.detectDefaultLanguage();
    this.translations = {};
    this.supportedLanguages = SUPPORTED_LANGUAGES;
    this.init();
  }

  /**
   * Detect default language from browser or fall back to 'en'
   */
  detectDefaultLanguage() {
    try {
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang) {
        // Extract language code (e.g., 'es' from 'es-MX')
        const langCode = browserLang.split('-')[0].toLowerCase();
        return this.supportedLanguages.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
      }
    } catch (error) {
      console.error('Error detecting browser language:', error);
    }
    return DEFAULT_LANGUAGE;
  }

  /**
   * Initialize the i18n system
   */
  async init() {
    try {
      await this.loadTranslations(this.currentLanguage);
      this.applyTranslations();
      this.setupEventListeners();
      this.updateLanguageSelector();
      console.log('i18n initialized with language:', this.currentLanguage);
    } catch (error) {
      console.error('Failed to initialize i18n:', error);
    }
  }

  /**
   * Load translation file for specified language
   */
  async loadTranslations(lang) {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}`);
      }
      this.translations = await response.json();
    } catch (error) {
      console.error('Failed to load translations:', error);
      // Fall back to English if available
      if (lang !== 'en') {
        console.log('Falling back to English translations');
        const response = await fetch('/locales/en.json');
        this.translations = await response.json();
        this.currentLanguage = 'en';
      }
    }
  }

  /**
   * Apply translations to all elements with data-i18n attributes
   */
  applyTranslations() {
    // Update regular text content
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getNestedTranslation(key);
      
      if (translation) {
        if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
          element.placeholder = translation;
        } else if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
          element.setAttribute('content', translation);
        } else if (element.tagName === 'TITLE') {
          element.textContent = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update aria-label attributes
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
      const key = element.getAttribute('data-i18n-aria-label');
      const translation = this.getNestedTranslation(key);
      
      if (translation) {
        element.setAttribute('aria-label', translation);
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;
  }

  /**
   * Get nested translation value from key (e.g., 'hero.title')
   */
  getNestedTranslation(key) {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return null;
      }
    }
    
    return value;
  }

  /**
   * Change language and reload translations
   */
  async changeLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.error(`Language ${lang} is not supported`);
      return;
    }

    this.currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    
    await this.loadTranslations(lang);
    this.applyTranslations();
    this.updateLanguageSelector();

    // Dispatch language change event
    window.dispatchEvent(
      new CustomEvent('languageChanged', { detail: { language: lang } })
    );
  }

  /**
   * Update language selector UI to reflect current language
   */
  updateLanguageSelector() {
    const selector = document.getElementById(LANGUAGE_SELECT_ID);
    if (selector && selector.value !== this.currentLanguage) {
      selector.value = this.currentLanguage;
    }
  }

  /**
   * Setup event listeners for language selector
   */
  setupEventListeners() {
    const selector = document.getElementById(LANGUAGE_SELECT_ID);
    if (selector) {
      selector.addEventListener('change', (e) => {
        this.changeLanguage(e.target.value);
      });
    } else {
      console.warn('Language selector not found in DOM');
    }
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages() {
    return [...this.supportedLanguages];
  }
}
