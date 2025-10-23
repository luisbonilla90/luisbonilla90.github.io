/**
 * Factory functions for creating application components
 * Single Responsibility: Component creation and configuration
 * Open/Closed: Easy to extend with new component types
 */

import { ThemeManager } from './theme-manager.js';
import { ResumeDownloader } from '../components/resume-downloader.js';
import { 
  LocalStorageThemeAdapter,
  DOMThemeUIAdapter,
  WindowEventDispatcher,
  BrowserDownloadService,
  DOMUIFeedbackService
} from './adapters.js';

export class ComponentFactory {
  
  /**
   * Create theme manager with optional custom dependencies
   */
  static createThemeManager(options = {}) {
    const dependencies = {
      storageAdapter: options.storageAdapter || new LocalStorageThemeAdapter(),
      uiAdapter: options.uiAdapter || new DOMThemeUIAdapter(),
      eventDispatcher: options.eventDispatcher || new WindowEventDispatcher()
    };

    return new ThemeManager(dependencies);
  }

  /**
   * Create resume downloader with optional custom dependencies
   */
  static createResumeDownloader(config = {}, dependencies = {}) {
    const services = {
      downloadService: dependencies.downloadService || new BrowserDownloadService(),
      uiFeedbackService: dependencies.uiFeedbackService || new DOMUIFeedbackService()
    };

    return new ResumeDownloader(services, config);
  }

  /**
   * Create mock theme manager for testing
   */
  static createMockThemeManager(mockDependencies) {
    return new ThemeManager(mockDependencies);
  }

  /**
   * Create mock resume downloader for testing
   */
  static createMockResumeDownloader(config, mockDependencies) {
    return new ResumeDownloader(mockDependencies, config);
  }
}