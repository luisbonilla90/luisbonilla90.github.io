/**
 * Concrete implementations of core abstractions
 * Single Responsibility: Each adapter handles one aspect of the system
 */

import { ThemeStorageAdapter, ThemeUIAdapter, EventDispatcher, DownloadService, UIFeedbackService } from './interfaces.js';
import { ThemeConfig } from './theme-model.js';

/**
 * LocalStorage implementation of theme persistence
 */
/**
 * @deprecated This adapter is not referenced and can be removed in future cleanups.
 */
export class LocalStorageThemeAdapter extends ThemeStorageAdapter {
  getStoredTheme() {
    try {
      return localStorage.getItem(ThemeConfig.STORAGE_KEY);
    } catch (error) {
      console.warn('Unable to access localStorage:', error.message);
      return null;
    }
  }

  storeTheme(theme) {
    try {
      localStorage.setItem(ThemeConfig.STORAGE_KEY, theme);
      return true;
    } catch (error) {
      console.warn('Unable to store theme in localStorage:', error.message);
      return false;
    }
  }
}

/**
 * DOM implementation of theme UI management
 */
/**
 * @deprecated This adapter is not referenced and can be removed in future cleanups.
 */
export class DOMThemeUIAdapter extends ThemeUIAdapter {
  constructor() {
    super();
    this._toggleButton = null;
    this._iconElement = null;
    this._resolveElements();
  }

  _resolveElements() {
    this._toggleButton = document.getElementById('theme-toggle');
    this._iconElement = this._toggleButton?.querySelector('[data-theme-icon]') || null;
  }

  setDocumentTheme(theme) {
    if (!document.documentElement) {
      throw new Error('Document element not available');
    }
    document.documentElement.setAttribute('data-theme', theme);
  }

  updateToggleButton(theme, config = {}) {
    if (!this._toggleButton || !document.contains(this._toggleButton)) {
      this._resolveElements();
    }

    if (!this._toggleButton) return false;

    // Update icon
    if (this._iconElement) {
      this._iconElement.textContent = config.icon || '';
    }

    // Update accessibility attributes
    this._toggleButton.setAttribute('aria-pressed', config.ariaPressed || 'false');
    this._toggleButton.setAttribute('aria-label', config.ariaLabel || '');

    return true;
  }

  attachToggleListener(handler) {
    if (!this._toggleButton) {
      this._resolveElements();
    }

    if (this._toggleButton && typeof handler === 'function') {
      this._toggleButton.addEventListener('click', handler);
      return true;
    }
    return false;
  }

  detachToggleListener(handler) {
    if (this._toggleButton && typeof handler === 'function') {
      this._toggleButton.removeEventListener('click', handler);
      return true;
    }
    return false;
  }
}

/**
 * Window-based event dispatcher
 */
/**
 * @deprecated This adapter is not referenced and can be removed in future cleanups.
 */
export class WindowEventDispatcher extends EventDispatcher {
  dispatch(eventName, payload = {}) {
    if (!window || typeof window.dispatchEvent !== 'function') {
      console.warn('Window event dispatching not available');
      return false;
    }

    try {
      const event = new CustomEvent(eventName, { detail: payload });
      window.dispatchEvent(event);
      return true;
    } catch (error) {
      console.error('Failed to dispatch event:', error);
      return false;
    }
  }
}

/**
 * Browser-based file download service
 */
/**
 * @deprecated This adapter is not referenced and can be removed in future cleanups.
 */
export class BrowserDownloadService extends DownloadService {
  async download(filePath, fileName) {
    if (!filePath || !fileName) {
      throw new Error('Both filePath and fileName are required');
    }

    try {
      const downloadLink = this._createDownloadLink(filePath, fileName);
      this._triggerDownload(downloadLink);
      return { success: true, filePath, fileName };
    } catch (error) {
      throw new Error(`Download failed: ${error.message}`);
    }
  }

  _createDownloadLink(href, downloadName) {
    const link = document.createElement('a');
    link.href = href;
    link.download = downloadName;
    link.style.display = 'none';
    return link;
  }

  _triggerDownload(link) {
    document.body.appendChild(link);
    try {
      link.click();
    } finally {
      document.body.removeChild(link);
    }
  }
}

/**
 * DOM-based UI feedback service
 */
/**
 * @deprecated This adapter is not referenced and can be removed in future cleanups.
 */
export class DOMUIFeedbackService extends UIFeedbackService {
  constructor() {
    super();
    this._loadingStates = new WeakMap();
  }

  showLoading(element, message = 'Loading...') {
    if (!element) return false;

    // Store original state
    this._loadingStates.set(element, {
      originalText: element.textContent,
      originalDisabled: element.disabled,
      originalOpacity: element.style.opacity,
      originalCursor: element.style.cursor
    });

    // Apply loading state
    element.textContent = message;
    element.disabled = true;
    element.style.opacity = '0.6';
    element.style.cursor = 'wait';

    return true;
  }

  hideLoading(element) {
    if (!element || !this._loadingStates.has(element)) return false;

    const originalState = this._loadingStates.get(element);
    
    // Restore original state
    element.textContent = originalState.originalText;
    element.disabled = originalState.originalDisabled;
    element.style.opacity = originalState.originalOpacity;
    element.style.cursor = originalState.originalCursor;

    // Clean up
    this._loadingStates.delete(element);
    return true;
  }

  showError(message) {
    if (!message) return false;
    
    // For now using alert, but this could be enhanced with better UI
    alert(`Error: ${message}`);
    return true;
  }
}