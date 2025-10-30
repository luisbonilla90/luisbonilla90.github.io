import { c as createComponent, d as createAstro, b as addAttribute, a as renderTemplate, u as unescapeHTML, r as renderComponent, e as renderSlot, i as renderHead } from './astro/server-i9JiH1AB.js';
import 'kleur/colors';
/* empty css                        */
import 'clsx';

const $$Astro$3 = createAstro();
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title,
    description,
    image = "/assets/img/og-default.jpg",
    imageAlt = "Profile photo of Luis Bonilla, Software Engineer",
    article = false,
    publishedTime,
    modifiedTime,
    author = "Luis Bonilla",
    tags = [],
    canonicalURL,
    lang = "en",
    alternateURLs = {}
  } = Astro2.props;
  const siteURL = Astro2.site || "https://luisbonilla90.github.io";
  const pageURL = canonicalURL || new URL(Astro2.url.pathname, siteURL).toString();
  const imageURL = new URL(image, siteURL).toString();
  const enURL = alternateURLs.en || new URL(Astro2.url.pathname.replace(/^\/es(\/|$)/, ""), siteURL).toString();
  const esURL = alternateURLs.es || new URL("/es" + Astro2.url.pathname.replace(/^\/es(\/|$)/, ""), siteURL).toString();
  const truncatedTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;
  const truncatedDescription = description.length > 160 ? description.substring(0, 157) + "..." : description;
  return renderTemplate`<!-- Primary Meta Tags --><meta name="title"${addAttribute(truncatedTitle, "content")}><meta name="description"${addAttribute(truncatedDescription, "content")}><meta name="author"${addAttribute(author, "content")}>${tags.length > 0 && renderTemplate`<meta name="keywords"${addAttribute(tags.join(", "), "content")}>`}<link rel="canonical"${addAttribute(pageURL, "href")}><!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(article ? "article" : "website", "content")}><meta property="og:url"${addAttribute(pageURL, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(imageURL, "content")}><meta property="og:image:alt"${addAttribute(imageAlt, "content")}><meta property="og:site_name" content="Luis Bonilla - Software Engineer"><meta property="og:locale"${addAttribute(lang === "es" ? "es_CR" : "en_US", "content")}>${article && publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>`}${article && modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>`}${article && author && renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`}${article && tags.length > 0 && tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`)}<!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"${addAttribute(pageURL, "content")}><meta name="twitter:title"${addAttribute(truncatedTitle, "content")}><meta name="twitter:description"${addAttribute(truncatedDescription, "content")}><meta name="twitter:image"${addAttribute(imageURL, "content")}><meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}><meta name="twitter:creator" content="@luisbonilla90"><!-- Additional SEO Meta Tags --><meta name="robots" content="index, follow"><meta name="language"${addAttribute(lang === "es" ? "Spanish" : "English", "content")}><meta name="revisit-after" content="7 days"><!-- RSS Feed --><link rel="alternate" type="application/rss+xml" title="Luis Bonilla Blog RSS Feed" href="/rss.xml"><!-- Hreflang tags for multi-language support --><link rel="alternate" hreflang="en"${addAttribute(enURL, "href")}><link rel="alternate" hreflang="es"${addAttribute(esURL, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(enURL, "href")}>`;
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/components/seo/SEO.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$Astro$2 = createAstro();
const $$WebSiteSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$WebSiteSchema;
  const {
    name = "Luis Bonilla - Software Engineer",
    description = "Personal website and blog of Luis Bonilla, Software Engineer and Technical Lead"
  } = Astro2.props;
  const siteURL = Astro2.site || "https://luisbonilla90.github.io";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url: siteURL,
    author: {
      "@type": "Person",
      name: "Luis Bonilla"
    },
    inLanguage: ["en", "es"],
    copyrightYear: (/* @__PURE__ */ new Date()).getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: "Luis Bonilla"
    }
  };
  return renderTemplate(_a$3 || (_a$3 = __template$3(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/components/seo/WebSiteSchema.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Astro$1 = createAstro();
const $$PersonSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PersonSchema;
  const {
    name,
    jobTitle,
    description = "Software Engineer & Technical Lead with 15+ years of international experience",
    email = "lbonillav7@gmail.com",
    url,
    image = "/assets/img/profile.jpg",
    sameAs = [
      "https://github.com/luisbonilla90",
      "https://linkedin.com/in/luisbonilla90"
    ]
  } = Astro2.props;
  const siteURL = Astro2.site || "https://luisbonilla90.github.io";
  const personURL = url || siteURL;
  const imageURL = new URL(image, siteURL).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    email,
    url: personURL,
    image: imageURL,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Jos\xE9",
      addressCountry: "CR"
    },
    knowsAbout: [
      "Software Engineering",
      "Technical Leadership",
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Digital Transformation",
      "Agile Methodologies"
    ]
  };
  return renderTemplate(_a$2 || (_a$2 = __template$2(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/components/seo/PersonSchema.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$WebVitals = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<!-- Web Vitals monitoring - deferred loading after page load --><!-- Story 3: This script runs AFTER the page has loaded, so it doesn't block initial rendering --><!-- Sends Web Vitals data to Pirsch Analytics via custom events --><script type=\"module\">\n  // Defer web-vitals initialization until after page load\n  // This removes it from the critical path and improves LCP/FCP\n  window.addEventListener('load', () => {\n    // Use dynamic import to load web-vitals after LCP\n    // This avoids blocking the critical rendering path\n    import('https://cdn.jsdelivr.net/npm/web-vitals@4/+esm')\n      .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {\n        function sendToAnalytics({ name, delta, value, id }) {\n          // Send to your analytics service (e.g., Pirsch, Google Analytics, etc.)\n          console.warn(`${name}: ${delta} (${value}) [${id}]`);\n\n          // Send to Pirsch Analytics via custom event\n          // Pirsch exposes the pirsch() function globally after pa.js loads\n          if (typeof window.pirsch === 'function') {\n            try {\n              // Send metric as custom event to Pirsch\n              // Event name: \"web-vitals-{metric}\" (e.g., \"web-vitals-lcp\")\n              // Event metadata includes the actual values for analysis\n              window.pirsch(`web-vitals-${name.toLowerCase()}`, {\n                delta: Math.round(delta),\n                value: Math.round(value),\n                id: id,\n                metric_name: name,\n              });\n\n              // Additional: Send to performance debugging endpoint\n              // This allows tracking core web vitals separately for dashboard visualization\n              const metricsData = {\n                name: name,\n                delta: delta,\n                value: value,\n                id: id,\n                timestamp: new Date().toISOString(),\n                url: window.location.href,\n              };\n\n              // Send to Pirsch API endpoint (if custom tracking is enabled)\n              // Note: This is optional if Pirsch custom events are sufficient\n              if (name === 'LCP' || name === 'INP' || name === 'CLS') {\n                // Log critical metrics for monitoring\n                console.warn(`Critical Web Vital - ${name}:`, metricsData);\n              }\n            } catch (err) {\n              console.error(`Failed to send ${name} to Pirsch:`, err);\n            }\n          }\n        }\n\n        // Register callbacks for all Core Web Vitals\n        onCLS(sendToAnalytics);\n        onINP(sendToAnalytics);\n        onFCP(sendToAnalytics);\n        onLCP(sendToAnalytics);\n        onTTFB(sendToAnalytics);\n      })\n      .catch((error) => {\n        // Silently fail if web-vitals can't load\n        console.error('Web Vitals failed to load:', error);\n      });\n  });\n<\/script>"], ["<!-- Web Vitals monitoring - deferred loading after page load --><!-- Story 3: This script runs AFTER the page has loaded, so it doesn't block initial rendering --><!-- Sends Web Vitals data to Pirsch Analytics via custom events --><script type=\"module\">\n  // Defer web-vitals initialization until after page load\n  // This removes it from the critical path and improves LCP/FCP\n  window.addEventListener('load', () => {\n    // Use dynamic import to load web-vitals after LCP\n    // This avoids blocking the critical rendering path\n    import('https://cdn.jsdelivr.net/npm/web-vitals@4/+esm')\n      .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {\n        function sendToAnalytics({ name, delta, value, id }) {\n          // Send to your analytics service (e.g., Pirsch, Google Analytics, etc.)\n          console.warn(\\`\\${name}: \\${delta} (\\${value}) [\\${id}]\\`);\n\n          // Send to Pirsch Analytics via custom event\n          // Pirsch exposes the pirsch() function globally after pa.js loads\n          if (typeof window.pirsch === 'function') {\n            try {\n              // Send metric as custom event to Pirsch\n              // Event name: \"web-vitals-{metric}\" (e.g., \"web-vitals-lcp\")\n              // Event metadata includes the actual values for analysis\n              window.pirsch(\\`web-vitals-\\${name.toLowerCase()}\\`, {\n                delta: Math.round(delta),\n                value: Math.round(value),\n                id: id,\n                metric_name: name,\n              });\n\n              // Additional: Send to performance debugging endpoint\n              // This allows tracking core web vitals separately for dashboard visualization\n              const metricsData = {\n                name: name,\n                delta: delta,\n                value: value,\n                id: id,\n                timestamp: new Date().toISOString(),\n                url: window.location.href,\n              };\n\n              // Send to Pirsch API endpoint (if custom tracking is enabled)\n              // Note: This is optional if Pirsch custom events are sufficient\n              if (name === 'LCP' || name === 'INP' || name === 'CLS') {\n                // Log critical metrics for monitoring\n                console.warn(\\`Critical Web Vital - \\${name}:\\`, metricsData);\n              }\n            } catch (err) {\n              console.error(\\`Failed to send \\${name} to Pirsch:\\`, err);\n            }\n          }\n        }\n\n        // Register callbacks for all Core Web Vitals\n        onCLS(sendToAnalytics);\n        onINP(sendToAnalytics);\n        onFCP(sendToAnalytics);\n        onLCP(sendToAnalytics);\n        onTTFB(sendToAnalytics);\n      })\n      .catch((error) => {\n        // Silently fail if web-vitals can't load\n        console.error('Web Vitals failed to load:', error);\n      });\n  });\n<\/script>"])));
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/components/WebVitals.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "Luis Bonilla - Software Engineer & Technical Lead | 15+ Years Experience",
    description = "Luis Bonilla is a Software Engineer & Technical Lead specializing in React, Node.js, Python, AWS, and digital transformation. 15+ years building scalable web applications and leading technical teams.",
    lang = "en",
    image,
    imageAlt,
    article = false,
    publishedTime,
    modifiedTime,
    author,
    tags,
    includePersonSchema = false,
    alternateURLs
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<html", ' data-theme="light"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>', "</title><!-- SEO Meta Tags -->", "<!-- Structured Data -->", "", `<!-- Performance Optimization: Resource Hints --><!-- Story 2: Reduce critical path dependency chain --><!-- DNS Prefetch for external CDNs --><link rel="dns-prefetch" href="//cdn.jsdelivr.net"><link rel="dns-prefetch" href="//api.pirsch.io"><!-- Preconnect to critical external origins --><!-- Establishes early connection to reduce DNS lookup, TCP handshake, and TLS negotiation time --><link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin><link rel="preconnect" href="https://api.pirsch.io"><!-- Favicon --><link id="favicon" rel="icon" type="image/jpeg" sizes="16x16" href="assets/img/favico/favico_16.jpg"><link rel="icon" type="image/jpeg" sizes="32x32" href="assets/img/favico/favico_32.jpg"><link rel="apple-touch-icon" href="assets/img/favico/favico_32.jpg"><meta name="theme-color" content="#ffffff"><!-- Pirsch Analytics --><script defer src="https://api.pirsch.io/pa.js" id="pianjs" data-code="tF5j8R4NSp5lwzo3OlKyfK0yYtzARyLc"><\/script><!-- Initialize theme and language from localStorage --><script>
      const lastTheme = window.localStorage && window.localStorage.getItem('site_theme_v1');
      const lastLanguage = window.localStorage && window.localStorage.getItem('language');
      if (lastTheme) {document.documentElement.setAttribute("data-theme", lastTheme);}
      if (lastLanguage) {document.documentElement.setAttribute("lang", lastLanguage);}
    <\/script>`, '</head> <body> <!-- Header --> <header role="banner"> <div class="container"> <h1 class="site-title" data-i18n="header.site_title">Luis Bonilla</h1> <!-- Mobile Menu Toggle --> <button id="mobile-menu-toggle" class="mobile-menu-toggle" type="button" aria-label="Toggle navigation menu" data-i18n-aria-label="header.aria_labels.mobile_menu" aria-expanded="false" aria-controls="main-navigation"> <span class="hamburger-icon" aria-hidden="true"> <span class="hamburger-line"></span> <span class="hamburger-line"></span> <span class="hamburger-line"></span> </span> </button> <!-- Navigation --> <nav id="main-navigation" role="navigation" aria-label="Main navigation" data-i18n-aria-label="header.aria_labels.main_navigation" class="main-navigation"> <ul class="nav-menu"> <li> <a href="#about" aria-label="Navigate to About section" data-i18n-aria-label="header.aria_labels.nav_about" data-i18n="header.nav.about">About</a> </li> <li> <a href="#skills" aria-label="Navigate to Skills section" data-i18n-aria-label="header.aria_labels.nav_skills" data-i18n="header.nav.skills">Skills</a> </li> <li> <a href="#experience" aria-label="Navigate to Experience section" data-i18n-aria-label="header.aria_labels.nav_experience" data-i18n="header.nav.experience">Experience</a> </li> <li> <a href="#portfolio" aria-label="Navigate to Portfolio section" data-i18n-aria-label="header.aria_labels.nav_portfolio" data-i18n="header.nav.portfolio">Portfolio</a> </li> <li> <a href="#blog" aria-label="Navigate to Blog section" data-i18n-aria-label="header.aria_labels.nav_blog" data-i18n="header.nav.blog">Blog</a> </li> <li> <a href="#contact" aria-label="Navigate to Contact section" data-i18n-aria-label="header.aria_labels.nav_contact" data-i18n="header.nav.contact">Contact</a> </li> </ul> </nav> <!-- Theme Toggle Island --> <div class="theme-controls"> <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle between light and dark theme" data-i18n-aria-label="header.aria_labels.theme_toggle" aria-pressed="false"> <span aria-hidden="true" data-theme-icon>\u{1F319}</span> <span class="theme-toggle-text" data-i18n="header.theme_toggle">Toggle Theme</span> </button> </div> <!-- Language Switcher Island --> <div class="language-switcher"> <label for="language-select" class="visually-hidden">Select language</label> <select id="language-select" aria-label="Select language" data-current-text="EN"> <option value="en" data-flag="\u{1F1FA}\u{1F1F8}" data-text="EN">\u{1F1FA}\u{1F1F8}</option> <option value="es" data-flag="\u{1F1E8}\u{1F1F7}" data-text="ES">\u{1F1E8}\u{1F1F7}</option> </select> </div> </div> </header> <!-- Main Content --> <main role="main" id="main-content"> ', ` </main> <!-- Footer --> <footer role="contentinfo"> <div class="container"> <div class="footer-content"> <div class="footer-section"> <h3 data-i18n="footer.title">Luis Bonilla Villalobos</h3> <p data-i18n="footer.subtitle">
Software Engineer | Technical Lead | Innovation Consultant
</p> <p data-i18n="footer.description">
Passionate about creating meaningful, scalable, and maintainable solutions.
</p> </div> <div class="footer-section"> <h4 data-i18n="footer.sections.contact">Contact</h4> <p> <span aria-hidden="true">\u{1F4E7}</span> <a href="mailto:lbonillav7@gmail.com" aria-label="Email lbonillav7@gmail.com" data-i18n-aria-label="footer.aria_labels.email_lbonilla">lbonillav7@gmail.com</a> </p> <p> <span aria-hidden="true">\u{1F4CD}</span> <span data-i18n="footer.location">San Jos\xE9, Costa Rica</span> </p> </div> <div class="footer-section"> <h4 data-i18n="footer.sections.quick_links">Quick Links</h4> <nav aria-label="Footer navigation" data-i18n-aria-label="footer.aria_labels.footer_nav"> <ul> <li> <a href="#about" aria-label="Navigate to About section" data-i18n-aria-label="footer.aria_labels.nav_about" data-i18n="footer.nav.about">About</a> </li> <li> <a href="#skills" aria-label="Navigate to Skills section" data-i18n-aria-label="footer.aria_labels.nav_skills" data-i18n="footer.nav.skills">Skills</a> </li> <li> <a href="#experience" aria-label="Navigate to Experience section" data-i18n-aria-label="footer.aria_labels.nav_experience" data-i18n="footer.nav.experience">Experience</a> </li> <li> <a href="#contact" aria-label="Navigate to Contact section" data-i18n-aria-label="footer.aria_labels.nav_contact" data-i18n="footer.nav.contact">Contact</a> </li> </ul> </nav> </div> </div> <div class="footer-bottom"> <p>
&copy; <span id="year"></span> <span data-i18n="footer.copyright">Luis Bonilla Villalobos. All rights reserved.</span> </p> </div> </div> </footer> <!-- Client-side scripts for interactivity --> <!-- Module Preloading: Story 2 - Preload critical JavaScript modules --> <!-- This tells the browser to start downloading these modules early, before they're needed --> <link rel="modulepreload" href="/assets/js/main.js"> <link rel="modulepreload" href="/assets/js/core/i18n.js"> <link rel="modulepreload" href="/assets/js/core/theme-manager.js"> <script>
      // Mobile menu toggle
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const mainNavigation = document.getElementById('main-navigation');

      if (mobileMenuToggle && mainNavigation) {
        mobileMenuToggle.addEventListener('click', () => {
          const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
          mobileMenuToggle.setAttribute('aria-expanded', String(!isExpanded));
          mainNavigation.classList.toggle('nav-open');
        });

        // Close mobile menu when clicking navigation links
        const navLinks = mainNavigation.querySelectorAll('a');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mainNavigation.classList.remove('nav-open');
          });
        });
      }

      // Set current year in footer
      const yearElement = document.getElementById('year');
      if (yearElement) {
        yearElement.textContent = new Date().getFullYear().toString();
      }
    <\/script> <!-- Load theme manager and i18n as modules --> <script type="module" src="assets/js/main.js"><\/script> <!-- Web Vitals monitoring --> `, " </body></html>"])), addAttribute(lang, "lang"), title, renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "lang": lang, "image": image, "imageAlt": imageAlt, "article": article, "publishedTime": publishedTime, "modifiedTime": modifiedTime, "author": author, "tags": tags, "alternateURLs": alternateURLs }), renderComponent($$result, "WebSiteSchema", $$WebSiteSchema, {}), includePersonSchema && renderTemplate`${renderComponent($$result, "PersonSchema", $$PersonSchema, { "name": "Luis Bonilla Villalobos", "jobTitle": "Software Engineer & Technical Lead" })}`, renderHead(), renderSlot($$result, $$slots["default"]), renderComponent($$result, "WebVitals", $$WebVitals, {}));
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
