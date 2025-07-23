# 🔄 Development Workflow

## Branch Strategy

### Main Branch (`main`)
- **Protected branch** - Direct pushes are blocked
- **Production deployments** - All code here goes to production
- **Requires PR approval** - All changes must go through pull request review

### Feature Branches
- Create from `main`: `git checkout -b feature/your-feature-name`
- Use conventional naming: `feature/`, `fix/`, `docs/`, `chore/`
- Push and create PR when ready

## 🛡️ Automated Quality Gates

Every pull request automatically runs:

### ✅ **Code Quality Checks**
- **TypeScript compilation** - Ensures no type errors
- **ESLint linting** - Catches code quality issues
- **Prettier formatting** - Enforces consistent code style
- **Build verification** - Confirms production build works

### 🔒 **Security Scanning**
- **npm audit** - Checks for known vulnerabilities
- **Dependency scanning** - Monitors for security issues
- **Automated updates** - Dependabot creates PRs for updates

### 🚀 **Deployment Pipeline**
- **Preview deployments** - Every PR gets a preview URL
- **Production deployment** - Automatic when merged to main
- **Rollback capability** - Easy revert if issues arise

## 📋 Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/my-awesome-feature
   ```

2. **Make your changes**
   ```bash
   # Make changes
   npm run format        # Format code
   npm run lint:fix      # Fix linting issues
   npm run type-check    # Verify TypeScript
   npm run build         # Test build
   ```

3. **Commit with conventional format**
   ```bash
   git add .
   git commit -m "feat: add new product filtering feature"
   # OR: fix:, docs:, style:, refactor:, test:, chore:
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/my-awesome-feature
   # Create PR on GitHub with proper title and description
   ```

5. **PR gets automatically tested**
   - All quality gates must pass ✅
   - Review and approval required
   - Preview deployment created

6. **Merge to main**
   - Squash and merge (keeps clean history)
   - Automatic production deployment
   - Old feature branch deleted

## 🚨 Branch Protection Rules

- ❌ **No direct pushes to main**
- ✅ **PR reviews required**
- ✅ **Status checks must pass**
- ✅ **Up-to-date branch required**
- ✅ **Linear history enforced**

## 🔧 Local Development Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run start           # Start production server

# Code Quality
npm run lint            # Check for linting errors
npm run lint:fix        # Fix auto-fixable linting errors
npm run format          # Format all code with Prettier
npm run format:check    # Check if code is formatted
npm run type-check      # TypeScript type checking

# Workflow Testing
npm run build           # Test production build locally
```

## 🎯 Conventional Commits

Use these prefixes for commits and PR titles:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🚀 Deployment Status

- **Production**: Deployed automatically on merge to `main`
- **Preview**: Every PR gets a preview deployment
- **Status**: Check GitHub Actions tab for deployment status

## 🆘 Emergency Procedures

### Quick Hotfix
```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix
# Make minimal fix
git commit -m "fix: resolve critical production issue"
git push origin hotfix/critical-fix
# Create PR with "URGENT" label
```

### Rollback Production
1. Go to Vercel dashboard
2. Find previous working deployment
3. Click "Promote to Production"
4. OR revert the commit and push

---

This workflow ensures **code quality**, **security**, and **reliable deployments** while maintaining development velocity! 🚀
