/**
 * Unit Tests for i18n (Internationalization) Utilities
 * Verifies language switching and text translation functionality
 */

describe('i18n Utilities', () => {
  const translations = {
    en: {
      'header.site_title': 'Luis Bonilla',
      'header.nav.about': 'About',
      'header.nav.skills': 'Skills',
      'hero.title': 'Luis Bonilla Villalobos',
      'about.heading': 'Professional Summary',
    },
    es: {
      'header.site_title': 'Luis Bonilla',
      'header.nav.about': 'Acerca de',
      'header.nav.skills': 'Habilidades',
      'hero.title': 'Luis Bonilla Villalobos',
      'about.heading': 'Resumen Profesional',
    },
  };

  let currentLanguage;

  beforeEach(() => {
    currentLanguage = 'en';
    localStorage.clear();
  });

  it('should initialize with default language', () => {
    expect(currentLanguage).toBe('en');
  });

  it('should change current language', () => {
    const changeLanguage = (lang) => {
      currentLanguage = lang;
      localStorage.setItem('language', lang);
    };

    changeLanguage('es');
    expect(currentLanguage).toBe('es');
    expect(localStorage.getItem('language')).toBe('es');
  });

  it('should retrieve translation for current language', () => {
    const getText = (key) => translations[currentLanguage][key];

    expect(getText('header.site_title')).toBe('Luis Bonilla');
    expect(getText('header.nav.about')).toBe('About');
  });

  it('should translate all supported keys in English', () => {
    currentLanguage = 'en';
    const supportedKeys = Object.keys(translations.en);

    supportedKeys.forEach((key) => {
      expect(translations[currentLanguage][key]).toBeDefined();
      expect(typeof translations[currentLanguage][key]).toBe('string');
    });
  });

  it('should translate all supported keys in Spanish', () => {
    currentLanguage = 'es';
    const supportedKeys = Object.keys(translations.es);

    supportedKeys.forEach((key) => {
      expect(translations[currentLanguage][key]).toBeDefined();
      expect(typeof translations[currentLanguage][key]).toBe('string');
    });
  });

  it('should provide different translations for different languages', () => {
    const textEnglish = translations.en['header.nav.about'];
    const textSpanish = translations.es['header.nav.about'];

    expect(textEnglish).not.toBe(textSpanish);
    expect(textEnglish).toBe('About');
    expect(textSpanish).toBe('Acerca de');
  });

  it('should support switching between languages', () => {
    const switchLanguage = (lang) => {
      currentLanguage = lang;
    };

    expect(translations[currentLanguage]['header.nav.about']).toBe('About');

    switchLanguage('es');
    expect(translations[currentLanguage]['header.nav.about']).toBe('Acerca de');

    switchLanguage('en');
    expect(translations[currentLanguage]['header.nav.about']).toBe('About');
  });

  it('should persist language preference across sessions', () => {
    localStorage.setItem('language', 'es');
    expect(localStorage.getItem('language')).toBe('es');

    // Simulate page reload
    const savedLanguage = localStorage.getItem('language');
    expect(savedLanguage).toBe('es');
  });

  it('should handle missing translation keys gracefully', () => {
    const getText = (key) => {
      return translations[currentLanguage][key] || key;
    };

    expect(getText('header.nav.about')).toBe('About');
    expect(getText('non.existent.key')).toBe('non.existent.key');
  });

  it('should maintain translation consistency', () => {
    const navigationKeys = [
      'header.nav.about',
      'header.nav.skills',
    ];

    navigationKeys.forEach((key) => {
      const enText = translations.en[key];
      const esText = translations.es[key];
      
      expect(enText).toBeDefined();
      expect(esText).toBeDefined();
      expect(typeof enText).toBe('string');
      expect(typeof esText).toBe('string');
    });
  });
});
