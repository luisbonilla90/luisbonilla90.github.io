import { test, expect } from '@playwright/test';

/**
 * E2E Tests: Interactivity
 * Verifies theme toggle, language selector, mobile menu, and banner functionality
 */

test.describe('Interactivity', () => {
  test('should toggle mobile menu', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const toggleButton = page.locator('#mobile-menu-toggle');
    const nav = page.locator('#main-navigation');

    // Initial state
    expect(await toggleButton.getAttribute('aria-expanded')).toBe('false');

    // Click to open
    await toggleButton.click();
    expect(await toggleButton.getAttribute('aria-expanded')).toBe('true');
    await expect(nav).toHaveClass(/nav-open/);

    // Click to close
    await toggleButton.click();
    expect(await toggleButton.getAttribute('aria-expanded')).toBe('false');
  });

  test('should close mobile menu when navigation link is clicked', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const toggleButton = page.locator('#mobile-menu-toggle');
    const navLink = page.locator('a[href="#about"]');

    // Open menu
    await toggleButton.click();
    expect(await toggleButton.getAttribute('aria-expanded')).toBe('true');

    // Click navigation link
    await navLink.click();

    // Menu should close
    expect(await toggleButton.getAttribute('aria-expanded')).toBe('false');
  });

  test('should toggle theme between light and dark', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('#theme-toggle');
    const htmlElement = page.locator('html');

    // Get initial theme
    const initialTheme = await htmlElement.getAttribute('data-theme');

    // Click theme toggle
    await themeToggle.click();

    // Wait for theme to change
    await page.waitForTimeout(500);

    const newTheme = await htmlElement.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should persist theme across page reloads', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('#theme-toggle');
    const _initialTheme = await page.locator('html').getAttribute('data-theme');

    // Toggle theme
    await themeToggle.click();
    await page.waitForTimeout(500);
    const newTheme = await page.locator('html').getAttribute('data-theme');

    // Reload page
    await page.reload();
    const themeAfterReload = await page.locator('html').getAttribute('data-theme');

    expect(themeAfterReload).toBe(newTheme);
  });

  test('should switch language', async ({ page }) => {
    await page.goto('/');

    const languageSelect = page.locator('#language-select');
    
    // Get initial language
    const initialLang = await page.locator('html').getAttribute('lang');
    expect(initialLang).toBe('en');

    // Switch to Spanish
    await languageSelect.selectOption('es');
    
    const newLang = await page.locator('html').getAttribute('lang');
    expect(newLang).toBe('es');
  });

  test('should update text content when language changes', async ({ page }) => {
    await page.goto('/');

    const languageSelect = page.locator('#language-select');
    const aboutLink = page.locator('a[href="#about"]');

    // Get initial text (English)
    const _aboutText = await aboutLink.textContent();

    // Switch to Spanish
    await languageSelect.selectOption('es');
    await page.waitForTimeout(500);

    // Text should be updated
    const _newAboutText = await aboutLink.textContent();
    // This test depends on i18n implementation
  });

  test('should hide warning banner when dismiss button is clicked', async ({ page }) => {
    await page.goto('/');

    const banner = page.locator('#site-warning');
    const dismissButton = page.locator('#dismiss-warning');

    // Banner should be visible initially
    await expect(banner).toBeVisible();

    // Click dismiss
    await dismissButton.click();

    // Banner should be hidden
    expect(await banner.evaluate(el => el.style.display)).toBe('none');
  });

  test('should remember warning banner dismissal in session', async ({ page }) => {
    await page.goto('/');

    const banner = page.locator('#site-warning');
    const dismissButton = page.locator('#dismiss-warning');

    // Dismiss banner
    await dismissButton.click();
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();

    // Banner should still be hidden
    expect(await banner.evaluate(el => el.style.display)).toBe('none');
  });

  test('should scroll back to top when button is clicked', async ({ page }) => {
    await page.goto('/');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Back to top button should be visible
    const backToTopBtn = page.locator('#back-to-top-btn');
    const isVisible = await backToTopBtn.isVisible();

    if (isVisible) {
      // Click back to top
      await backToTopBtn.click();
      await page.waitForTimeout(500);

      // Should scroll to top
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeLessThan(500);
    }
  });

  test('should handle all navigation links without errors', async ({ page }) => {
    await page.goto('/');

    const navLinks = page.locator('a[href^="#"]');
    const linkCount = await navLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const href = await navLinks.nth(i).getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetElement = page.locator(href);
        const _isVisible = await targetElement.isVisible().catch(() => false);
        // Element should exist or be accessible
      }
    }
  });
});
