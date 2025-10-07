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
    window.dispatchEvent(new CustomEvent('themeChanged',{detail:theme}));
  }

  setupListeners(){
    document.getElementById('theme-toggle')?.addEventListener('click',()=>{
      this.toggleTheme();
    });
  }

  toggleTheme(){
    const themes = ['light','dark','professional'];
    const idx = themes.indexOf(this.currentTheme);
    const next = themes[(idx+1)%themes.length];
    this.applyTheme(next);
  }
}
