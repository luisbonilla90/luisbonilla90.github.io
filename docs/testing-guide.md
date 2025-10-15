# Testing & Static Analysis Guide

This project uses Jest for unit testing with snapshot support and ESLint for static analysis.

## 🧪 Testing with Jest

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Snapshot Testing

Snapshots are useful for:

- UI component testing
- Configuration validation
- API response testing
- Data structure verification

#### Creating Snapshots

```javascript
test("should match component snapshot", () => {
  const component = {
    name: "MyComponent",
    props: { theme: "dark" },
  };

  expect(component).toMatchSnapshot();
});
```

#### Updating Snapshots

When you intentionally change your code and snapshots need updating:

```bash
# Update all snapshots
npm test -- -u

# Update snapshots for a specific file
npm test -- -u snapshot-example.test.js
```

### Test File Locations

- `assets/js/tests/` - JavaScript utility tests
- `src/**/__tests__/` - Component tests
- Files matching `*.test.js` or `*.spec.js`

### Example Tests

See `assets/js/tests/snapshot-example.test.js` for comprehensive examples including:

- Basic unit tests
- Snapshot testing
- DOM manipulation tests
- Mock usage

## 🔍 Static Analysis with ESLint

### Running ESLint

```bash
# Lint all files
npm run lint

# Lint and auto-fix issues
npm run lint:fix

# Check TypeScript types
npm run type-check
```

### ESLint Configuration

The project uses:

- **@eslint/js** - Core ESLint rules
- **typescript-eslint** - TypeScript-specific linting
- **eslint-plugin-astro** - Astro framework support
- **eslint-plugin-jsx-a11y** - Accessibility checks

### Key Rules

- ✅ TypeScript best practices
- ✅ Modern JavaScript standards (ES2021+)
- ✅ Accessibility (a11y) validation
- ✅ Code consistency
- ⚠️ Console.log warnings (use console.warn/error)
- 🚫 Debugger statements
- 🚫 var usage (use const/let)

### Customizing Rules

Edit `eslint.config.js` to adjust rules:

```javascript
rules: {
  'no-console': 'off', // Disable console warnings
  '@typescript-eslint/no-explicit-any': 'error', // Stricter any usage
}
```

## 📊 Coverage Reports

After running `npm run test:coverage`, view reports:

- **Terminal** - Summary in console
- **HTML** - Open `coverage/lcov-report/index.html` in browser
- **LCOV** - For CI/CD integration

### Coverage Thresholds

Add to `jest.config.js` to enforce coverage:

```javascript
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
- name: Run linting
  run: npm run lint

- name: Run tests with coverage
  run: npm run test:coverage

- name: Type check
  run: npm run type-check
```

## 🛠️ Tools Installed

### Testing

- **jest** (^29.7.0) - Test framework
- **ts-jest** (^29.2.5) - TypeScript support
- **@testing-library/jest-dom** (^6.6.3) - DOM matchers
- **jest-environment-jsdom** (^29.7.0) - Browser-like environment

### Static Analysis

- **eslint** (^9.17.0) - Linter
- **typescript-eslint** (^8.18.2) - TypeScript linting
- **eslint-plugin-astro** (^1.3.2) - Astro framework support
- **eslint-plugin-jsx-a11y** (^6.10.2) - Accessibility checks

### Type Checking

- **typescript** (^5.9.3) - Type system
- **@astrojs/check** (^0.9.4) - Astro type checking

## 💡 Best Practices

### Testing

1. Write tests alongside your code
2. Use descriptive test names
3. Keep tests isolated (use beforeEach/afterEach)
4. Mock external dependencies
5. Update snapshots thoughtfully
6. Aim for high coverage on critical paths

### Linting

1. Run `npm run lint` before commits
2. Fix warnings, not just errors
3. Use `eslint-disable` comments sparingly
4. Keep accessibility rules enabled
5. Configure your editor for live linting

### Snapshots

1. Review snapshot diffs carefully
2. Keep snapshots small and focused
3. Don't snapshot unstable data (timestamps, IDs)
4. Use inline snapshots for simple cases
5. Commit snapshots to version control

## 📝 Editor Integration

### VS Code

Install recommended extensions:

- **ESLint** - dbaeumer.vscode-eslint
- **Jest** - Orta.vscode-jest

Add to `.vscode/settings.json`:

```json
{
  "eslint.validate": ["javascript", "typescript", "astro"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 🔗 Resources

- [Jest Documentation](https://jestjs.io/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Testing Library](https://testing-library.com/)
- [Snapshot Testing](https://jestjs.io/docs/snapshot-testing)
