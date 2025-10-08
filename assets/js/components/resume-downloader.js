/**
 * Resume Downloader Component - Clean Architecture Implementation
 * Single Responsibility: Orchestrates resume download using injected services
 * Open/Closed: Extensible through dependency injection
 * Dependency Inversion: Depends on abstractions, not concrete implementations
 */

import { BrowserDownloadService, DOMUIFeedbackService } from '../core/adapters.js';

export class ResumeConfig {
  static DEFAULT_PATH = 'docs/Luis_Bonilla_Resume_{lang}.pdf';
  static DEFAULT_FILENAME = 'Luis_Bonilla_Resume_{lang}.pdf';
  static LOADING_MESSAGE = 'Downloading PDF...';
  static ERROR_PREFIX = 'Error downloading resume: ';
}

export class ResumeDownloader {
  constructor(dependencies = {}, config = {}) {
    // Dependency Injection - follows Dependency Inversion Principle
    this._downloadService = dependencies.downloadService || new BrowserDownloadService();
    this._uiFeedbackService = dependencies.uiFeedbackService || new DOMUIFeedbackService();

    // Configuration with defaults
    this._filePath = config.filePath || ResumeConfig.DEFAULT_PATH;
    this._fileName = config.fileName || ResumeConfig.DEFAULT_FILENAME;
    this._loadingMessage = config.loadingMessage || ResumeConfig.LOADING_MESSAGE;
  }

  /**
   * Get current file configuration
   */
  getFileConfig() {
    return {
      path: this._filePath,
      name: this._fileName
    };
  }

  /**
   * Download resume file
   */
  /**
   * Download resume file. Optionally pass a language code (e.g. 'en', 'es-ES').
   * The filePath and fileName can contain the placeholder {lang} which will be
   * replaced with the resolved language code.
   */
  async downloadResume(triggerElement = null, lang = null) {
    const resolvedLang = this._resolveLang(lang);
    const filePath = this._formatWithLang(this._filePath, resolvedLang);
    const fileName = this._formatWithLang(this._fileName, resolvedLang);

    const downloadResult = await this._executeDownloadWithFeedback(
      triggerElement,
      filePath,
      fileName
    );

    if (downloadResult.success) {
      this._logSuccessfulDownload(downloadResult);
    }

    return downloadResult;
  }

  /**
   * Legacy method name for backward compatibility
   * @deprecated Use downloadResume instead
   */
  async descargarResume(button = null) {
    console.warn('descargarResume is deprecated. Use downloadResume instead.');
    return this.downloadResume(button);
  }

  // Private methods - Single Responsibility Principle

  async _executeDownloadWithFeedback(element, filePath, fileName) {
    this._showLoadingState(element);

    try {
      const result = await this._downloadService.download(filePath, fileName);
      return { success: true, ...result };
    } catch (error) {
      this._handleDownloadError(error);
      return { success: false, error: error.message };
    } finally {
      this._hideLoadingState(element);
    }
  }

  _showLoadingState(element) {
    if (element) {
      this._uiFeedbackService.showLoading(element, this._loadingMessage);
    }
  }

  _formatWithLang(template, lang) {
    if (!template) return template;
    return String(template).replace(/\{lang\}/g, lang || 'en');
  }

  _resolveLang(lang) {
    // Prefer explicit lang param. Otherwise attempt to read global detection.
    if (lang) {
      // normalize to en or es-ES-like format
      return String(lang).split(/[-_]/)[0].toLowerCase();
    }

    try {
      if (typeof window !== 'undefined' && window.portfolioApp && window.portfolioApp.browserLanguage) {
        return String(window.portfolioApp.browserLanguage).split(/[-_]/)[0].toLowerCase();
      }
    } catch (e) {
      // ignore
    }

    // default fallback
    return 'en';
  }

  _hideLoadingState(element) {
    if (element) {
      this._uiFeedbackService.hideLoading(element);
    }
  }

  _handleDownloadError(error) {
    const errorMessage = error.message || 'Unknown error occurred while downloading resume';
    const fullMessage = `${ResumeConfig.ERROR_PREFIX}${errorMessage}`;
    
    console.error('Resume download failed:', error);
    this._uiFeedbackService.showError(fullMessage);
  }

  _logSuccessfulDownload(result) {
    console.log(`Resume download initiated successfully: ${result.filePath}`);
  }
}

// Export for backward compatibility
export default ResumeDownloader;
