/**
 * Mobile Menu Manager
 * Handles hamburger menu toggle, scroll behavior, and accessibility
 * Follows UX principles from Smashing Magazine's sticky menu guidelines
 */

export class MobileMenu {
  constructor() {
    this.menuToggle = document.getElementById('mobile-menu-toggle');
    this.navigation = document.getElementById('main-navigation');
    this.navLinks = document.querySelectorAll('.nav-menu a');
    this.header = document.querySelector('header');
    this.body = document.body;
    
    // State management
    this.isMenuOpen = false;
    this.lastScrollTop = 0;
    this.scrollThreshold = 5; // pixels to scroll before triggering hide/show
    this.isScrolling = false;
    
    if (this.menuToggle && this.navigation) {
      this.initialize();
    }
  }

  initialize() {
    // Toggle menu on button click
    this.menuToggle.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          this.closeMenu();
        }
      });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
        this.menuToggle.focus(); // Return focus to toggle button
      }
    });
    
    // Handle partially persistent header (hide on scroll down, show on scroll up)
    this.initializeScrollBehavior();
    
    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
    
    console.log('Mobile menu initialized successfully');
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isMenuOpen = true;
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.navigation.classList.add('nav-open');
    this.body.classList.add('menu-open');
    
    // Trap focus within menu when open
    this.trapFocus();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.navigation.classList.remove('nav-open');
    this.body.classList.remove('menu-open');
  }

  /**
   * Implement partially persistent header behavior
   * Hide header on scroll down, show on scroll up
   * Following 350ms animation recommendation from Smashing Magazine
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

  handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Don't hide header if menu is open
    if (this.isMenuOpen) {
      return;
    }
    
    // Don't hide header at the very top
    if (currentScroll <= 100) {
      this.header.classList.remove('header-hidden');
      this.lastScrollTop = currentScroll;
      return;
    }
    
    // Detect scroll direction
    if (Math.abs(currentScroll - this.lastScrollTop) < this.scrollThreshold) {
      return; // Not enough scroll to trigger change
    }
    
    if (currentScroll > this.lastScrollTop) {
      // Scrolling down - hide header
      this.header.classList.add('header-hidden');
    } else {
      // Scrolling up - show header
      this.header.classList.remove('header-hidden');
    }
    
    this.lastScrollTop = currentScroll;
  }

  /**
   * Trap focus within the mobile menu when open
   * Improves keyboard navigation accessibility
   */
  trapFocus() {
    if (!this.isMenuOpen) return;
    
    const focusableElements = this.navigation.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Remove existing listener if any
    if (this.trapFocusListener) {
      document.removeEventListener('keydown', this.trapFocusListener);
    }
    
    this.trapFocusListener = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', this.trapFocusListener);
  }

  /**
   * Handle window resize
   * Close mobile menu if resizing to desktop view
   */
  handleResize() {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  /**
   * Cleanup method for proper component disposal
   */
  destroy() {
    if (this.trapFocusListener) {
      document.removeEventListener('keydown', this.trapFocusListener);
    }
  }
}
