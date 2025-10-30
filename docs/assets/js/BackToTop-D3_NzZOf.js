import { c as createComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server-i9JiH1AB.js';
import 'kleur/colors';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$SiteWarning = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["<!-- Under construction warning banner -->", '<div class="site-warning" id="site-warning" role="status" aria-live="polite" aria-label="Site under construction"> <div class="warning-content"> <span class="warning-icon" aria-hidden="true">\u26A0\uFE0F</span> <p> <strong data-i18n="site_warning.text">This site is under construction:</strong> <span data-i18n="site_warning.description">Some sections may be incomplete or currently under\n        development.</span> </p> </div> <div class="warning-actions"> <button class="btn-close" id="dismiss-warning" aria-label="Dismiss warning" data-i18n="site_warning.dismiss">\nDismiss\n</button> </div> </div> <script>\n  // Dismissible site warning - persists dismissal in sessionStorage\n  (function () {\n    const key = "siteWarningDismissed_v1";\n    const banner = document.getElementById("site-warning");\n    const btn = document.getElementById("dismiss-warning");\n\n    try {\n      if (sessionStorage && sessionStorage.getItem(key) === "true") {\n        if (banner) {\n          banner.style.display = "none";\n        }\n      }\n    } catch (_e) {\n      // ignore localStorage errors (e.g., private mode)\n    }\n\n    if (btn && banner) {\n      btn.addEventListener("click", function () {\n        banner.style.display = "none";\n        try {\n          if (sessionStorage) {\n            sessionStorage.setItem(key, "true");\n          }\n        } catch (_err) {\n          // ignore\n        }\n      });\n    }\n  })();\n<\/script>'])), maybeRenderHead());
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/components/SiteWarning.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="hero" class="hero-section" aria-labelledby="hero-title"> <div class="container"> <h1 id="hero-title" class="hero-title" data-i18n="hero.title">
Luis Bonilla Villalobos
</h1> <p class="hero-subtitle" data-i18n="hero.subtitle">
Software Engineer | Technical Lead | Innovation Consultant
</p> <p class="hero-tagline" data-i18n="hero.tagline">
Dynamic and highly creative software engineer with over 15 years of
      international experience delivering innovative solutions for leading
      companies in the US.
