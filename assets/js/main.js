import { ThemeManager } from "./core/theme-manager.js";
import ResumeDownloader from "./components/resume-downloader.js";

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  const themeManager = new ThemeManager();

  // Initialize Resume Downloader
  const resumeDownloader = new ResumeDownloader();
  
  // Attach to Download Resume button
  const downloadResumeBtn = document.getElementById('download-resume-btn');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeDownloader.descargarResume(downloadResumeBtn);
    });
  }
});
