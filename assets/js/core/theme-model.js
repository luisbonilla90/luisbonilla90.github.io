/**
 * Theme domain model and business logic
 * Single Responsibility: Theme state and validation
 */

export const ThemeType = {
  LIGHT: 'light',
  DARK: 'dark',
  PROFESSIONAL: 'professional'
};

export const ThemeConfig = {
  THEMES: [ThemeType.LIGHT, ThemeType.DARK, ThemeType.PROFESSIONAL],
  DEFAULT_THEME: ThemeType.LIGHT,
  STORAGE_KEY: 'site_theme_v1',
  
  ICON_MAP: {
    [ThemeType.LIGHT]: '🌙',
    [ThemeType.DARK]: '☀️', 
    [ThemeType.PROFESSIONAL]: '💻'
  },

  ACCESSIBILITY_LABELS: {
    default: 'Toggle between light and dark theme',
    current: (theme) => `Toggle between light and dark theme (current: ${theme})`
  }
};

export class Theme {
  constructor(type) {
    if (!ThemeConfig.THEMES.includes(type)) {
      throw new Error(`Invalid theme type: ${type}`);
    }
    this.type = type;
  }

  getIcon() {
    return ThemeConfig.ICON_MAP[this.type];
  }

  isLight() {
    return this.type === ThemeType.LIGHT;
  }

  isDark() {
    return this.type === ThemeType.DARK;
  }

  isProfessional() {
    return this.type === ThemeType.PROFESSIONAL;
  }

  getAccessibilityLabel() {
    return ThemeConfig.ACCESSIBILITY_LABELS.current(this.type);
  }

  getAriaPressed() {
    return this.isLight() ? 'false' : 'true';
  }

  static fromString(themeString) {
    if (ThemeConfig.THEMES.includes(themeString)) {
      return new Theme(themeString);
    }
    return new Theme(ThemeConfig.DEFAULT_THEME);
  }

  static getNextTheme(currentTheme) {
    const currentIndex = ThemeConfig.THEMES.indexOf(currentTheme.type);
    const nextIndex = (currentIndex + 1) % ThemeConfig.THEMES.length;
    return new Theme(ThemeConfig.THEMES[nextIndex]);
  }
}