</p> <div class="hero-cta"> <a href="#contact" class="btn btn-primary" aria-label="Navigate to contact section" data-i18n-aria-label="hero.aria_labels.cta_contact" data-i18n="hero.cta_contact">Get In Touch</a> <a href="docs/resume.md" id="download-resume-btn" class="btn btn-secondary" aria-label="Open resume markdown" data-i18n-aria-label="hero.aria_labels.cta_resume"> <span aria-hidden="true">📄</span> <span data-i18n="hero.cta_resume">Resume</span> </a> </div> <div class="hero-contact"> <p> <span aria-hidden="true">📍</span> <span data-i18n="hero.location">San José, Costa Rica</span> </p> <p> <span aria-hidden="true">📧</span> <a href="mailto:lbonillav7@gmail.com">lbonillav7@gmail.com</a> </p> </div> </div> </section>`;
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/components/Hero.astro", void 0);

const $$Experience = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="experience" class="experience-section" aria-labelledby="experience-heading"> <div class="container"> <h2 id="experience-heading" data-i18n="experience.heading">
Professional Experience
</h2> <div class="experience-timeline" role="list"> <article class="experience-item" role="listitem"> <div class="experience-header"> <h3 data-i18n="experience.jobs.0.title">
Independent Consultant & Technology Innovation Leader
</h3> <span class="experience-period"><time datetime="2025-01">Jan 2025</time> –
<time datetime="2025-10">Present</time></span> </div> <ul class="experience-highlights"> <li data-i18n="experience.jobs.0.highlights.0">
Led digital transformation and automation projects for SMEs
            and startups, implementing SaaS solutions with clean
            architecture and modern technologies (Node.js, Python,
            PostgreSQL, Redis) capable of large-scale data processing
            (&gt;5,000 URLs/hour).
</li> <li data-i18n="experience.jobs.0.highlights.1">
Developed CI/CD pipelines, automated testing (&gt;85%
            coverage), and comprehensive monitoring (Prometheus, Grafana)
            for reliable operations.
</li> <li data-i18n="experience.jobs.0.highlights.2">
Managed cloud migrations to improve delivery speed and
            resilience; mentored teams and promoted documentation and best
            practices.
</li> <li data-i18n="experience.jobs.0.highlights.3">
Drove product R&D in media intelligence (NLP, sentiment
            analysis, reputation KPIs) from validation to go-to-market
            strategy.
</li> </ul> </article> <article class="experience-item" role="listitem"> <div class="experience-header"> <h3 data-i18n="experience.jobs.1.title">
Technical Lead – Nissan
</h3> <span class="experience-company" data-i18n="experience.jobs.1.company">via Critical Mass, Costa Rica</span> <span class="experience-period"><time datetime="2023-06">Jun 2023</time> –
<time datetime="2025-01">Jan 2025</time></span> </div> <ul class="experience-highlights"> <li data-i18n="experience.jobs.1.highlights.0">
Revitalized critical project by enforcing coding standards,
            improving efficiency and robustness
</li> <li data-i18n="experience.jobs.1.highlights.1">
Implemented comprehensive unit testing and
<strong>TDD practices</strong>, reducing regressions
</li> <li data-i18n="experience.jobs.1.highlights.2">
Streamlined code review processes and cultivated collaborative
            team environment
</li> <li data-i18n="experience.jobs.1.highlights.3">
Coordinated with multiple teams to enhance CI/CD processes and
            restore timely deployments
</li> </ul> </article> <article class="experience-item" role="listitem"> <div class="experience-header"> <h3 data-i18n="experience.jobs.2.title">
Technical Lead – Apple
</h3> <span class="experience-company" data-i18n="experience.jobs.2.company">via Critical Mass, Costa Rica</span> <span class="experience-period"><time datetime="2022-11">Nov 2022</time> –
<time datetime="2023-06">Jun 2023</time></span> </div> <ul class="experience-highlights"> <li data-i18n="experience.jobs.2.highlights.0">
Led team to improve maintainability, performance, and codebase
            cleanliness for key products
</li> <li data-i18n="experience.jobs.2.highlights.1">
Utilized Python and modern frontend technologies to optimize
            features
</li> <li data-i18n="experience.jobs.2.highlights.2">
Oversaw project delivery, including candidate interviews and
            cross-team communication
</li> </ul> </article> <article class="experience-item" role="listitem"> <div class="experience-header"> <h3 data-i18n="experience.jobs.3.title">
Full Stack Developer – Sideqik
</h3> <span class="experience-period"><time datetime="2022-02">Feb 2022</time> –
<time datetime="2022-09">Sep 2022</time></span> </div> <ul class="experience-highlights"> <li data-i18n="experience.jobs.3.highlights.0">
Contributed to an e-commerce influencer marketing platform
            delivering end-to-end features and integration tests.
</li> <li data-i18n="experience.jobs.3.highlights.1">
Worked with PostgreSQL, Ruby on Rails, Ember and Capybara;
            provided technical recommendations and database updates.
</li> </ul> </article> <article class="experience-item" role="listitem"> <div class="experience-header"> <h3 data-i18n="experience.jobs.4.title">
Front-End Lead – Sephora
</h3> <span class="experience-company" data-i18n="experience.jobs.4.company">via Stateside, Costa Rica</span> <span class="experience-period"><time datetime="2016">2016</time> –
<time datetime="2022">2022</time></span> </div> <ul class="experience-highlights"> <li data-i18n="experience.jobs.4.highlights.0">
Led front-end team for in-store event management and Beauty
            Advisor scheduling across <strong>US and Canada</strong> </li> <li data-i18n="experience.jobs.4.highlights.1">
Developed core web application components (shopping basket,
            checkout)
</li> <li data-i18n="experience.jobs.4.highlights.2">
Implemented localization and performance optimization
            frameworks
</li> <li data-i18n="experience.jobs.4.highlights.3">
Recognized for innovation:
<strong>Sephora hackathon winner, Maverik Prize nominee</strong> </li> </ul> </article> </div> </div> </section>`;
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/components/Experience.astro", void 0);

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="blog" class="blog-section" aria-labelledby="blog-heading"> <div class="container"> <h2 id="blog-heading" data-i18n="blog.heading">Latest Insights</h2> <div class="posts"> <div class="blog-placeholder" role="status" aria-live="polite"> <p> <span aria-hidden="true">📝</span> <span data-i18n="blog.placeholder">Blog posts and technical articles coming soon.</span> </p> </div> </div> </div> </section>`;
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/components/Blog.astro", void 0);

const $$BackToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="back-to-top-btn" class="back-to-top" type="button" aria-label="Scroll back to top of page" data-i18n-aria-label="header.aria_labels.back_to_top" aria-hidden="true" tabindex="-1"> <span class="back-to-top-icon" aria-hidden="true">↑</span> </button>`;
}, "/home/runner/work/luisbonilla90.github.io/luisbonilla90.github.io/src/components/BackToTop.astro", void 0);

export { $$SiteWarning as $, $$Hero as a, $$Experience as b, $$Blog as c, $$BackToTop as d };
