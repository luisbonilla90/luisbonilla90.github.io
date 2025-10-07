/**
 * Resume Downloader Component - Clean Architecture Implementation
 * Single Responsibility: Orchestrates resume download using injected services
 * Open/Closed: Extensible through dependency injection
 * Dependency Inversion: Depends on abstractions, not concrete implementations
 */

import { BrowserDownloadService, DOMUIFeedbackService } from '../core/adapters.js';

export class ResumeConfig {
  static DEFAULT_PATH = 'docs/Luis_Bonilla_Resume_2025.pdf';
  static DEFAULT_FILENAME = 'Luis_Bonilla_Resume_2025.pdf';
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
  async downloadResume(triggerElement = null) {
    const downloadResult = await this._executeDownloadWithFeedback(
      triggerElement,
      this._filePath,
      this._fileName
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
