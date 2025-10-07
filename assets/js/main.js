import { ThemeManager } from "./core/theme-manager.js";

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  const themeManager = new ThemeManager();
});
