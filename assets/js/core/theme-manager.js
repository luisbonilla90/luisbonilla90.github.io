
/**
 * Theme Manager - Clean Architecture Implementation
 * Single Responsibility: Orchestrates theme changes using injected dependencies
 * Open/Closed: Extensible through dependency injection
 * Dependency Inversion: Depends on abstractions, not concrete implementations
 */

import { Theme, ThemeConfig } from './theme-model.js';
import { 
  LocalStorageThemeAdapter, 
  DOMThemeUIAdapter, 
  WindowEventDispatcher 
} from './adapters.js';

export class ThemeManager {
  constructor(dependencies = {}) {
    // Dependency Injection - follows Dependency Inversion Principle
    this._storageAdapter = dependencies.storageAdapter || new LocalStorageThemeAdapter();
    this._uiAdapter = dependencies.uiAdapter || new DOMThemeUIAdapter();
    this._eventDispatcher = dependencies.eventDispatcher || new WindowEventDispatcher();

    // Current state
    this._currentTheme = null;
    this._boundToggleHandler = this._handleToggleClick.bind(this);
    this._isListenerAttached = false;

    this._initialize();
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this._currentTheme;
  }

  /**
   * Apply a new theme
   */
  applyTheme(themeType) {
    const theme = Theme.fromString(themeType);
    
    this._setDocumentTheme(theme);
    this._persistTheme(theme);
    this._updateUI(theme);
    this._notifyThemeChanged(theme);
    
    this._currentTheme = theme;
  }

  /**
   * Toggle to next theme in sequence
   */
  toggleTheme() {
    if (!this._currentTheme) return;
    
    const nextTheme = Theme.getNextTheme(this._currentTheme);
    this.applyTheme(nextTheme.type);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    if (!this._isListenerAttached) {
      const success = this._uiAdapter.attachToggleListener(this._boundToggleHandler);
      this._isListenerAttached = success;
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    if (this._isListenerAttached) {
      this._uiAdapter.detachToggleListener(this._boundToggleHandler);
      this._isListenerAttached = false;
    }
  }

  // Private methods - Single Responsibility Principle

  _initialize() {
    const storedTheme = this._loadStoredTheme();
    this._currentTheme = Theme.fromString(storedTheme);
    this.applyTheme(this._currentTheme.type);
    this.setupEventListeners();
  }

  _loadStoredTheme() {
    const stored = this._storageAdapter.getStoredTheme();
    return stored || ThemeConfig.DEFAULT_THEME;
  }

  _setDocumentTheme(theme) {
    this._uiAdapter.setDocumentTheme(theme.type);
  }

  _persistTheme(theme) {
    this._storageAdapter.storeTheme(theme.type);
  }

  _updateUI(theme) {
    const uiConfig = {
      icon: theme.getIcon(),
      ariaPressed: theme.getAriaPressed(),
      ariaLabel: theme.getAccessibilityLabel()
    };
    
    this._uiAdapter.updateToggleButton(theme.type, uiConfig);
  }

  _notifyThemeChanged(theme) {
    this._eventDispatcher.dispatch('themeChanged', { 
      theme: theme.type,
      timestamp: new Date().toISOString()
    });
  }

  _handleToggleClick(event) {
    event?.preventDefault();
    this.toggleTheme();
  }
}
