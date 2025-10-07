
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';
const PROFESSIONAL_THEME = 'professional';
export class ThemeManager{
  constructor(){
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init(){
    this.applyTheme(this.currentTheme);
    this.setupListeners();
  }

  applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
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
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    // Update the visible icon inside the first span (aria-hidden)
    const iconSpan = btn.querySelector('span[aria-hidden="true"]');
    if (iconSpan) {
      iconSpan.textContent = theme === DARK_THEME ? '☀️' : theme === LIGHT_THEME ? '🌙' : '💻';
    }

    // Update aria-pressed to reflect whether a non-light theme is active
    // (treat 'dark' and 'professional' as pressed states)
    try {
      btn.setAttribute('aria-pressed', theme !== LIGHT_THEME ? 'true' : 'false');
    } catch (e) {}

    // Update accessible label to include current theme
    const baseLabel = 'Toggle between light and dark theme';
    btn.setAttribute('aria-label', `${baseLabel} (current: ${theme})`);
  }

  setupListeners(){
    document.getElementById('theme-toggle')?.addEventListener('click',()=>{
      this.toggleTheme();
    });
  }

  toggleTheme(){
    const themes = [LIGHT_THEME,DARK_THEME,PROFESSIONAL_THEME];
    const idx = themes.indexOf(this.currentTheme);
    const next = themes[(idx+1)%themes.length];
    this.applyTheme(next);
  }
}
