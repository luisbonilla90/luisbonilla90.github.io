# 🎣 Git Hooks Quick Reference

## What's Running?

### Every Commit
✓ ESLint (auto-fix)  
✓ Jest (related tests)  
✓ Full test suite  

### Every Push
✓ Full test suite  

## Commands

### Commit (with hooks)
```bash
git commit -m "message"
```

### Commit (bypass - emergency only!)
```bash
git commit --no-verify -m "message"
```

### Push (with hooks)
```bash
git push
```

### Push (bypass - emergency only!)
```bash
git push --no-verify
```

### Reinstall hooks
```bash
npm run prepare
```

### Run linters manually
```bash
npm run lint
npm run lint:fix
```

### Run tests manually
```bash
npm test
npm run test:watch
npm run test:coverage
```

## Speed Up Commits

Edit `.husky/pre-commit` and remove this line:
```bash
npm test
```

The pre-push hook will still catch issues before pushing!

## Hook Files

- `.husky/pre-commit` - Runs on commit
- `.husky/pre-commit.fast` - Alternative (faster)
- `.husky/pre-push` - Runs on push

## More Info

See [PRE-COMMIT-SETUP.md](./PRE-COMMIT-SETUP.md) for full documentation.
