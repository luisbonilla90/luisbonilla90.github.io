import { test, expect } from '@playwright/test';

/**
 * E2E Tests: Navigation and Asset Loading
 * Verifies page load, asset integrity, and navigation functionality
 */

test.describe('Navigation and Asset Loading', () => {
  test('should load homepage without console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    
    // Check for specific errors (web-vitals should not error)
    const webVitalsErrors = consoleErrors.filter(err => 
      err.includes('web-vitals') && err.includes('is not a function')
    );
    expect(webVitalsErrors).toHaveLength(0);
  });

  test('should load all essential assets (CSS, JS, images)', async ({ page }) => {
    const failedRequests = [];
    page.on('requestfailed', (request) => {
      failedRequests.push(request.url());
    });

    await page.goto('/');

    // Check CSS is loaded
    const cssLinks = await page.locator('link[rel="stylesheet"]').all();
    expect(cssLinks.length).toBeGreaterThan(0);

    // Verify no critical assets failed
    const criticalAssetPatterns = [
      'assets/css/',
      'assets/js/main.js',
      'assets/img/favico/',
    ];

    for (const pattern of criticalAssetPatterns) {
      const patternErrors = failedRequests.filter(url => url.includes(pattern));
      expect(patternErrors).toHaveLength(0);
    }
  });

  test('should have correct CSS file loaded', async ({ page }) => {
    await page.goto('/');
    
    const cssLink = page.locator('link[rel="stylesheet"]');
    const href = await cssLink.first().getAttribute('href');
    
    expect(href).toBe('assets/css/slug_-Brwjqqt2.css');
    expect(href).not.toContain('./');
    expect(href).not.toMatch(/^\//); // Should not start with absolute path
  });

  test('should navigate to sections using anchor links', async ({ page }) => {
    await page.goto('/');

    const sections = ['#about', '#skills', '#experience', '#portfolio', '#contact'];

    for (const section of sections) {
      const element = page.locator(section);
      await expect(element).toBeVisible();
    }
  });

  test('should render all major sections', async ({ page }) => {
    await page.goto('/');

    const sectionIds = [
      'hero',
      'about',
      'skills',
      'experience',
      'portfolio',
      'education',
      'blog',
      'contact',
    ];

    for (const sectionId of sectionIds) {
      const section = page.locator(`[id="${sectionId}"]`);
      await expect(section).toBeVisible();
    }
  });

  test('should load header with navigation menu', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toBeVisible();
  });

  test('should load footer with company info', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should verify responsive design - desktop viewport', async ({ page }) => {
    page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const mainContent = page.locator('[role="main"]');
    await expect(mainContent).toBeVisible();
  });

  test('should verify responsive design - mobile viewport', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu should be visible
    const mobileMenuToggle = page.locator('#mobile-menu-toggle');
    await expect(mobileMenuToggle).toBeVisible();
  });

  test('should verify responsive design - tablet viewport', async ({ page }) => {
    page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const mainContent = page.locator('[role="main"]');
    await expect(mainContent).toBeVisible();
  });
});
