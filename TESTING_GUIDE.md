# Testing Guide

## Overview

This project includes a comprehensive suite of automated tests covering unit testing, end-to-end (E2E) testing, and accessibility testing. The testing infrastructure is designed to ensure code quality, prevent regressions, and maintain accessibility standards.

## Test Setup

### Dependencies Installed

- **Jest**: Unit testing framework
- **@testing-library/dom**: DOM testing utilities
- **@testing-library/jest-dom**: Jest matchers for DOM
- **Playwright**: E2E testing framework
- **axe-playwright**: Accessibility testing integration
- **jest-environment-jsdom**: JSDOM environment for Jest

### Installed via NPM

```bash
npm install --save-dev \
  playwright \
  @playwright/test \
  @testing-library/dom \
  @testing-library/jest-dom \
  jest-environment-jsdom \
  axe-playwright
```

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm run test:unit

# Run unit tests in watch mode
npm run test:watch

# Run unit tests with coverage report
npm run test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests in UI mode (interactive)
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug

# Run accessibility tests only
npm run test:accessibility
```

### All Tests

```bash
# Run all tests (unit + E2E)
npm run test:all
```

## Test Structure

```
tests/
├── unit/
│   ├── components/
│   │   ├── WebVitals.test.js          # Web Vitals script tests
│   │   ├── ThemeToggle.test.js        # Theme toggle functionality
│   │   ├── LanguageSelector.test.js   # Language switching
│   │   └── MobileMenu.test.js         # Mobile menu interactions
│   └── utils/
│       ├── assetPaths.test.js         # Asset path validation
│       └── i18n.test.js               # i18n functionality
└── e2e/
    ├── navigation.spec.js             # Page load and asset loading
    ├── interactivity.spec.js          # Interactive components
    ├── accessibility.spec.js          # WCAG compliance
    └── performance.spec.js            # SEO and performance
```

## Unit Tests Coverage

### Components (42 tests)

#### WebVitals Component

- ✅ Correct module import from CDN
- ✅ All required web-vitals functions available
- ✅ Proper metric handling
- ✅ Correct CDN endpoint (web-vitals@4/+esm)

#### Theme Toggle

- ✅ Default theme initialization
- ✅ Theme switching between light/dark
- ✅ localStorage persistence
- ✅ HTML data-theme attribute setting
- ✅ Missing localStorage handling
- ✅ Valid theme values

#### Language Selector

- ✅ Default language initialization
- ✅ Language switching
- ✅ localStorage persistence
- ✅ HTML lang attribute setting
- ✅ Valid language codes support
- ✅ Flag and text attributes
- ✅ Text translation

#### Mobile Menu

- ✅ Initial aria-expanded state
- ✅ Toggle functionality
- ✅ nav-open class toggling
- ✅ Accessibility attributes
- ✅ Menu closing on navigation
- ✅ Hamburger icon visibility
- ✅ State consistency

### Utilities (18 tests)

#### Asset Paths

- ✅ Relative asset paths generation
- ✅ No absolute path prefixes
- ✅ CSS filename validation (no underscore)
- ✅ Image path formatting
- ✅ JavaScript path formatting
- ✅ Asset path structure validation
- ✅ No Windows-style paths
- ✅ Complex multi-segment paths

#### i18n (Internationalization)

- ✅ Default language initialization
- ✅ Language switching
- ✅ Translation retrieval
- ✅ All keys translation (EN/ES)
- ✅ Different translations per language
- ✅ Language persistence
- ✅ Missing key handling
- ✅ Translation consistency

## E2E Tests Coverage

### Navigation & Assets (10 tests)

- ✅ Page loads without console errors
- ✅ All critical assets load (CSS, JS, images)
- ✅ Correct CSS file loaded (assets/css/slug_-Brwjqqt2.css)
- ✅ Navigation to all sections via anchors
- ✅ All major sections rendered
- ✅ Header and navigation visible
- ✅ Footer visible
- ✅ Desktop viewport responsive design
- ✅ Mobile viewport responsive design
- ✅ Tablet viewport responsive design

### Interactivity (10 tests)

- ✅ Mobile menu toggle functionality
- ✅ Mobile menu closes on navigation
- ✅ Theme toggling between light/dark
- ✅ Theme persistence across reloads
- ✅ Language switching
- ✅ Text updates on language change
- ✅ Warning banner dismissal
- ✅ Banner dismissal persistence
- ✅ Back to top scroll functionality
- ✅ All navigation links work correctly

### Accessibility (12 tests)

- ✅ No accessibility violations (axe-core)
- ✅ Proper heading hierarchy
- ✅ Alt text on images
- ✅ ARIA labels on interactive elements
- ✅ Proper semantic roles
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Descriptive link text
- ✅ Form label associations
- ✅ Dynamic content announcements
- ✅ Proper tab order
- ✅ Screen reader compatibility

### Performance & SEO (12 tests)

- ✅ Required meta tags present
- ✅ Open Graph tags present
- ✅ Twitter Card tags present
- ✅ JSON-LD structured data
- ✅ Canonical URL present
- ✅ RSS feed link present
- ✅ Favicon links present
- ✅ Web Vitals script loaded
- ✅ Proper language attribute
- ✅ Robots meta tag configured
- ✅ Analytics script loaded
- ✅ No critical asset 404 errors
- ✅ Valid HTML title

## CI/CD Integration

GitHub Actions workflow (`.github/workflows/testing.yml`) includes:

- **Lint**: Code quality checks with ESLint
- **Unit Tests**: Jest coverage reporting
- **Build**: Astro type checking and build
- **E2E Tests**: Playwright tests on Chrome, Firefox, WebKit
- **Accessibility**: Axe accessibility testing
- **Test Summary**: Automated status reporting

### Running Locally

```bash
# Install dependencies
npm install

