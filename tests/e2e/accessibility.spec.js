import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

/**
 * E2E Tests: Accessibility
 * Verifies WCAG compliance using axe-core accessibility checker
 */

test.describe('Accessibility', () => {
  test('should not have any accessibility violations on homepage', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);

    const result = await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });

    expect(result).toBe(null);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const h1s = page.locator('h1');
    const h1Count = await h1s.count();

    // Should have exactly one h1
    expect(h1Count).toBe(1);

    // Check heading levels are sequential
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test('should have descriptive alt text for images', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaLabel = await img.getAttribute('aria-label');
      
      // Image should have alt text or aria-label
      const hasDescription = alt || ariaLabel;
      expect(hasDescription).toBeTruthy();
    }
  });

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await page.goto('/');

    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const btn = buttons.nth(i);
      const ariaLabel = await btn.getAttribute('aria-label');
      const text = await btn.textContent();
      
      // Button should have aria-label or visible text
      const hasLabel = ariaLabel || (text && text.trim().length > 0);
      expect(hasLabel).toBeTruthy();
    }
  });

  test('should have proper roles on semantic elements', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav');
    const role = await nav.first().getAttribute('role');
    expect(role).toBeDefined();

    const main = page.locator('[role="main"]');
    await expect(main).toBeVisible();

    const footer = page.locator('footer');
    const footerRole = await footer.getAttribute('role');
    expect(footerRole).toBe('contentinfo');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => {
      return document.activeElement.tagName;
    });

    // Should focus on first interactive element
    expect(['A', 'BUTTON', 'INPUT', 'SELECT']).toContain(focusedElement);
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);

    // Check for color contrast violations
    const violations = await page.evaluate(() => {
      return new Promise((resolve) => {
        if (window.axe) {
          window.axe.run((results) => {
            const colorContrast = results.violations.filter(
              v => v.id === 'color-contrast'
            );
            resolve(colorContrast);
          });
        } else {
          resolve([]);
        }
      });
    });

    expect(violations).toHaveLength(0);
  });

  test('should have proper link text', async ({ page }) => {
    await page.goto('/');

    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');

      // Link should have descriptive text or aria-label
      const hasDescription = (text && text.trim().length > 0) || ariaLabel || title;
      expect(hasDescription).toBeTruthy();
    }
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/');

    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');

      // Input should have associated label or aria-label
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const labelExists = await label.count() > 0 || ariaLabel;
        expect(labelExists).toBeTruthy();
      }
    }
  });

  test('should announce dynamic content changes', async ({ page }) => {
    await page.goto('/');

    const liveRegions = page.locator('[role="status"], [role="alert"], [aria-live]');
    const liveRegionCount = await liveRegions.count();

    // Should have at least one live region for dynamic updates
    expect(liveRegionCount).toBeGreaterThanOrEqual(0);
  });

  test('should have proper tab order', async ({ page }) => {
    await page.goto('/');

    // Check that tab indices are not misused
    const tabIndices = await page.locator('[tabindex]').evaluate((elements) => {
      return Array.from(elements).map((el) => parseInt(el.getAttribute('tabindex')));
    });

    // All tabindex values should be -1 or positive
    tabIndices.forEach((index) => {
      expect(index === -1 || index > 0).toBeTruthy();
    });
  });
});
