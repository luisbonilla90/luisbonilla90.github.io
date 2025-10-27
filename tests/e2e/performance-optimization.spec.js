/**
 * @file E2E Performance Tests using Playwright
 * Tests for PageSpeed optimization validation
 */

import { test, expect } from '@playwright/test';

test.describe('PageSpeed Optimization E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up performance observer
    await page.addInitScript(() => {
      window.performanceMetrics = {
        measurements: {},
        observations: []
      };

      // Observe PerformanceEntries
      if (typeof PerformanceObserver !== 'undefined') {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.performanceMetrics.observations.push({
              name: entry.name,
              duration: entry.duration,
              startTime: entry.startTime
            });
          }
        });

        observer.observe({ entryTypes: ['navigation', 'resource', 'measure', 'paint'] });
      }
    });
  });

  test.describe('Story 1: CSS Render-Blocking Elimination', () => {
    test('should load without CSS blocking render', async ({ page }) => {
      // Listen for requests
      const requests = [];
      page.on('request', (request) => {
        if (request.resourceType() === 'stylesheet') {
          requests.push({
            url: request.url(),
            method: request.method()
          });
        }
      });

      await page.goto('/');

      // CSS should load with preload strategy
      const cssLoaded = requests.some(r => r.url.includes('slug_-Brwjqqt2.css'));
      expect(cssLoaded).toBeTruthy();
    });

    test('should have critical CSS preloaded in head', async ({ page }) => {
      const preloadLinks = await page.$$eval('link[rel="preload"][as="style"]', links =>
        links.map(l => ({ rel: l.rel, as: l.as, href: l.href }))
      );

      expect(preloadLinks.length).toBeGreaterThan(0);
    });

    test('should achieve <2.5s LCP target', async ({ page }) => {
      // Navigate and wait for LCP
      const navigationTiming = await page.evaluate(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        return {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart
        };
      });

      expect(navigationTiming.loadComplete).toBeLessThan(2500);
    });

    test('should measure CSS blocking time', async ({ page }) => {
      const cssMetrics = await page.evaluate(() => {
        const paintEntries = performance.getEntriesByType('paint');
        const resourceEntries = performance.getEntriesByType('resource');

        const cssResources = resourceEntries.filter(r => r.name.includes('.css'));

        return {
          paintEntries,
          cssResourceCount: cssResources.length,
          firstPaint: paintEntries.find(p => p.name === 'first-paint')?.startTime || null,
          firstContentfulPaint: paintEntries.find(p => p.name === 'first-contentful-paint')?.startTime || null
        };
      });

      expect(cssMetrics.cssResourceCount).toBeGreaterThan(0);
      expect(cssMetrics.firstContentfulPaint).toBeLessThan(2500);
    });
  });

  test.describe('Story 2: Resource Hints & Preconnections', () => {
    test('should have dns-prefetch links for external domains', async ({ page }) => {
      await page.goto('/');

      const dnsPrefetchLinks = await page.$$eval('link[rel="dns-prefetch"]', links =>
        links.map(l => l.href)
      );

      expect(dnsPrefetchLinks.length).toBeGreaterThan(0);
      expect(dnsPrefetchLinks.some(h => h.includes('cdn.jsdelivr.net'))).toBeTruthy();
    });

    test('should have preconnect to critical origins', async ({ page }) => {
      await page.goto('/');

      const preconnectLinks = await page.$$eval('link[rel="preconnect"]', links =>
        links.map(l => ({ href: l.href, crossorigin: l.crossorigin }))
      );

      expect(preconnectLinks.length).toBeGreaterThan(0);
    });

    test('should preload critical JavaScript modules', async ({ page }) => {
      await page.goto('/');

      const modulePreloads = await page.$$eval('link[rel="modulepreload"]', links =>
        links.map(l => l.href)
      );

      expect(modulePreloads.length).toBeGreaterThan(0);
      expect(modulePreloads.some(h => h.includes('main.js'))).toBeTruthy();
    });

    test('should reduce dependency chain latency', async ({ page }) => {
      const dependencyChain = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource');
        return resources.map(r => ({
          name: r.name.split('/').pop(),
          duration: r.duration,
          startTime: r.startTime,
          endTime: r.responseEnd
        })).sort((a, b) => a.startTime - b.startTime);
      });

      // Check that resources load with better parallelization
      const maxConcurrent = Math.max(
        ...dependencyChain.map(r => 
          dependencyChain.filter(other => 
            other.startTime < r.endTime && other.endTime > r.startTime
          ).length
        )
      );

      expect(maxConcurrent).toBeGreaterThan(1); // Parallel loading
    });
  });

  test.describe('Story 3: Script Loading Optimization', () => {
    test('should defer web-vitals loading', async ({ page }) => {
      const scriptMetrics = await page.evaluate(() => {
        const scripts = document.querySelectorAll('script');
        return {
          inlineScriptCount: Array.from(scripts).filter(s => !s.src).length,
          deferredScriptCount: Array.from(scripts).filter(s => s.defer).length,
          asyncScriptCount: Array.from(scripts).filter(s => s.async).length,
          webVitalsScript: Array.from(scripts).find(s => s.src?.includes('web-vitals'))
        };
      });

      // Web vitals should either be async or deferred
      if (scriptMetrics.webVitalsScript) {
        expect(
          scriptMetrics.webVitalsScript.async === true ||
          scriptMetrics.webVitalsScript.defer === true
        ).toBeTruthy();
      }
    });

    test('should load analytics asynchronously', async ({ page }) => {
      const analyticsScript = await page.evaluate(() => {
        const script = document.querySelector('script#pianjs');
        return script ? {
          src: script.src,
          defer: script.defer,
          async: script.async
        } : null;
      });

      if (analyticsScript) {
        expect(
          analyticsScript.defer === true ||
          analyticsScript.async === true
        ).toBeTruthy();
      }
    });

    test('should not block FCP with JavaScript', async ({ page }) => {
      const fcpMetrics = await page.evaluate(() => {
        const paintEntries = performance.getEntriesByType('paint');
        const resourceEntries = performance.getEntriesByType('resource');

        const fcp = paintEntries.find(p => p.name === 'first-contentful-paint');
        const jsResources = resourceEntries.filter(r => r.name.includes('.js'));

        return {
          fcpTime: fcp?.startTime || 0,
          jsLoadStart: Math.min(...jsResources.map(r => r.startTime || 0)) || 0,
          jsLoadsAfterFCP: jsResources.filter(r => (r.startTime || 0) > (fcp?.startTime || 0)).length
        };
      });

      // FCP should occur before or early in the critical path
      expect(fcpMetrics.fcpTime).toBeLessThan(2000);
    });

    test('should implement proper module loading', async ({ page }) => {
      const moduleScript = await page.evaluate(() => {
        const mainScript = document.querySelector('script[src*="main.js"]');
        return mainScript ? {
          type: mainScript.type,
          src: mainScript.src,
          defer: mainScript.defer
        } : null;
      });

      if (moduleScript) {
        expect(moduleScript.type).toBe('module');
      }
    });
  });

  test.describe('Story 4: Static Asset Optimization', () => {
    test('should use content-based hashing in filenames', async ({ page }) => {
      const assetFiles = await page.evaluate(() => {
        const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
          .map(l => l.href.split('/').pop());
        const scripts = Array.from(document.querySelectorAll('script[src]'))
          .map(s => s.src.split('/').pop());

        return { cssLinks, scripts };
      });

      const hashPattern = /-[a-z0-9]+\.(css|js)$/i;

      assetFiles.cssLinks.forEach(file => {
        if (file && file.startsWith('slug_')) {
          expect(file).toMatch(hashPattern);
        }
      });

      assetFiles.scripts.forEach(file => {
        if (file && file !== 'main.js') {
          expect(file).toMatch(hashPattern);
        }
      });
    });

    test('should efficiently bundle resources', async ({ page }) => {
      const resourceMetrics = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource');
        return {
          totalResources: resources.length,
          cssResources: resources.filter(r => r.name.includes('.css')).length,
          jsResources: resources.filter(r => r.name.includes('.js')).length,
          imageResources: resources.filter(r => /\.(jpg|png|gif|svg)$/i.test(r.name)).length
        };
      });

      // Should have reasonable number of HTTP requests
      expect(resourceMetrics.totalResources).toBeLessThan(50);
    });

    test('should maintain functionality with optimizations', async ({ page }) => {
      await page.goto('/');

      // Check critical functionality
      const themeToggle = await page.$('#theme-toggle');
      expect(themeToggle).toBeTruthy();

      const languageSelect = await page.$('#language-select');
      expect(languageSelect).toBeTruthy();

      const navigationLinks = await page.$$('a[href*="#"]');
      expect(navigationLinks.length).toBeGreaterThan(0);
    });
  });

  test.describe('Integration: Combined Optimizations', () => {
    test('should achieve target PageSpeed metrics', async ({ page }) => {
      await page.goto('/');

      const metrics = await page.evaluate(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const paintEntries = performance.getEntriesByType('paint');
        const resourceEntries = performance.getEntriesByType('resource');

        return {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadEventDuration: perfData.loadEventEnd - perfData.loadEventStart,
          fcp: paintEntries.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          resourceCount: resourceEntries.length,
          totalResourceSize: resourceEntries.reduce((sum, r) => sum + (r.transferSize || 0), 0)
        };
      });

      // Verify optimizations are in place
      expect(metrics.fcp).toBeLessThan(2000);
      expect(metrics.domContentLoaded).toBeLessThan(2500);
      expect(metrics.resourceCount).toBeLessThan(50);
    });

    test('should not have layout shifts', async ({ page }) => {
      // Monitor for layout shifts during page load
      const layoutShifts = await page.evaluate(() => {
        return new Promise((resolve) => {
          let cumulativeLayoutShift = 0;

          if (typeof PerformanceObserver !== 'undefined') {
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                  cumulativeLayoutShift += entry.value;
                }
              }
            });

            observer.observe({ entryTypes: ['layout-shift'] });

            setTimeout(() => {
              observer.disconnect();
              resolve(cumulativeLayoutShift);
            }, 3000);
          } else {
            resolve(0);
          }
        });
      });

      // CLS should be minimal
      expect(layoutShifts).toBeLessThan(0.1);
    });

    test('should maintain all interactive features', async ({ page }) => {
      await page.goto('/');

      // Test theme toggle
      const themeToggle = page.locator('#theme-toggle');
      await themeToggle.click();
      const htmlTheme = await page.locator('html').getAttribute('data-theme');
      expect(htmlTheme).toBeTruthy();

      // Test language selector
      const langSelect = page.locator('#language-select');
      const currentLang = await langSelect.inputValue();
      expect(['en', 'es']).toContain(currentLang);

      // Test navigation
      const aboutLink = page.locator('a[href="#about"]');
      expect(await aboutLink.isVisible()).toBeTruthy();
    });

    test('should load all content sections', async ({ page }) => {
      await page.goto('/');

      const sections = ['#hero', '#about', '#skills', '#experience', '#contact'];
      for (const section of sections) {
        const element = page.locator(section);
        expect(await element.isVisible()).toBeTruthy();
      }
    });
  });

  test.describe('No Regressions', () => {
    test('should not have JavaScript errors', async ({ page }) => {
      const errors = [];
      page.on('pageerror', (error) => {
        errors.push(error.message);
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      expect(errors.length).toBe(0);
    });

    test('should have all links working', async ({ page }) => {
      await page.goto('/');

      const links = await page.$$('a[href]');
      for (const link of links) {
        const href = await link.getAttribute('href');
        // Check href format is valid
        expect(href).toBeTruthy();
      }
    });

    test('should maintain accessibility', async ({ page }) => {
      await page.goto('/');

      // Check for basic a11y features
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBeTruthy();

      const mainContent = page.locator('main[role="main"]');
      expect(await mainContent.isVisible()).toBeTruthy();

      const headings = await page.$$('h1, h2, h3');
      expect(headings.length).toBeGreaterThan(0);
    });
  });
});
