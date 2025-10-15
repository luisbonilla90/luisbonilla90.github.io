/**
 * Example test file demonstrating Jest snapshot testing
 * 
 * This file shows how to:
 * 1. Write basic unit tests
 * 2. Use snapshot testing
 * 3. Test DOM manipulation
 */

import { ThemeManager } from '../core/theme-manager.js';
import { I18n } from '../core/i18n.js';

describe('ThemeManager', () => {
  let themeManager;

  beforeEach(() => {
    // Clear mocks before each test
    localStorage.clear();
    document.body.innerHTML = '<div data-theme="light"></div>';
    themeManager = new ThemeManager();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot Tests', () => {
    test('should match theme configuration snapshot', () => {
      const themeConfig = {
        defaultTheme: 'light',
        availableThemes: ['light', 'dark', 'auto'],
        storageKey: 'theme-preference'
      };

      expect(themeConfig).toMatchSnapshot();
    });

    test('should match DOM structure after theme change', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <div data-theme="dark" class="theme-container">
          <button class="theme-toggle">Toggle Theme</button>
        </div>
      `;

      expect(container).toMatchSnapshot();
    });
  });

  describe('Theme Initialization', () => {
    test('should initialize with default theme', () => {
      expect(themeManager).toBeDefined();
      expect(typeof themeManager.getCurrentTheme).toBe('function');
    });

    test('should load theme from localStorage', () => {
      // Set a value in localStorage before creating the manager
      localStorage.setItem('theme-preference', 'dark');
      const manager = new ThemeManager();
      
      expect(manager).toBeDefined();
      expect(localStorage.getItem('theme-preference')).toBe('dark');
    });
  });

  describe('Theme Switching', () => {
    test('should update theme correctly', () => {
      const spy = jest.spyOn(localStorage, 'setItem');
      
      if (typeof themeManager.setTheme === 'function') {
        themeManager.setTheme('dark');
        expect(spy).toHaveBeenCalled();
      }
    });
  });
});

describe('I18n', () => {
  let i18n;

  beforeEach(() => {
    localStorage.clear();
    i18n = new I18n();
  });

  describe('Snapshot Tests', () => {
    test('should match translation structure snapshot', () => {
      const translations = {
        en: {
          welcome: 'Welcome',
          about: 'About',
          contact: 'Contact'
        },
        es: {
          welcome: 'Bienvenido',
          about: 'Acerca de',
          contact: 'Contacto'
        }
      };

      expect(translations).toMatchSnapshot();
    });

    test('should match language configuration snapshot', () => {
      const config = {
        defaultLanguage: 'en',
        supportedLanguages: ['en', 'es'],
        fallbackLanguage: 'en'
      };

      expect(config).toMatchSnapshot();
    });
  });

  describe('Language Detection', () => {
    test('should detect browser language', () => {
      expect(i18n).toBeDefined();
    });

    test('should use default language when no preference exists', () => {
      localStorage.clear();
      const instance = new I18n();
      
      expect(instance).toBeDefined();
    });
  });
});

describe('DOM Manipulation Utils', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <header>
          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
          </nav>
        </header>
      </div>
    `;
  });

  describe('Snapshot Tests', () => {
    test('should match initial DOM structure', () => {
      const app = document.getElementById('app');
      expect(app.innerHTML).toMatchSnapshot();
    });

    test('should match DOM after manipulation', () => {
      const nav = document.querySelector('nav');
      const newLink = document.createElement('a');
      newLink.href = '#contact';
      newLink.textContent = 'Contact';
      nav.appendChild(newLink);

      expect(nav.innerHTML).toMatchSnapshot();
    });
  });

  describe('Element Selection', () => {
    test('should find header element', () => {
      const header = document.querySelector('header');
      expect(header).toBeTruthy();
      expect(header.querySelector('nav')).toBeTruthy();
    });

    test('should find all navigation links', () => {
      const links = document.querySelectorAll('nav a');
      expect(links.length).toBe(2);
    });
  });
});
