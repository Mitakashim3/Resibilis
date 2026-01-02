# Vercel CI/CD Integration Guide

## 🚀 How to Block Vercel Deployment When Tests Fail

### Option 1: Vercel Dashboard Settings (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Git**
3. Under **Deployment Protection**, enable:
   - ✅ **"Only deploy when checks pass"**
   - This will make Vercel wait for GitHub Actions to complete before deploying

### Option 2: Vercel CLI + GitHub Actions

Add this to your Vercel project settings:
```bash
# In Vercel dashboard → Settings → Git → Ignored Build Step
# Set: "if [ "$VERCEL_GIT_COMMIT_REF" = "main" ]; then npm run test && exit 0; else exit 1; fi"
```

### Option 3: Use Vercel's Native Check Suites

Vercel automatically integrates with GitHub's check suites. When you push code:
1. GitHub Actions runs tests (from `.github/workflows/ci.yml`)
2. Vercel sees the check status
3. If checks fail, Vercel won't deploy (if configured correctly)

## ✅ What You Need to Do

### 1. In GitHub Repository Settings

1. Go to **Settings** → **Branches**
2. Add a branch protection rule for `main`:
   - ✅ Require status checks to pass before merging
   - Select: `Run Tests`, `Build Application`, `Deployment Gate`
   - ✅ Require branches to be up to date before merging

### 2. In Vercel Dashboard

1. **Project Settings** → **Git**
2. Enable **"Only deploy when checks pass"**
3. This ensures Vercel respects GitHub Actions status

### 3. Add Secrets to GitHub

Your CI needs these secrets for the build step:
1. Go to **GitHub Repo** → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🔒 How It Protects Production

```
┌─────────────────┐
│  Push to main   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│  - Type check   │
│  - Linting      │
│  - Tests (21)   │
│  - Build        │
└────────┬────────┘
         │
         ├─── ✅ All Pass ──────┐
         │                      │
         └─── ❌ Any Fail ──────┤
                                │
                                ▼
                     ┌──────────────────┐
                     │ Vercel Deployment│
                     │  BLOCKED ❌      │
                     └──────────────────┘
                                │
                                ▼
                     ┌──────────────────┐
                     │ Production Safe  │
                     │ (No bad code)    │
                     └──────────────────┘
```

## 📊 Test Coverage Requirements

Current coverage thresholds (set in `jest.config.ts`):
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

If coverage drops below these thresholds, the build will fail.

## 🧪 Running Tests Locally

```bash
# Run all tests
npm test

# Run tests in watch mode (during development)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 🔄 CI/CD Workflow Summary

The `.github/workflows/ci.yml` file runs:

1. **Test Job** (Node 18.x & 20.x)
   - Install dependencies
   - Type checking
   - Linting
   - Unit tests with coverage

2. **Build Job** (depends on tests passing)
   - Production build
   - Uploads build artifacts

3. **Security Audit**
   - npm audit for vulnerabilities

4. **Deployment Gate** (main branch only)
   - Final check before Vercel deployment
   - Blocks if any previous job failed

## ⚠️ What Happens When Tests Fail

1. GitHub Actions marks the commit as "failing"
2. Vercel sees the failing status
3. Deployment is **blocked** (if configured correctly)
4. You get a notification in:
   - GitHub Actions tab
   - Vercel dashboard
   - Email (if enabled)
5. Production stays **safe** with the last working version

## 🎯 Next Steps

After setting up:
1. Make a test commit with intentionally broken code
2. Watch GitHub Actions fail
3. Verify Vercel deployment is blocked
4. Fix the code
5. Push again and verify automatic deployment

## 📝 Example: Breaking the Build

Try this to test the CI/CD pipeline:

```typescript
// In src/lib/utils/taxDiscount.ts
// Change this line to intentionally break a test:
export function calculateReceiptTotal() {
  return { total: -999 }; // This will fail tests!
}
```

Push this, and you should see:
- ❌ GitHub Actions fails
- ❌ Vercel deployment blocked
- ✅ Production still running the good version
