/**
 * Application Entry Point
 * Single Responsibility: Initialize and wire up application components
 * Clean Code: Descriptive function names, clear separation of concerns
 */

import { ThemeManager } from "./core/theme-manager.js";
import { ResumeDownloader } from "./components/resume-downloader.js";
import { MobileMenu } from "./components/mobile-menu.js";

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
        await resumeDownloader.downloadResume(downloadButton);
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
 * Main application initialization
 */
function initializeApplication() {
  console.log('Initializing portfolio application...');

  // Initialize core components
  initializeCopyrightYear();
  const themeManager = initializeThemeManager();
  const resumeDownloader = initializeResumeDownloader();
  const mobileMenu = initializeMobileMenu();

  // Store references for potential cleanup or debugging
  window.portfolioApp = {
    themeManager,
    resumeDownloader,
    mobileMenu,
    version: '2.1.0' // Added mobile menu with sticky header behavior
  };

  console.log('Portfolio application initialized successfully');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApplication);
