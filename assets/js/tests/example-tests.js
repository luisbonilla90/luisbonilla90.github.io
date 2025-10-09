/**
 * Example unit tests showing how Clean Architecture enables easy testing
 * These tests demonstrate the benefits of dependency injection and SOLID principles
 * 
 * To run these tests, you would need to install a test framework like Jest:
 * npm install --save-dev jest jsdom
 */

import { ThemeManager } from '../core/theme-manager.js';
import { ResumeDownloader } from '../components/resume-downloader.js';
import { Theme, ThemeType } from '../core/theme-model.js';
import { ComponentFactory } from '../core/factory.js';

// Mock implementations for testing
/**
 * @deprecated This mock class is unused and can be removed in future cleanups.
 */
class MockStorageAdapter {
  constructor() {
    this.storage = {};
  }
  
  getStoredTheme() {
    return this.storage.theme || null;
  }
  
  storeTheme(theme) {
    this.storage.theme = theme;
    return true;
  }
}

/**
 * @deprecated This mock class is unused and can be removed in future cleanups.
 */
class MockUIAdapter {
  constructor() {
    this.documentTheme = null;
    this.buttonConfig = {};
    this.listeners = [];
  }
  
  setDocumentTheme(theme) {
    this.documentTheme = theme;
  }
  
  updateToggleButton(theme, config) {
    this.buttonConfig = { theme, ...config };
    return true;
  }
  
  attachToggleListener(handler) {
    this.listeners.push(handler);
    return true;
  }
  
  detachToggleListener(handler) {
    const index = this.listeners.indexOf(handler);
    if (index > -1) {
      this.listeners.splice(index, 1);
      return true;
    }
    return false;
  }
}

/**
 * @deprecated This mock class is unused and can be removed in future cleanups.
 */
class MockEventDispatcher {
  constructor() {
    this.events = [];
  }
  
  dispatch(eventName, payload) {
    this.events.push({ eventName, payload });
    return true;
  }
}

/**
 * @deprecated This mock class is unused and can be removed in future cleanups.
 */
class MockDownloadService {
  constructor() {
    this.downloads = [];
  }
  
  async download(filePath, fileName) {
    this.downloads.push({ filePath, fileName });
    return { success: true, filePath, fileName };
  }
}

/**
 * @deprecated This mock class is unused and can be removed in future cleanups.
 */
class MockUIFeedbackService {
  constructor() {
    this.loadingStates = [];
    this.errors = [];
  }
  
  showLoading(element, message) {
    this.loadingStates.push({ element, message, state: 'loading' });
    return true;
  }
  
  hideLoading(element) {
    this.loadingStates.push({ element, state: 'hidden' });
    return true;
  }
  
  showError(message) {
    this.errors.push(message);
    return true;
  }
}

// Example tests
describe('ThemeManager', () => {
  let mockStorage, mockUI, mockEvents, themeManager;
  
  beforeEach(() => {
    mockStorage = new MockStorageAdapter();
    mockUI = new MockUIAdapter();
    mockEvents = new MockEventDispatcher();
    
    themeManager = new ThemeManager({
      storageAdapter: mockStorage,
      uiAdapter: mockUI,
      eventDispatcher: mockEvents
    });
  });

  test('should initialize with light theme by default', () => {
    expect(themeManager.getCurrentTheme().type).toBe(ThemeType.LIGHT);
  });

  test('should apply theme correctly', () => {
    themeManager.applyTheme(ThemeType.DARK);
    
    expect(mockUI.documentTheme).toBe(ThemeType.DARK);
    expect(mockStorage.storage.theme).toBe(ThemeType.DARK);
    expect(mockEvents.events).toHaveLength(1);
    expect(mockEvents.events[0].eventName).toBe('themeChanged');
  });

  test('should toggle theme in sequence', () => {
    // Start with light, toggle to dark
    themeManager.toggleTheme();
    expect(themeManager.getCurrentTheme().type).toBe(ThemeType.DARK);
    
    // Toggle to professional
    themeManager.toggleTheme();
    expect(themeManager.getCurrentTheme().type).toBe(ThemeType.PROFESSIONAL);
    
    // Toggle back to light
    themeManager.toggleTheme();
    expect(themeManager.getCurrentTheme().type).toBe(ThemeType.LIGHT);
  });

  test('should update UI with correct theme configuration', () => {
    themeManager.applyTheme(ThemeType.DARK);
    
    expect(mockUI.buttonConfig.icon).toBe('☀️');
    expect(mockUI.buttonConfig.ariaPressed).toBe('true');
  });
});

describe('ResumeDownloader', () => {
  let mockDownload, mockFeedback, resumeDownloader;
  
  beforeEach(() => {
    mockDownload = new MockDownloadService();
    mockFeedback = new MockUIFeedbackService();
    
    resumeDownloader = new ResumeDownloader({
      downloadService: mockDownload,
      uiFeedbackService: mockFeedback
    });
  });

  test('should download resume successfully', async () => {
    const mockButton = document.createElement('button');
    
    const result = await resumeDownloader.downloadResume(mockButton);
    
    expect(result.success).toBe(true);
    expect(mockDownload.downloads).toHaveLength(1);
    expect(mockFeedback.loadingStates).toHaveLength(2); // show and hide
  });

  test('should handle download errors gracefully', async () => {
    // Make download service fail
    mockDownload.download = async () => {
      throw new Error('Network error');
    };
    
    const result = await resumeDownloader.downloadResume();
    
    expect(result.success).toBe(false);
    expect(mockFeedback.errors).toHaveLength(1);
    expect(mockFeedback.errors[0]).toContain('Network error');
  });
});

describe('Theme Model', () => {
  test('should create valid themes', () => {
    const lightTheme = new Theme(ThemeType.LIGHT);
    expect(lightTheme.isLight()).toBe(true);
    expect(lightTheme.getIcon()).toBe('🌙');
  });

  test('should get next theme correctly', () => {
    const lightTheme = new Theme(ThemeType.LIGHT);
    const nextTheme = Theme.getNextTheme(lightTheme);
    expect(nextTheme.type).toBe(ThemeType.DARK);
  });

  test('should handle invalid themes gracefully', () => {
    const theme = Theme.fromString('invalid');
    expect(theme.type).toBe(ThemeType.LIGHT); // defaults to light
  });
});

describe('ComponentFactory', () => {
  test('should create theme manager with default dependencies', () => {
    const themeManager = ComponentFactory.createThemeManager();
    expect(themeManager).toBeInstanceOf(ThemeManager);
  });

  test('should create resume downloader with custom config', () => {
    const config = { filePath: 'custom/path.pdf' };
    const downloader = ComponentFactory.createResumeDownloader(config);
    expect(downloader.getFileConfig().path).toBe('custom/path.pdf');
  });
});

/*
Example package.json test script:
{
  "scripts": {
    "test": "jest --testEnvironment=jsdom"
  },
  "jest": {
    "testEnvironment": "jsdom",
    "transform": {
      "^.+\\.js$": "babel-jest"
    }
  }
}
*/