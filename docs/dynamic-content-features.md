# Dynamic Content & STAR Format Features

This document describes the new dynamic content features, STAR format for experiences, and analytics dashboard.

## Features Overview

### 1. STAR Format Experiences

Professional experiences now use the STAR format (Situation, Task, Action, Result) to provide structured, detailed information that's optimized for:
- **Recruiters and ATS**: Structured data helps ATS systems parse experience details
- **LLMs**: Machine-readable format enables better understanding by AI assistants
- **SEO**: JSON-LD structured data improves search engine understanding

#### Data Structure

Experience data is stored in JSON format at:
- `data/experiences/experiences-en.json` (English)
- `data/experiences/experiences-es.json` (Spanish)

Each experience includes:
```json
{
  "id": "unique-id",
  "title": "Job Title",
  "company": "Company Name",
  "location": "Location",
  "period": {
    "start": "YYYY-MM",
    "end": "YYYY-MM" or "present"
  },
  "summary": "Brief overview of the role",
  "star": {
    "situation": "Context and challenge",
    "task": "Responsibilities and goals",
    "action": "What you did and how",
    "result": "Outcomes and impact"
  },
  "highlights": ["Key achievement 1", "Key achievement 2"],
  "technologies": ["Tech1", "Tech2"]
}
```

#### UI Features

- **Collapsible STAR Details**: Each experience shows a summary by default with a toggle button to expand full STAR details
- **ARIA Accessibility**: Proper `aria-expanded`, `aria-controls`, and `aria-hidden` attributes
- **Print-Friendly**: STAR details automatically expand when printing
- **Visual Icons**: Each STAR section has a distinctive icon (📍 Situation, 🎯 Task, ⚡ Action, ✅ Result)

#### Testing

Run the STAR format validator:
```bash
node assets/js/tests/star-format-validator.js
```

This validates that all experiences have:
- Required fields (id, title, summary, star object)
- Complete STAR structure (situation, task, action, result)
- Proper data types and non-empty values

### 2. Portfolio Projects (Data Structure)

Portfolio projects are stored at:
- `data/portfolio/projects-en.json`
- `data/portfolio/projects-es.json`

Structure:
```json
{
  "projects": [
    {
      "id": "project-id",
      "title": "Project Title",
      "category": "Category",
      "status": "active|completed",
      "year": 2024,
      "description": "Short description",
      "longDescription": "Detailed description",
      "technologies": ["Tech1", "Tech2"],
      "highlights": ["Achievement 1"],
      "links": {
        "demo": "url",
        "github": "url",
        "website": "url"
      },
      "images": []
    }
  ],
  "categories": ["Category1", "Category2"]
}
```

**Note**: UI component for rendering portfolio from JSON is not yet implemented. The data structure is ready for future implementation.

### 3. Blog Posts (Data Structure)

Blog posts are stored at:
- `data/blog/posts-en.json`
- `data/blog/posts-es.json`

Structure:
```json
{
  "posts": [
    {
      "id": "post-id",
      "title": "Post Title",
      "slug": "url-slug",
      "author": "Author Name",
      "publishDate": "YYYY-MM-DD",
      "updateDate": "YYYY-MM-DD",
      "category": "Category",
      "tags": ["tag1", "tag2"],
      "excerpt": "Brief summary",
      "readTime": 8,
      "status": "published|draft",
      "featured": true|false,
      "content": "Full markdown content..."
    }
  ],
  "categories": ["Category1"],
  "featuredPosts": ["post-id1"]
}
```

**Note**: UI component for rendering blog from JSON is not yet implemented. The data structure is ready for future implementation.

### 4. Analytics Dashboard

A private analytics dashboard is available at `/dashboard.html`.

#### Features

- **Authentication**: Simple password protection (default password: "password")
- **Key Metrics**:
  - Total Visits
  - CTA Clicks
  - Top Referrer/Traffic Source
- **Gamification**: Achievement badges system
  - Welcome Visitor (1st visit)
  - 100 Visits
  - 1,000 Visits
  - First Contact
  - 10 Contacts (locked example)
  - Viral (10k visits) (locked example)

#### Current State

The dashboard currently displays **mock data** for demonstration purposes. 

#### Future Integration

To integrate with Pirsch Analytics API:
1. Obtain Pirsch API access token
2. Update dashboard.html to fetch from Pirsch API endpoints
3. Replace mock data with real analytics

Example Pirsch API integration:
```javascript
async function fetchPirschData() {
  const response = await fetch('https://api.pirsch.io/api/v1/statistics', {
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN'
    }
  });
  return await response.json();
}
```

### 5. SEO Enhancements

#### JSON-LD Structured Data

The Experience Manager automatically generates JSON-LD structured data for professional experiences, which is inserted into the page `<head>`. This helps search engines and AI systems better understand the content.

Example generated JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Luis Bonilla Villalobos",
  "jobTitle": "Software Engineer | Technical Lead | Innovation Consultant",
  "workExperience": [
    {
      "@type": "OrganizationRole",
      "startDate": "2025-01",
      "endDate": "2025-10-10",
      "roleName": "Independent Consultant & Technology Innovation Leader",
      "description": "Led digital transformation projects..."
    }
  ]
}
```

## File Structure

```
/
├── data/
│   ├── experiences/
│   │   ├── experiences-en.json
│   │   └── experiences-es.json
│   ├── portfolio/
│   │   ├── projects-en.json
│   │   └── projects-es.json
│   └── blog/
│       ├── posts-en.json
│       └── posts-es.json
├── assets/
│   ├── css/
│   │   └── components/
│   │       └── experience-star.css
│   └── js/
│       ├── components/
│       │   └── experience-manager.js
│       └── tests/
│           └── star-format-validator.js
└── dashboard.html
```

## Usage

### Adding a New Experience

1. Edit `data/experiences/experiences-en.json` and `experiences-es.json`
2. Add a new experience object following the structure above
3. Run the validator to ensure data integrity:
   ```bash
   node assets/js/tests/star-format-validator.js
   ```
4. The experience will automatically appear on the site

### Accessing the Dashboard

1. Navigate to `/dashboard.html`
2. Enter the password (default: "password")
3. View metrics and badges

**Security Note**: For production use, implement proper backend authentication and never store passwords in client-side code.

### Expanding STAR Details

Users can click the "View STAR Details" button on any experience to see the full STAR breakdown. The button toggles between expanded and collapsed states with proper ARIA attributes for accessibility.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 Modules support required
- Crypto API for password hashing (dashboard)

## Accessibility

- Full ARIA support for expandable/collapsible sections
- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatible
- Print-friendly styles

## Performance

- Lazy loading of experience data
- Minimal JavaScript footprint
- CSS animations respect `prefers-reduced-motion`
- Efficient DOM manipulation

## Future Enhancements

1. **Portfolio Component**: Build dynamic portfolio renderer from JSON data
2. **Blog Component**: Build dynamic blog post renderer with markdown support
3. **Search/Filter**: Add search and filter functionality for experiences, projects, and posts
4. **Real Analytics**: Integrate with Pirsch API for real-time data
5. **Export Functionality**: Add ability to export experiences in PDF format
6. **More Badges**: Expand gamification system with more achievement types
7. **Analytics Charts**: Add visual charts for metrics over time

## Contributing

When adding new content:
1. Follow the JSON structure defined in this document
2. Update both English and Spanish versions
3. Run validation tests
4. Ensure accessibility standards are maintained
5. Test on multiple browsers and devices
