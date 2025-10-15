# Husky Git Hooks

This folder contains Git hooks managed by Husky.

## Available Hooks

### `pre-commit` (Active)
Runs on every commit:
- Lints and fixes staged files with ESLint
- Runs tests related to changed files
- Runs the full test suite

**Note**: This can be slow if you have many tests. Consider using `pre-commit.fast` instead.

### `pre-commit.fast` (Alternative)
A faster version that only runs lint-staged without the full test suite.

To use this instead:
```bash
mv pre-commit pre-commit.full
mv pre-commit.fast pre-commit
```

### `pre-push` (Active)
Runs before pushing to remote:
- Executes the full test suite
- Prevents pushing if tests fail

This is recommended if you're using `pre-commit.fast` for commits.

## Switching Between Configurations

### Fast Commits, Thorough Pushes (Recommended)
```bash
cd .husky
mv pre-commit pre-commit.full
mv pre-commit.fast pre-commit
```

This setup:
- ✅ Fast commits (only lints changed files)
- ✅ Full test suite runs before push
- ✅ Balance between speed and safety

### Thorough Commits (Current Setup)
Current default configuration:
- ✅ Catches issues early
- ❌ Slower commit process

### Minimal Hooks
```bash
cd .husky
mv pre-commit pre-commit.full
echo 'npx lint-staged' > pre-commit
chmod +x pre-commit
```

This setup:
- ✅ Very fast
- ⚠️  Less protection against issues

## Bypassing Hooks

In emergencies only:
```bash
git commit --no-verify
git push --no-verify
```

## Reinstalling Hooks

If hooks stop working:
```bash
npm run prepare
```
