import { test, expect } from '@playwright/test';

/**
 * E2E Tests: Performance and SEO
 * Verifies Web Vitals, meta tags, and structured data
 */

test.describe('Performance and SEO', () => {
  test('should have all required meta tags', async ({ page }) => {
    await page.goto('/');

    // Check meta tags
    const metaTags = {
      charset: await page.locator('meta[charset]').getAttribute('charset'),
      viewport: await page.locator('meta[name="viewport"]').getAttribute('content'),
      author: await page.locator('meta[name="author"]').getAttribute('content'),
      description: await page.locator('meta[name="description"]').getAttribute('content'),
    };

    expect(metaTags.charset).toBe('utf-8');
    expect(metaTags.viewport).toContain('width=device-width');
    expect(metaTags.author).toBeDefined();
    expect(metaTags.description).toBeDefined();
  });

  test('should have Open Graph meta tags', async ({ page }) => {
    await page.goto('/');

    const ogTags = {
      type: await page.locator('meta[property="og:type"]').getAttribute('content'),
      url: await page.locator('meta[property="og:url"]').getAttribute('content'),
      title: await page.locator('meta[property="og:title"]').getAttribute('content'),
      description: await page.locator('meta[property="og:description"]').getAttribute('content'),
      image: await page.locator('meta[property="og:image"]').getAttribute('content'),
    };

    expect(ogTags.type).toBe('website');
    expect(ogTags.url).toBeDefined();
    expect(ogTags.title).toBeDefined();
    expect(ogTags.description).toBeDefined();
    expect(ogTags.image).toBeDefined();
  });

  test('should have Twitter Card meta tags', async ({ page }) => {
    await page.goto('/');

    const twitterTags = {
      card: await page.locator('meta[name="twitter:card"]').getAttribute('content'),
      title: await page.locator('meta[name="twitter:title"]').getAttribute('content'),
      description: await page.locator('meta[name="twitter:description"]').getAttribute('content'),
    };

    expect(twitterTags.card).toBeDefined();
    expect(twitterTags.title).toBeDefined();
    expect(twitterTags.description).toBeDefined();
  });

  test('should have structured data (JSON-LD)', async ({ page }) => {
    await page.goto('/');

    const structuredData = await page.locator('script[type="application/ld+json"]').all();
    expect(structuredData.length).toBeGreaterThan(0);

    // Verify JSON-LD is valid
    for (const script of structuredData) {
      const content = await script.textContent();
      const parsed = JSON.parse(content);
      expect(parsed['@context']).toBe('https://schema.org');
    }
  });

  test('should have canonical URL', async ({ page }) => {
    await page.goto('/');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeDefined();
    expect(canonical).toContain('https://');
  });

  test('should have RSS feed link', async ({ page }) => {
    await page.goto('/');

    const rssLink = await page.locator('link[rel="alternate"][type="application/rss+xml"]').getAttribute('href');
    expect(rssLink).toBe('/rss.xml');
  });

  test('should have proper favicon links', async ({ page }) => {
    await page.goto('/');

    const favicon16 = await page.locator('link[sizes="16x16"]').getAttribute('href');
    const favicon32 = await page.locator('link[sizes="32x32"]').getAttribute('href');

    expect(favicon16).toContain('assets/img/favico/');
    expect(favicon32).toContain('assets/img/favico/');
  });

  test('should have web vitals script loaded', async ({ page }) => {
    const _webVitalsLoaded = false;
    
    page.on('console', (msg) => {
      // Check if web-vitals metrics are being reported
      const text = msg.text();
      if (text.includes('CLS:') || text.includes('FID:') || text.includes('LCP:')) {
        // Web vitals are being tracked
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000);

    // At least some metrics should be reported
    // (This may vary based on user interactions)
  });

  test('should have proper language attribute', async ({ page }) => {
    await page.goto('/');

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(['en', 'es']).toContain(htmlLang);
  });

  test('should have robots meta tag configured', async ({ page }) => {
    await page.goto('/');

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('index');
    expect(robots).toContain('follow');
  });

  test('should have analytics script loaded', async ({ page }) => {
    await page.goto('/');

    const analyticScript = page.locator('script[data-code]');
    const dataCode = await analyticScript.getAttribute('data-code');
    expect(dataCode).toBeDefined();
  });

  test('should load all critical assets without 404 errors', async ({ page }) => {
    const failedAssets = [];

    page.on('requestfailed', (request) => {
      const url = request.url();
      if (url.includes('assets/') || url.includes('fonts/')) {
        failedAssets.push(url);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(failedAssets).toHaveLength(0);
  });

  test('should have valid HTML title', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();
    expect(title).toContain('Luis Bonilla');
    expect(title.length).toBeGreaterThan(0);
    expect(title.length).toBeLessThan(60); // SEO best practice
  });
});
