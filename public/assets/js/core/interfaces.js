/**
 * Core interfaces and abstractions for the application
 * Following Dependency Inversion Principle
 */

/**
 * Storage abstraction for theme persistence
 */
export class ThemeStorageAdapter {
  getStoredTheme() {
    throw new Error('getStoredTheme must be implemented');
  }

  storeTheme(theme) {
    throw new Error('storeTheme must be implemented');
  }
}

/**
 * DOM manipulation abstraction for theme UI
 */
export class ThemeUIAdapter {
  setDocumentTheme(theme) {
    throw new Error('setDocumentTheme must be implemented');
  }

  updateToggleButton(theme, config) {
    throw new Error('updateToggleButton must be implemented');
  }

  attachToggleListener(handler) {
    throw new Error('attachToggleListener must be implemented');
  }

  detachToggleListener(handler) {
    throw new Error('detachToggleListener must be implemented');
  }
}

/**
 * Event dispatcher abstraction
 */
export class EventDispatcher {
  dispatch(eventName, payload) {
    throw new Error('dispatch must be implemented');
  }
}

/**
 * Download service abstraction
 */
export class DownloadService {
  async download(filePath, fileName) {
    throw new Error('download must be implemented');
  }
}

/**
 * UI feedback service abstraction
 */
export class UIFeedbackService {
  showLoading(element, message) {
    throw new Error('showLoading must be implemented');
  }

  hideLoading(element) {
    throw new Error('hideLoading must be implemented');
  }

  showError(message) {
    throw new Error('showError must be implemented');
  }
}