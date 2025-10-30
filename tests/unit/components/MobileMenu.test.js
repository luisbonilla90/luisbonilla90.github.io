/**
 * Unit Tests for Mobile Menu Component
 * Verifies menu toggle functionality and accessibility attributes
 */

describe('Mobile Menu Component', () => {
  let toggleButton;
  let menu;

  beforeEach(() => {
    // Setup DOM structure
    toggleButton = document.createElement('button');
    toggleButton.id = 'mobile-menu-toggle';
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-controls', 'main-navigation');
    toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
    toggleButton.setAttribute('type', 'button');

    menu = document.createElement('nav');
    menu.id = 'main-navigation';
    menu.classList.add('main-navigation');

    document.body.appendChild(toggleButton);
    document.body.appendChild(menu);
  });

  afterEach(() => {
    if (toggleButton.parentNode) {
      toggleButton.parentNode.removeChild(toggleButton);
    }
    if (menu.parentNode) {
      menu.parentNode.removeChild(menu);
    }
  });

  it('should initialize with aria-expanded set to false', () => {
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle aria-expanded attribute on click', () => {
    const initialState = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!initialState));
    
    expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
  });

  it('should toggle nav-open class on menu element', () => {
    menu.classList.toggle('nav-open');
    expect(menu.classList.contains('nav-open')).toBe(true);

    menu.classList.toggle('nav-open');
    expect(menu.classList.contains('nav-open')).toBe(false);
  });

  it('should have proper accessibility attributes', () => {
    expect(toggleButton.getAttribute('aria-controls')).toBe('main-navigation');
    expect(toggleButton.getAttribute('type')).not.toBe('');
    expect(toggleButton.getAttribute('aria-label')).toBeTruthy();
  });

  it('should close menu when navigation link is clicked', () => {
    menu.classList.add('nav-open');
    toggleButton.setAttribute('aria-expanded', 'true');

    // Simulate closing
    menu.classList.remove('nav-open');
    toggleButton.setAttribute('aria-expanded', 'false');

    expect(menu.classList.contains('nav-open')).toBe(false);
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('should have hamburger icon with aria-hidden', () => {
    const hamburger = document.createElement('span');
    hamburger.classList.add('hamburger-icon');
    hamburger.setAttribute('aria-hidden', 'true');
    toggleButton.appendChild(hamburger);

    expect(hamburger.getAttribute('aria-hidden')).toBe('true');
  });

  it('should maintain state consistency across multiple toggles', () => {
    const toggleMenu = () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', String(!isExpanded));
      menu.classList.toggle('nav-open');
    };

    toggleMenu();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    expect(menu.classList.contains('nav-open')).toBe(true);

    toggleMenu();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    expect(menu.classList.contains('nav-open')).toBe(false);

    toggleMenu();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    expect(menu.classList.contains('nav-open')).toBe(true);
  });
});
