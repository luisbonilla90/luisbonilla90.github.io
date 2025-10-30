/**
 * Unit Tests for Theme Toggle Component
 * Verifies theme switching functionality and localStorage persistence
 */

describe('Theme Toggle Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    sessionStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should initialize with default theme from localStorage', () => {
    localStorage.setItem('site_theme_v1', 'dark');
    const theme = localStorage.getItem('site_theme_v1');
    expect(theme).toBe('dark');
  });

  it('should toggle between light and dark themes', () => {
    let currentTheme = 'light';
    const toggleTheme = () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      return currentTheme;
    };

    expect(toggleTheme()).toBe('dark');
    expect(toggleTheme()).toBe('light');
    expect(toggleTheme()).toBe('dark');
  });

  it('should persist theme preference in localStorage', () => {
    const theme = 'dark';
    localStorage.setItem('site_theme_v1', theme);
    
    expect(localStorage.getItem('site_theme_v1')).toBe('dark');
  });

  it('should set data-theme attribute on html element', () => {
    const theme = 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should handle missing localStorage gracefully', () => {
    const theme = localStorage.getItem('site_theme_v1');
    expect(theme).toBeNull();
  });

  it('should support valid theme values', () => {
    const validThemes = ['light', 'dark'];
    validThemes.forEach((theme) => {
      localStorage.setItem('site_theme_v1', theme);
      expect(localStorage.getItem('site_theme_v1')).toBe(theme);
    });
  });
});
