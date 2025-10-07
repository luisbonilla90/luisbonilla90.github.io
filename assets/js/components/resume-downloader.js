/**
 * Resume Downloader Component
 * Fetches the markdown resume, converts it to HTML, and generates a PDF
 */

class ResumeDownloader {
  constructor() {
    // Path to the already-generated PDF in the repo
    this.pdfPath = 'docs/Luis_Bonilla_Resume_2025.pdf';
    this.fileName = 'Luis_Bonilla_Resume_2025.pdf';
  }

  // The component no longer converts markdown or generates a PDF client-side.
  // Instead it downloads the pre-generated PDF stored at `docs/Luis_Bonilla_Resume_2025.pdf`.

  /**
   * Show loading indicator
   */
  showLoading(button) {
    if (button) {
      button.dataset.originalText = button.textContent;
      button.textContent = 'Generating PDF...';
      button.disabled = true;
      button.style.opacity = '0.6';
      button.style.cursor = 'wait';
    }
  }

  /**
   * Hide loading indicator
   */
  hideLoading(button) {
    if (button && button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
      button.disabled = false;
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
      delete button.dataset.originalText;
    }
  }

  /**
   * Show error message
   */
  showError(message) {
    alert(`Error generating PDF: ${message}\n\nPlease try again or contact the site administrator.`);
  }

  /**
   * Main function to download the resume as PDF
   */
  async descargarResume(button = null) {
    try {
      this.showLoading(button);

      // Create a temporary anchor to trigger download of the existing PDF
      const link = document.createElement('a');
      link.href = this.pdfPath;
      // Use download attribute to suggest filename; note that cross-origin
      // responses may ignore this and use server-provided filename.
      link.download = this.fileName;
      // Ensure link is added to DOM for Firefox
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`Triggered download for ${this.pdfPath}`);
    } catch (error) {
      console.error('Error downloading resume PDF:', error);
      this.showError(error.message || 'Unknown error while downloading resume');
    } finally {
      this.hideLoading(button);
    }
  }
}

// Export for use in main.js
export default ResumeDownloader;
