/**
 * Back to Top Button Manager
 * Handles visibility and smooth scroll behavior for mobile devices
 * Follows UX best practices for mobile navigation
 */

export class BackToTop {
  constructor() {
    this.button = document.getElementById('back-to-top-btn');
    this.scrollThreshold = 300; // pixels to scroll before showing button
    this.isVisible = false;
    
    // Store bound event handlers for proper cleanup
    this.handleClickBound = this.scrollToTop.bind(this);
    this.handleKeydownBound = this.handleKeydown.bind(this);
    
    if (this.button) {
      this.initialize();
    }
  }

  initialize() {
    // Handle scroll to show/hide button
    this.initializeScrollBehavior();
    
    // Handle button click
    this.button.addEventListener('click', this.handleClickBound);
    
    // Handle keyboard accessibility
    this.button.addEventListener('keydown', this.handleKeydownBound);
    
    console.log('Back to top button initialized successfully');
  }
  
  /**
   * Handle keydown events for keyboard accessibility
   */
  handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.scrollToTop();
    }
  }

  /**
   * Initialize scroll behavior to show/hide button
   * Uses requestAnimationFrame for performance
   */
  initializeScrollBehavior() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Handle scroll events to show/hide button
   */
  handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > this.scrollThreshold) {
      this.showButton();
    } else {
      this.hideButton();
    }
  }

  /**
   * Show the back to top button with smooth animation
   */
  showButton() {
    if (!this.isVisible) {
      this.button.classList.add('visible');
      this.button.setAttribute('aria-hidden', 'false');
      this.button.setAttribute('tabindex', '0');
      this.isVisible = true;
    }
  }

  /**
   * Hide the back to top button with smooth animation
   */
  hideButton() {
    if (this.isVisible) {
      this.button.classList.remove('visible');
      this.button.setAttribute('aria-hidden', 'true');
      this.button.setAttribute('tabindex', '-1');
      this.isVisible = false;
    }
  }

  /**
   * Scroll to top of page with smooth animation
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Cleanup method for proper component disposal
   */
  destroy() {
    if (this.button) {
      this.button.removeEventListener('click', this.handleClickBound);
      this.button.removeEventListener('keydown', this.handleKeydownBound);
    }
  }
}
