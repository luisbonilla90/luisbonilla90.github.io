/**
 * Application Entry Point
 * Single Responsibility: Initialize and wire up application components
 * Clean Code: Descriptive function names, clear separation of concerns
 */

import { ThemeManager } from "./core/theme-manager.js";
import { ResumeDownloader } from "./components/resume-downloader.js";
import { MobileMenu } from "./components/mobile-menu.js";
import { BackToTop } from "./components/back-to-top.js";
import { I18n } from "./core/i18n.js";
import { ExperienceManager } from "./components/experience-manager.js";
import { LANGUAGE_SELECT_ID } from './core/constants.js';

/**
 * Initialize copyright year in footer
 */
function initializeCopyrightYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }
}

/**
 * Initialize theme management system
 */
function initializeThemeManager() {
  try {
    const themeManager = new ThemeManager();
    
    // Listen for theme changes if needed for analytics or other features
    window.addEventListener('themeChanged', (event) => {
      console.log('Theme changed to:', event.detail.theme);
    });

    return themeManager;
  } catch (error) {
    console.error('Failed to initialize theme manager:', error);
    return null;
  }
}

/**
 * Initialize resume download functionality
 */
function initializeResumeDownloader() {
  try {
    const resumeDownloader = new ResumeDownloader();
    const downloadButton = document.getElementById('download-resume-btn');
    
    if (downloadButton) {
      downloadButton.addEventListener('click', async (event) => {
        event.preventDefault();
        // Use detected browser language from global app state if available
        const lang = (window.portfolioApp && window.portfolioApp.browserLanguage) ? window.portfolioApp.browserLanguage : null;
        await resumeDownloader.downloadResume(downloadButton, lang);
      });
      
      console.log('Resume downloader initialized successfully');
    } else {
      console.warn('Download resume button not found');
    }

    return resumeDownloader;
  } catch (error) {
    console.error('Failed to initialize resume downloader:', error);
    return null;
  }
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
  try {
    const mobileMenu = new MobileMenu();
    console.log('Mobile menu initialized successfully');
    return mobileMenu;
  } catch (error) {
    console.error('Failed to initialize mobile menu:', error);
    return null;
  }
}

/**
 * Initialize experience manager with STAR format
 */
function initializeExperienceManager() {
  try {
    const experienceManager = new ExperienceManager();
    experienceManager.init();
    console.log('Experience manager initialized successfully');
    return experienceManager;
  } catch (error) {
    console.error('Failed to initialize experience manager:', error);
  }
}

/**
 * Initialize back to top button functionality
 */
function initializeBackToTop() {
  try {
    const backToTop = new BackToTop();
    console.log('Back to top button initialized successfully');
    return backToTop;
  } catch (error) {
    console.error('Failed to initialize back to top button:', error);
    return null;
  }
}

/**
 * Initialize internationalization (i18n) system
 */
function initializeI18n() {
  try {
    const i18n = new I18n();
    
    // Listen for language changes if needed for analytics or other features
    window.addEventListener('languageChanged', (event) => {
      console.log('Language changed to:', event.detail.language);
    });

    return i18n;
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    return null;
  }
}

/**
 * Detect the user's browser language(s) and return a normalized BCP47-like code.
 * Prioritizes `navigator.languages` (array) then `navigator.language`.
 * Emits a custom event `browserLanguageDetected` on window with detail { language }
 */
function detectBrowserLanguage() {
  try {
    let lang = null;

    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      lang = navigator.languages[0];
    } else if (navigator.language) {
      lang = navigator.language;
    } else if (navigator.userLanguage) {
      // IE fallback
      lang = navigator.userLanguage;
    }

    if (!lang) return null;

    // Normalize: lower-case or language-region in canonical form (e.g., en-US)
    // Some browsers return values like 'en-US' or 'es-419'. We'll normalize casing.
    const parts = String(lang).split(/[-_]/);
    const normalized = parts
      .map((p, i) => (i === 0 ? p.toLowerCase() : p.toUpperCase()))
      .join('-');

    // Dispatch custom event for other parts of the app to listen
    // Prefer modern CustomEvent; fallback to old Event + detail assignment
    if (typeof CustomEvent === 'function') {
      const event = new CustomEvent('browserLanguageDetected', { detail: { language: normalized } });
      window.dispatchEvent(event);
    } else {
      // Older browsers: create generic Event and attach detail
      const evt = document.createEvent('Event');
      evt.initEvent('browserLanguageDetected', true, true);
      // Attach detail payload
      try {
        evt.detail = { language: normalized };
      } catch (err) {
        // Some environments may not allow adding properties - ignore safely
      }
      window.dispatchEvent(evt);
    }

    return normalized;
  } catch (error) {
    console.error('Error detecting browser language:', error);
    return null;
  }
}

/**
 * Main application initialization
 */
function initializeApplication() {
  console.log('Initializing portfolio application...');

  // Initialize core components
  initializeCopyrightYear();
  const themeManager = initializeThemeManager();
  const i18n = initializeI18n();
  const resumeDownloader = initializeResumeDownloader();
  const mobileMenu = initializeMobileMenu();
  const experienceManager = initializeExperienceManager();
  const backToTop = initializeBackToTop();
  // Ensure the language-select pseudo-element has the right text
  const languageSelect = document.getElementById(LANGUAGE_SELECT_ID);
  if (languageSelect) {
    const setCurrentText = () => {
      const opt = languageSelect.options[languageSelect.selectedIndex];
      if (opt && opt.dataset && opt.dataset.text) {
        languageSelect.dataset.currentText = opt.dataset.text;
      }
    };
    // Initialize
    setCurrentText();
    // Update when user changes selection
    languageSelect.addEventListener('change', () => {
      setCurrentText();
    });
    
    // Add data-text after flag for desktop (no mobile) - runs once on load
    const isDesktop = window.matchMedia('(min-width: 481px)').matches;
    if (isDesktop) {
      Array.from(languageSelect.options).forEach(opt => {
        const flag = opt.textContent.trim();
        const text = opt.dataset.text;
        if (flag && text && !opt.textContent.includes(text)) {
          opt.textContent = `${flag} ${text}`;
        }
      });
    }
  }

  // Store references for potential cleanup or debugging
  window.portfolioApp = {
    themeManager,
    i18n,
    resumeDownloader,
    mobileMenu,
    experienceManager,
    backToTop,
    version: '3.0.0', // Added i18n support with language selector
    detectBrowserLanguage // expose helper
  };

  // Detect language immediately and store result for quick access
  const detectedLang = detectBrowserLanguage();
  if (detectedLang) {
    window.portfolioApp.browserLanguage = detectedLang;
    console.log('Detected browser language:', detectedLang);
  }

  console.log('Portfolio application initialized successfully');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApplication);