# Run full test suite
npm run test:all

# Check linting
npm run lint

# Build project
npm run build

# Preview built site
npm run preview
```

## Coverage Goals

- **Unit Tests**: 42 tests covering 6 files
- **E2E Tests**: 34 tests across 4 categories
- **Accessibility**: WCAG AA compliance
- **Coverage Threshold**: 80% for lines and functions
- **Multi-browser**: Chrome, Firefox, Safari
- **Responsive**: Mobile, Tablet, Desktop

## Test Best Practices

1. **Isolation**: Each test is independent and doesn't affect others
2. **Clarity**: Test names clearly describe what they verify
3. **Speed**: Tests run in parallel when possible
4. **Reliability**: No flaky tests; all use appropriate waits
5. **Maintainability**: Tests use semantic selectors (data-testid, roles, aria attributes)
6. **Documentation**: Clear comments explaining complex test logic

## Debugging Tests

### Debug Unit Tests

```bash
npm run test:unit -- --verbose
```

### Debug E2E Tests

```bash
npm run test:e2e:debug
```

### Run Tests in UI Mode

```bash
npm run test:e2e:ui
```

## Adding New Tests

1. Create test file following naming convention: `*.test.js` (unit) or `*.spec.js` (E2E)
2. Follow existing test patterns and structure
3. Use semantic selectors (roles, aria-labels)
4. Add descriptive test names
5. Update this documentation with new test coverage

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Best Practices](https://testing-library.com/)
- [axe-core Accessibility Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Troubleshooting

### Tests timing out

Increase jest timeout in jest.config.js:

```javascript
testTimeout: 10000, // 10 seconds
```

### Playwright browser issues

```bash
# Install Playwright browsers
npx playwright install

# Install system dependencies
npx playwright install-deps
```

### Coverage thresholds too strict

Adjust in jest.config.js:

```javascript
coverageThreshold: {
  global: {
    branches: 70,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

## Questions?

For questions or issues with tests, please refer to the main README.md or create an issue in the repository.
