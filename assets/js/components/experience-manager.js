/**
 * Experience Component with STAR Format Support
 * Handles dynamic loading and rendering of professional experiences
 * with expandable STAR (Situation, Task, Action, Result) details
 */

export class ExperienceManager {
  constructor() {
    this.experiences = [];
    this.currentLanguage = document.documentElement.getAttribute('lang') || 'en';
    this.container = null;
  }

  /**
   * Initialize the experience manager
   */
  async init() {
    try {
      this.container = document.querySelector('.experience-timeline');
      if (!this.container) {
        console.warn('Experience timeline container not found');
        return;
      }

      // Listen for language changes
      window.addEventListener('languageChanged', (event) => {
        this.currentLanguage = event.detail.language;
        this.loadExperiences();
      });

      // Load initial experiences
      await this.loadExperiences();
    } catch (error) {
      console.error('Failed to initialize experience manager:', error);
    }
  }

  /**
   * Load experiences from JSON file
   */
  async loadExperiences() {
    try {
      const response = await fetch(`/data/experiences/experiences-${this.currentLanguage}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load experiences: ${response.status}`);
      }
      const data = await response.json();
      this.experiences = data.experiences || [];
      this.render();
    } catch (error) {
      console.error('Error loading experiences:', error);
      // Fallback to existing HTML content if JSON fails to load
    }
  }

  /**
   * Render all experiences
   */
  render() {
    if (!this.container || this.experiences.length === 0) {
      return;
    }

    // Clear existing content
    this.container.innerHTML = '';

    // Render each experience
    this.experiences.forEach((experience) => {
      const experienceElement = this.createExperienceElement(experience);
      this.container.appendChild(experienceElement);
    });
  }

  /**
   * Create an experience article element
   */
  createExperienceElement(experience) {
    const article = document.createElement('article');
    article.className = 'experience-item';
    article.setAttribute('role', 'listitem');
    article.setAttribute('data-experience-id', experience.id);

    // Create header
    const header = this.createExperienceHeader(experience);
    article.appendChild(header);

    // Create summary
    const summary = this.createSummary(experience);
    article.appendChild(summary);

    // Create STAR toggle button
    const toggleButton = this.createToggleButton(experience);
    article.appendChild(toggleButton);

    // Create STAR details (initially hidden)
    const starDetails = this.createStarDetails(experience);
    article.appendChild(starDetails);

    // Create highlights list
    const highlights = this.createHighlights(experience);
    article.appendChild(highlights);

    return article;
  }

  /**
   * Create experience header
   */
  createExperienceHeader(experience) {
    const header = document.createElement('div');
    header.className = 'experience-header';

    const title = document.createElement('h3');
    title.textContent = experience.title;

    const period = document.createElement('span');
    period.className = 'experience-period';
    const startDate = this.formatDate(experience.period.start);
    const endDate = experience.period.end === 'present' 
      ? (this.currentLanguage === 'es' ? 'Presente' : 'Present')
      : this.formatDate(experience.period.end);
    period.innerHTML = `<time datetime="${experience.period.start}">${startDate}</time> – <time datetime="${experience.period.end}">${endDate}</time>`;

    header.appendChild(title);
    
    if (experience.company) {
      const company = document.createElement('span');
      company.className = 'experience-company';
      company.textContent = experience.company;
      header.appendChild(company);
    }
    
    header.appendChild(period);

    return header;
  }

  /**
   * Create summary paragraph
   */
  createSummary(experience) {
    const summaryContainer = document.createElement('div');
    summaryContainer.className = 'experience-summary';
    
    const summary = document.createElement('p');
    summary.className = 'summary-text';
    summary.textContent = experience.summary;
    
    summaryContainer.appendChild(summary);
    return summaryContainer;
  }

  /**
   * Create toggle button for STAR details
   */
  createToggleButton(experience) {
    const button = document.createElement('button');
    button.className = 'star-toggle-btn';
    button.type = 'button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `star-details-${experience.id}`);
    
    const icon = document.createElement('span');
    icon.className = 'toggle-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '▶';
    
    const text = document.createElement('span');
    text.textContent = this.currentLanguage === 'es' ? 'Ver detalles STAR' : 'View STAR Details';
    
    button.appendChild(icon);
    button.appendChild(text);
    
    // Add click handler
    button.addEventListener('click', () => this.toggleStarDetails(experience.id, button));
    
    return button;
  }

  /**
   * Create STAR details section
   */
  createStarDetails(experience) {
    const container = document.createElement('div');
    container.className = 'star-details';
    container.id = `star-details-${experience.id}`;
    container.setAttribute('aria-hidden', 'true');
    container.style.display = 'none';

    const star = experience.star;
    const labels = this.currentLanguage === 'es' 
      ? { situation: 'Situación', task: 'Tarea', action: 'Acción', result: 'Resultado' }
      : { situation: 'Situation', task: 'Task', action: 'Action', result: 'Result' };

    ['situation', 'task', 'action', 'result'].forEach(key => {
      if (star[key]) {
        const section = document.createElement('div');
        section.className = `star-section star-${key}`;
        
        const heading = document.createElement('h4');
        heading.textContent = labels[key];
        
        const content = document.createElement('p');
        content.textContent = star[key];
        
        section.appendChild(heading);
        section.appendChild(content);
        container.appendChild(section);
      }
    });

    return container;
  }

  /**
   * Create highlights list
   */
  createHighlights(experience) {
    const ul = document.createElement('ul');
    ul.className = 'experience-highlights';

    experience.highlights.forEach(highlight => {
      const li = document.createElement('li');
      li.textContent = highlight;
      ul.appendChild(li);
    });

    return ul;
  }

  /**
   * Toggle STAR details visibility
   */
  toggleStarDetails(experienceId, button) {
    const details = document.getElementById(`star-details-${experienceId}`);
    const icon = button.querySelector('.toggle-icon');
    const text = button.querySelector('span:not(.toggle-icon)');
    
    if (!details) return;

    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      // Collapse
      details.style.display = 'none';
      details.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
      icon.textContent = '▶';
      text.textContent = this.currentLanguage === 'es' ? 'Ver detalles STAR' : 'View STAR Details';
    } else {
      // Expand
      details.style.display = 'block';
      details.setAttribute('aria-hidden', 'false');
      button.setAttribute('aria-expanded', 'true');
      icon.textContent = '▼';
      text.textContent = this.currentLanguage === 'es' ? 'Ocultar detalles STAR' : 'Hide STAR Details';
    }
  }

  /**
   * Format date for display
   */
  formatDate(dateString) {
    if (dateString === 'present') {
      return this.currentLanguage === 'es' ? 'Presente' : 'Present';
    }
    
    const [year, month] = dateString.split('-');
    if (!month) return year;
    
    const months = this.currentLanguage === 'es'
      ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${months[parseInt(month) - 1]} ${year}`;
  }

  /**
   * Get experiences for export (print-friendly)
   */
  getExperiencesForExport() {
    return this.experiences;
  }

  /**
   * Generate JSON-LD structured data for SEO
   */
  generateStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Luis Bonilla Villalobos",
      "jobTitle": "Software Engineer | Technical Lead | Innovation Consultant",
      "url": window.location.origin,
      "workExperience": this.experiences.map(exp => ({
        "@type": "OrganizationRole",
        "startDate": exp.period.start,
        "endDate": exp.period.end === 'present' ? new Date().toISOString().split('T')[0] : exp.period.end,
        "roleName": exp.title,
        "description": exp.summary,
        "worksFor": {
          "@type": "Organization",
          "name": exp.company || exp.title.split('–')[0].trim()
        }
      }))
    };

    // Insert or update script tag
    let scriptTag = document.getElementById('experience-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'experience-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData, null, 2);
  }
}
