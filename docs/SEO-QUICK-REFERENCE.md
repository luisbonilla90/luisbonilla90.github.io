# SEO Quick Reference Guide

Quick reference for adding SEO metadata to pages and content.

## Table of Contents
- [Basic Page Setup](#basic-page-setup)
- [Blog Post Setup](#blog-post-setup)
- [Custom Schema](#custom-schema)
- [Checklist](#checklist)

## Basic Page Setup

### Standard Page
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page Title (50-60 chars)"
  description="Page description that entices clicks (150-160 chars)"
  lang="en"
>
  <!-- Your content -->
</BaseLayout>
```

### About/Author Page (with Person Schema)
```astro
<BaseLayout
  title="About Luis Bonilla"
  description="Software Engineer & Technical Lead with 15+ years experience"
  includePersonSchema={true}
>
  <!-- Your content -->
</BaseLayout>
```

### Page with Custom Image
```astro
<BaseLayout
  title="Project Showcase"
  description="Explore my latest projects"
  image="/assets/img/projects-hero.jpg"
  imageAlt="Screenshot of project dashboard"
>
  <!-- Your content -->
</BaseLayout>
```

## Blog Post Setup

### Create Blog Post

1. **Create file**: `src/content/blog/my-post.md`

2. **Add frontmatter**:
```yaml
---
title: "Your Post Title (Descriptive & Clear)"
description: "Post description that summarizes the content (150-160 chars)"
pubDate: 2024-10-14
updatedDate: 2024-10-15  # Optional, use when content is updated
author: "Luis Bonilla"
tags: ['javascript', 'web-development', 'tutorial']
lang: en
draft: false
---
```

3. **Write content**:
```markdown
# Your Post Title

Brief introduction (1-3 sentences that directly answer the main question)

## Section 1
Content...

## Section 2
Content...

## FAQ
Common questions...
```

### Blog Post with FAQ Schema

```astro
---
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';
import FAQSchema from '../../components/seo/FAQSchema.astro';

const faqs = [
  {
    question: "What is the main benefit?",
    answer: "The main benefit is improved performance and SEO."
  },
  // Add more FAQs...
];
---

<BlogPostLayout {...frontmatter}>
  <FAQSchema faqs={faqs} />
  
  <Content />
</BlogPostLayout>
```

## Custom Schema

### FAQ Page
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import FAQSchema from '../components/seo/FAQSchema.astro';

const faqs = [
  {
    question: "How do I get started?",
    answer: "Start by following the installation guide in the documentation."
  },
  {
    question: "What are the system requirements?",
    answer: "You need Node.js 18+ and npm 9+ installed."
  },
];
---

<BaseLayout title="FAQ" description="Frequently Asked Questions">
  <FAQSchema faqs={faqs} />
  
  <h1>Frequently Asked Questions</h1>
  {faqs.map(faq => (
    <div>
      <h2>{faq.question}</h2>
      <p>{faq.answer}</p>
    </div>
  ))}
</BaseLayout>
```

### Person/Author Page
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PersonSchema from '../components/seo/PersonSchema.astro';
---

<BaseLayout
  title="About Luis Bonilla"
  description="Software Engineer & Technical Lead"
>
  <PersonSchema
    name="Luis Bonilla Villalobos"
    jobTitle="Software Engineer & Technical Lead"
    description="15+ years of international experience"
    email="lbonillav7@gmail.com"
    sameAs={[
      'https://github.com/luisbonilla90',
      'https://linkedin.com/in/luisbonilla90',
    ]}
  />
  
  <!-- Your about content -->
</BaseLayout>
```

## Checklist

### Before Publishing a Page
- [ ] Title is 50-60 characters
- [ ] Description is 150-160 characters
- [ ] Description is compelling (encourages clicks)
- [ ] Image is optimized (if using custom)
- [ ] Image alt text is descriptive
- [ ] Language is set (en/es)
- [ ] Canonical URL is correct (if custom)

### Before Publishing a Blog Post
- [ ] Title is descriptive and clear
- [ ] Description summarizes the content
- [ ] Publication date is correct
- [ ] Author name is correct
- [ ] Tags are relevant and specific
- [ ] Content has clear structure (H2, H3)
- [ ] First paragraph answers the main question
- [ ] Code examples are properly formatted
- [ ] Links are valid
- [ ] Images have alt text
- [ ] Draft status is `false`

### SEO Best Practices
- [ ] Use one H1 per page
- [ ] Use hierarchical headings (H1 → H2 → H3)
- [ ] Include internal links to related content
- [ ] Use descriptive link text (not "click here")
- [ ] Add alt text to all images
- [ ] Keep paragraphs short (3-4 sentences)
- [ ] Use lists for better readability
- [ ] Include a clear call-to-action

### LLM Optimization
- [ ] Start with a direct answer
- [ ] Use clear, factual language
- [ ] Include data and statistics
- [ ] Structure content with lists
- [ ] Add FAQ section if applicable
- [ ] Include author credentials
- [ ] Update dates when content changes
- [ ] Link to authoritative sources

## Common Patterns

### Title Patterns
```
✅ Good: "Getting Started with Astro: A Beginner's Guide"
❌ Bad: "Astro"

✅ Good: "5 Tips for Better React Performance"
❌ Bad: "React Tips"

✅ Good: "Understanding JavaScript Closures with Examples"
❌ Bad: "Closures"
```

### Description Patterns
```
✅ Good: "Learn how to optimize React performance with 5 practical tips that can reduce render time by 50%."
❌ Bad: "This post is about React performance."

✅ Good: "Discover Astro's innovative island architecture and learn why it delivers the fastest websites."
❌ Bad: "An article about Astro."
```

### Tag Patterns
```
✅ Good: ['javascript', 'react', 'performance', 'web-development']
❌ Bad: ['js', 'stuff', 'coding', 'tech']

✅ Good: ['astro', 'static-site-generator', 'seo', 'tutorial']
❌ Bad: ['web', 'site', 'blog']
```

## Testing Your SEO

### Before Deploying
```bash
# Build the site
npm run build

# Check if page is in sitemap
cat dist/sitemap-0.xml | grep "your-page-slug"

# Check if blog post is in RSS
cat dist/rss.xml | grep "your-post-title"
```

### After Deploying
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Open Graph Debugger**: https://www.opengraph.xyz/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **Schema Validator**: https://validator.schema.org/

### Mobile Testing
- Test on actual mobile device
- Use Chrome DevTools mobile emulation
- Check PageSpeed Insights mobile score

## Need Help?

- See full documentation: [docs/SEO-IMPLEMENTATION.md](./SEO-IMPLEMENTATION.md)
- Review SEO strategy: [docs/SEO/seo-prop1.md](./SEO/seo-prop1.md)
- Check implementation checklist: [docs/SEO/seo-prop2.md](./SEO/seo-prop2.md)

## Quick Commands

```bash
# Build and check output
npm run build && ls -la dist/

# Preview the site
npm run preview

# Check TypeScript
npm run type-check

# Run linter
npm run lint
```
