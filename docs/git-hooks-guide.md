# Git Hooks Guide

This project uses **Husky** and **lint-staged** to ensure code quality through automated pre-commit hooks.

## What Happens on Commit?

When you run `git commit`, the following checks are automatically executed:

### 1. Lint-staged (Fast Checks on Changed Files)

- **ESLint**: Automatically lints and fixes issues in staged `.js`, `.ts`, and `.astro` files
- **Related Tests**: Runs Jest tests only for files related to your changes

### 2. Full Test Suite

- Runs the complete test suite to ensure nothing is broken

## Configuration

### Lint-staged Configuration

Located in `package.json`:

```json
"lint-staged": {
  "*.{js,ts,astro}": [
    "eslint --fix"
  ],
  "*.{js,ts}": [
    "jest --bail --findRelatedTests --passWithNoTests"
  ]
}
```

### Pre-commit Hook

Located in `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run lint-staged (lints and tests only changed files)
npx lint-staged

# Run all tests to ensure nothing is broken
npm test
```

## Bypassing Hooks (Not Recommended)

In rare cases where you need to bypass the hooks:

```bash
git commit --no-verify -m "your message"
```

⚠️ **Warning**: Only use this in emergencies. The hooks are there to protect code quality.

## Customizing Hooks

### Adding More Hooks

You can add more Git hooks by creating new files in `.husky/`:

```bash
# Example: Add a commit-msg hook
npx husky add .husky/commit-msg 'npx commitlint --edit "$1"'
```

### Modifying Lint-staged Rules

Edit the `lint-staged` section in `package.json` to add or modify rules:

```json
"lint-staged": {
  "*.{js,ts,astro}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.css": [
    "stylelint --fix"
  ]
}
```

## Troubleshooting

### Hooks Not Running

If hooks aren't running, reinstall them:

```bash
npm run prepare
```

Or manually:

```bash
npx husky install
```

### Slow Commit Times

If commits are taking too long:

1. **Option 1**: Remove the full test suite from pre-commit (keep only lint-staged)

   - Edit `.husky/pre-commit` and remove the `npm test` line

2. **Option 2**: Use a pre-push hook instead for full tests:
   ```bash
   npx husky add .husky/pre-push 'npm test'
   ```
   Then remove `npm test` from pre-commit

### Test Failures Blocking Commits

If tests are consistently failing:

1. Fix the tests first (recommended)
2. Temporarily disable test running in lint-staged by commenting out the Jest line in `package.json`
3. Use `--no-verify` flag (last resort)

## Best Practices

1. **Keep commits small**: Smaller commits = faster hooks
2. **Run tests locally**: Don't rely only on pre-commit hooks
3. **Fix issues immediately**: Don't accumulate linting errors
4. **Update regularly**: Keep Husky and lint-staged up to date

## Related Documentation

- [Testing Guide](./testing-guide.md)
- [ESLint Configuration](../eslint.config.js)
- [Jest Configuration](../jest.config.js)

## Resources

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
