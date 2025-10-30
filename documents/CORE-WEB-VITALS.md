# Core Web Vitals Optimization Guide

## Overview

Core Web Vitals are essential metrics for measuring user experience on the web. This guide provides strategies for optimizing these metrics in the Astro-based site.

## Current Metrics (Baseline)

### Target Values
| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint - Loading performance |
| **INP** | < 200ms | Interaction to Next Paint - Interactivity |
| **CLS** | < 0.1 | Cumulative Layout Shift - Visual stability |

### Astro Advantages

Astro provides several built-in advantages:
- **Zero JavaScript by default**: Minimal client-side execution
- **Static generation**: Pre-rendered HTML for fast delivery
- **Component islands**: Only necessary JavaScript is loaded
- **Automatic optimization**: Build-time optimizations

## Optimization Strategies

### 1. Largest Contentful Paint (LCP) < 2.5s

**What it measures**: Time to render the largest visible content element.

#### Quick Wins
```astro
<!-- ✅ Optimize above-the-fold content -->
<head>
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://api.pirsch.io" />
  
  <!-- Preload critical resources -->
  <link rel="preload" href="/assets/css/critical.css" as="style" />
  <link rel="preload" href="/assets/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
</head>

<!-- ✅ Optimize images -->
<img
  src="/assets/img/hero.jpg"
  alt="Hero image"
  loading="eager"
  decoding="async"
  fetchpriority="high"
/>
```

#### Image Optimization
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- Use Astro's Image component for automatic optimization -->
<Image
  src={heroImage}
  alt="Hero image"
  width={1200}
  height={630}
  format="webp"
  quality={80}
/>
```

#### CSS Optimization
```astro
---
// Extract critical CSS
import criticalCSS from '../styles/critical.css?inline';
---

<head>
  <!-- Inline critical CSS -->
  <style set:html={criticalCSS} />
  
  <!-- Async load non-critical CSS -->
  <link rel="stylesheet" href="/assets/css/non-critical.css" media="print" onload="this.media='all'" />
</head>
```

### 2. Interaction to Next Paint (INP) < 200ms

**What it measures**: Time from user interaction to visual response.

#### Optimization Strategies

**Minimize JavaScript**:
```astro
<!-- ❌ Avoid heavy frameworks on every page -->
<script src="/lib/heavy-framework.js"></script>

<!-- ✅ Use client directives strategically -->
<Component client:idle />          <!-- Load when page is idle -->
<Component client:visible />       <!-- Load when visible -->
<Component client:media="(min-width: 768px)" />  <!-- Conditional loading -->
```

**Debounce User Input**:
```javascript
// Debounce search input
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', debounce((e) => {
  performSearch(e.target.value);
}, 300));
```

**Optimize Event Listeners**:
```javascript
// ❌ Bad: Heavy computation on every scroll
window.addEventListener('scroll', () => {
  expensiveCalculation();
});

// ✅ Good: Throttled and optimized
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      lightweightCalculation();
      ticking = false;
    });
    ticking = true;
  }
});
```

### 3. Cumulative Layout Shift (CLS) < 0.1

**What it measures**: Visual stability - unexpected layout shifts.

#### Prevention Strategies

**Reserve Space for Images**:
```astro
<!-- ❌ Bad: No dimensions -->
<img src="/hero.jpg" alt="Hero" />

<!-- ✅ Good: Explicit dimensions -->
<img
  src="/hero.jpg"
  alt="Hero"
  width="1200"
  height="630"
  style="aspect-ratio: 1200 / 630"
/>
```

**Reserve Space for Ads/Embeds**:
```astro
<!-- Reserve space for dynamic content -->
<div class="ad-container" style="min-height: 250px">
  <!-- Ad loaded dynamically -->
</div>
```

**Use CSS Aspect Ratio**:
```css
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.image-placeholder {
  aspect-ratio: 4 / 3;
  background-color: #f0f0f0;
}
```

**Font Loading Optimization**:
```astro
<head>
  <!-- Use font-display: swap to prevent invisible text -->
  <style>
    @font-face {
      font-family: 'CustomFont';
      src: url('/fonts/custom.woff2') format('woff2');
      font-display: swap;
    }
  </style>
  
  <!-- Preload fonts -->
  <link
    rel="preload"
    href="/fonts/custom.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
