
const STORAGE_KEY = 'site_theme_v1';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';
const PROFESSIONAL_THEME = 'professional';
const THEMES = [LIGHT_THEME, DARK_THEME, PROFESSIONAL_THEME];

export class ThemeManager{
  constructor(options){
    const opts = options || {};
    const providedLabels = (opts && opts.labels) || {};

    this.labels = {
      toggle: providedLabels.toggle || 'Toggle between light and dark theme'
    };

    this.boundToggle = this.toggleTheme.bind(this);
    this.listenerAttached = false;

    this.resolveToggleElements();
    this.currentTheme = this.safeGetStoredTheme();
    this.init();
  }

  init(){
    this.applyTheme(this.currentTheme);
    this.setupListeners();
  }

  resolveToggleElements(){
    this.toggleBtn = document.getElementById('theme-toggle') || null;
    this.iconElement = this.toggleBtn
      ? this.toggleBtn.querySelector('[data-theme-icon]')
      : null;
  }

  applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    this.safeStoreTheme(theme);
    this.currentTheme = theme;

    // Update toggle button UI to reflect the active theme
    this.updateToggleButton(theme);

    // Emit a global event in case other modules need to react
    window.dispatchEvent(new CustomEvent('themeChanged',{detail:theme}));
  }

  /**
   * Update the theme toggle button icon and accessibility attributes.
   * - Shows ☀️ (sun) when dark theme is active
   * - Shows 🌙 (moon) when light theme is active
   * - Shows 💻 (laptop) when professional theme is active
   */
  updateToggleButton(theme){
    if (!this.toggleBtn || !document.contains(this.toggleBtn)) {
      this.resolveToggleElements();
    }

    const btn = this.toggleBtn;
    if (!btn) return;

    if (!this.iconElement || !btn.contains(this.iconElement)) {
      this.iconElement = btn.querySelector('[data-theme-icon]');
    }

    if (this.iconElement) {
      const icon = theme === DARK_THEME ? '☀️' : theme === LIGHT_THEME ? '🌙' : '💻';
      this.iconElement.textContent = icon;
    }

    btn.setAttribute('aria-pressed', theme !== LIGHT_THEME ? 'true' : 'false');
    btn.setAttribute('aria-label', `${this.labels.toggle} (current: ${theme})`);
  }

  setupListeners(){
    if (!this.toggleBtn || !document.contains(this.toggleBtn)) {
      this.resolveToggleElements();
    }

    if (this.toggleBtn && !this.listenerAttached) {
      this.toggleBtn.addEventListener('click', this.boundToggle);
      this.listenerAttached = true;
    }
  }

  destroy(){
    if (this.toggleBtn && this.listenerAttached) {
      this.toggleBtn.removeEventListener('click', this.boundToggle);
      this.listenerAttached = false;
    }
  }

  toggleTheme(){
    const idx = THEMES.indexOf(this.currentTheme);
    const next = THEMES[(idx+1)%THEMES.length];
    this.applyTheme(next);
  }

  safeGetStoredTheme(){
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (THEMES.includes(stored)) {
        return stored;
      }
    } catch (e) {
      // Ignore storage errors (e.g. private mode)
    }
    return LIGHT_THEME;
  }

  safeStoreTheme(theme){
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ignore storage errors (e.g. storage disabled)
    }
  }
}
