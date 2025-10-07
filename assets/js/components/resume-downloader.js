/**
 * Resume Downloader Component
 * Fetches the markdown resume, converts it to HTML, and generates a PDF
 */

class ResumeDownloader {
  constructor() {
    this.resumePath = 'docs/resume.md';
    this.fileName = 'Luis_Bonilla_Resume.pdf';
  }

  /**
   * Fetch the markdown file content
   */
  async fetchMarkdown() {
    try {
      const response = await fetch(this.resumePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch resume: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error fetching markdown:', error);
      throw error;
    }
  }

  /**
   * Convert markdown to HTML using marked.js
   * Falls back to basic conversion if marked.js is not available
   */
  markdownToHTML(markdown) {
    // Check if marked.js is available
    if (typeof marked !== 'undefined') {
      return marked.parse(markdown);
    }

    // Fallback: Basic markdown to HTML conversion
    return this.basicMarkdownToHTML(markdown);
  }

  /**
   * Basic markdown to HTML converter (fallback)
   */
  basicMarkdownToHTML(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/gim, '<em>$1</em>');
    html = html.replace(/___(.+?)___/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/__(.+?)__/gim, '<strong>$1</strong>');
    html = html.replace(/_(.+?)_/gim, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

    // Lists
    html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
    html = html.replace(/^- (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/^(.+)$/gim, '<p>$1</p>');

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr>');

    return html;
  }

  /**
   * Style the HTML content for PDF generation
   */
  styleHTML(html) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-size: 11pt;
          }
          h1 {
            color: #2c3e50;
            font-size: 24pt;
            margin-bottom: 5px;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
          }
          h2 {
            color: #34495e;
            font-size: 18pt;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 2px solid #95a5a6;
            padding-bottom: 5px;
          }
          h3 {
            color: #34495e;
            font-size: 14pt;
            margin-top: 15px;
            margin-bottom: 8px;
          }
          h4 {
            color: #7f8c8d;
            font-size: 12pt;
            margin-top: 10px;
            margin-bottom: 5px;
          }
          p {
            margin: 8px 0;
            text-align: justify;
          }
          ul, ol {
            margin: 10px 0;
            padding-left: 25px;
          }
          li {
            margin: 5px 0;
          }
          strong {
            color: #2c3e50;
            font-weight: 600;
          }
          em {
            font-style: italic;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
          hr {
            border: none;
            border-top: 1px solid #bdc3c7;
            margin: 20px 0;
          }
          .emoji {
            font-size: 14pt;
          }
          code {
            background-color: #f4f4f4;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
          }
          blockquote {
            border-left: 4px solid #3498db;
            padding-left: 15px;
            margin: 10px 0;
            color: #7f8c8d;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
  }

  /**
   * Generate PDF from HTML using html2pdf.js
   */
  async generatePDF(html) {
    // Check if html2pdf is available
    if (typeof html2pdf === 'undefined') {
      throw new Error('html2pdf.js library is not loaded. Please include it in your HTML.');
    }

    const styledHTML = this.styleHTML(html);

    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = styledHTML;
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    try {
      const opt = {
        margin: [15, 15, 15, 15],
        filename: this.fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'letter', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(container).save();
    } finally {
      // Clean up
      document.body.removeChild(container);
    }
  }

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

      // Fetch markdown content
      const markdown = await this.fetchMarkdown();

      // Convert to HTML
      const html = this.markdownToHTML(markdown);

      // Generate and download PDF
      await this.generatePDF(html);

      console.log('Resume PDF generated successfully!');
    } catch (error) {
      console.error('Error generating resume PDF:', error);
      this.showError(error.message);
    } finally {
      this.hideLoading(button);
    }
  }
}

// Export for use in main.js
export default ResumeDownloader;