</head>
```

## Implementation Checklist

### High Priority (Immediate Impact)

- [ ] **Images**
  - [ ] Add width/height to all images
  - [ ] Convert images to WebP format
  - [ ] Implement lazy loading for below-fold images
  - [ ] Use `loading="eager"` for hero images
  - [ ] Add `fetchpriority="high"` to LCP image

- [ ] **Fonts**
  - [ ] Use `font-display: swap`
  - [ ] Preload critical fonts
  - [ ] Subset fonts (only include needed characters)
  - [ ] Use system fonts as fallback

- [ ] **CSS**
  - [ ] Inline critical CSS
  - [ ] Defer non-critical CSS
  - [ ] Remove unused CSS
  - [ ] Minimize CSS file size

### Medium Priority (Measurable Impact)

- [ ] **JavaScript**
  - [ ] Audit and remove unused scripts
  - [ ] Use client directives appropriately
  - [ ] Defer non-critical scripts
  - [ ] Minimize bundle size

- [ ] **Resource Hints**
  - [ ] Add `preconnect` for external domains
  - [ ] Add `dns-prefetch` for third-party resources
  - [ ] Consider `prefetch` for likely next pages

- [ ] **Caching**
  - [ ] Configure cache headers
  - [ ] Implement service worker (optional)
  - [ ] Use CDN for static assets

### Low Priority (Polish)

- [ ] **Layout Stability**
  - [ ] Reserve space for all dynamic content
  - [ ] Use CSS transforms instead of layout properties
  - [ ] Test on various screen sizes

- [ ] **Advanced Optimizations**
  - [ ] Implement critical request chains
  - [ ] Optimize CSS delivery path
  - [ ] Consider resource bundling strategies

## Testing Tools

### Online Tools
1. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Provides Lab and Field data
   - Specific recommendations
   - Mobile and Desktop scores

2. **Lighthouse**: Built into Chrome DevTools
   - Detailed diagnostics
   - Opportunities and diagnostics
   - Best practices

3. **WebPageTest**: https://webpagetest.org/
   - Multiple test locations
   - Connection speed throttling
   - Filmstrip view

### Local Testing
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse locally
lighthouse http://localhost:4321 --view

# Run with specific device
lighthouse http://localhost:4321 --preset=desktop --view
```

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select categories (Performance, Accessibility, SEO)
4. Click "Analyze page load"

## Monitoring

### Setup Real User Monitoring (RUM)

**Google Analytics 4**:
```javascript
// Automatically tracks Core Web Vitals
gtag('config', 'GA_MEASUREMENT_ID');
```

**Pirsch Analytics** (Already integrated):
```html
<script
  defer
  src="https://api.pirsch.io/pa.js"
  id="pianjs"
  data-code="YOUR_CODE"
></script>
```

### Track Core Web Vitals Manually
```javascript
import { onCLS, onINP, onLCP } from 'web-vitals';

onCLS(console.log);
onINP(console.log);
onLCP(console.log);
```

## Common Issues and Solutions

### Issue: High LCP (> 2.5s)

**Possible Causes**:
- Large images without optimization
- Render-blocking resources
- Slow server response time
- No resource preloading

**Solutions**:
1. Optimize and compress images
2. Use modern image formats (WebP, AVIF)
3. Implement lazy loading
4. Add preconnect for external resources
5. Use CDN for asset delivery

### Issue: High INP (> 200ms)

**Possible Causes**:
- Heavy JavaScript execution
- No debouncing on inputs
- Long tasks blocking main thread
- Inefficient event handlers

**Solutions**:
1. Reduce JavaScript bundle size
2. Implement debouncing/throttling
3. Use Web Workers for heavy computation
4. Optimize event handlers
5. Use client directives in Astro

### Issue: High CLS (> 0.1)

**Possible Causes**:
- Images without dimensions
- Ads/embeds without reserved space
- Web fonts causing layout shift
- Dynamic content injection

**Solutions**:
1. Add explicit width/height to images
2. Reserve space for dynamic content
3. Use `font-display: swap`
4. Avoid inserting content above existing content
5. Use CSS transforms instead of layout properties

## Best Practices Summary

### Do's ✅
- Use Astro's built-in Image component
- Implement lazy loading for below-fold content
- Add explicit dimensions to all images
- Use client directives strategically
- Preconnect to critical external domains
- Monitor Core Web Vitals in production

### Don'ts ❌
- Don't load large JavaScript bundles unnecessarily
- Don't insert content without reserving space
- Don't use unoptimized images
- Don't block rendering with resources
- Don't ignore mobile performance
- Don't test only on fast connections

## Resources

### Official Documentation
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Astro Performance](https://docs.astro.build/en/concepts/why-astro/#fast-by-default)

### Tools
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://webpagetest.org/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [web-vitals library](https://github.com/GoogleChrome/web-vitals)

### Related Docs
- [SEO Implementation](./SEO-IMPLEMENTATION.md)
- [SEO Quick Reference](./SEO-QUICK-REFERENCE.md)

## Next Steps

1. Run initial Lighthouse audit
2. Document baseline metrics
3. Implement high-priority optimizations
4. Re-test and compare
5. Monitor in production
6. Iterate based on data
