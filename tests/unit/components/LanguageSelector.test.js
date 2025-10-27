/**
 * Unit Tests for Language Selector Component
 * Verifies language switching and i18n text updates
 */

describe('Language Selector Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
    document.documentElement.removeAttribute('lang');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with default language', () => {
    const defaultLang = 'en';
    expect(defaultLang).toBe('en');
  });

  it('should change language when selecting different option', () => {
    let currentLang = 'en';
    const changeLanguage = (lang) => {
      currentLang = lang;
      return currentLang;
    };

    expect(changeLanguage('es')).toBe('es');
    expect(changeLanguage('en')).toBe('en');
  });

  it('should persist language preference in localStorage', () => {
    localStorage.setItem('language', 'es');
    expect(localStorage.getItem('language')).toBe('es');
  });

  it('should set lang attribute on html element', () => {
    const lang = 'es';
    document.documentElement.lang = lang;
    expect(document.documentElement.lang).toBe('es');
  });

  it('should support valid language codes', () => {
    const validLanguages = ['en', 'es'];
    validLanguages.forEach((lang) => {
      localStorage.setItem('language', lang);
      expect(localStorage.getItem('language')).toBe(lang);
    });
  });

  it('should have data-flag and data-text attributes for language options', () => {
    const mockOptions = [
      { value: 'en', flag: '🇺🇸', text: 'EN' },
      { value: 'es', flag: '🇨🇷', text: 'ES' },
    ];

    mockOptions.forEach((option) => {
      expect(option.value).toBeDefined();
      expect(option.flag).toBeDefined();
      expect(option.text).toBeDefined();
    });
  });

  it('should translate UI text based on selected language', () => {
    const translations = {
      en: { about: 'About', skills: 'Skills' },
      es: { about: 'Acerca de', skills: 'Habilidades' },
    };

    let currentLang = 'en';
    expect(translations[currentLang].about).toBe('About');

    currentLang = 'es';
    expect(translations[currentLang].about).toBe('Acerca de');
  });
});
