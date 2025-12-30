# 🚀 Resibilis Production Deployment Guide

## Pre-Deployment Checklist

### ✅ 1. Environment Variables

Create these in your Vercel/hosting dashboard:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIs...  # For server-side operations

# App URL (Required)
NEXT_PUBLIC_APP_URL=https://resibilis.vercel.app

# Rate limiting (Recommended for production; Upstash has a free tier)
UPSTASH_REDIS_REST_URL=https://your-upstash-endpoint
UPSTASH_REDIS_REST_TOKEN=your-upstash-rest-token

# Payment (When ready - currently disabled)
# PAYMONGO_SECRET_KEY=sk_live_xxxxx
# PAYMONGO_PUBLIC_KEY=pk_live_xxxxx
# STRIPE_SECRET_KEY=sk_live_xxxxx
# STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

### ✅ 2. Supabase Configuration

#### A. Database Setup
Run `supabase/schema.sql` in Supabase SQL Editor to create all tables.

#### B. Authentication Setup
1. Go to **Authentication > Providers > Google**
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Add redirect URLs:
   ```
   https://your-project.supabase.co/auth/v1/callback
   https://resibilis.vercel.app/auth/callback
   ```

#### C. Row Level Security (RLS)
Verify RLS is enabled on all tables:
- ✅ `profiles`
- ✅ `invoices`
- ✅ `products_services`
- ✅ `user_templates`
- ✅ `receipt_templates`

#### D. Email Templates (Optional)
Customize email templates in Supabase Dashboard > Authentication > Email Templates

### ✅ 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Authorized JavaScript origins:
     ```
     https://resibilis.vercel.app
     https://your-project.supabase.co
     ```
   - Authorized redirect URIs:
     ```
     https://your-project.supabase.co/auth/v1/callback
     ```
5. Add credentials to Supabase

### ✅ 4. Security Checklist

#### Headers (Already configured in middleware.ts)
- [x] Content-Security-Policy
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] X-XSS-Protection
- [x] Referrer-Policy
- [x] Permissions-Policy
- [x] Strict-Transport-Security (HSTS)

#### Input Validation
- [x] All inputs sanitized with DOMPurify
- [x] Zod schema validation on all forms
- [x] XSS patterns removed from inputs
- [x] SQL injection patterns blocked

#### Email Security
- [x] Disposable email detection (800+ domains)
- [x] Email format validation

#### Rate Limiting
- [x] In-memory rate limiter implemented
- [x] Shared rate limiter supported via Upstash Redis (recommended for Vercel/serverless)

#### Authentication
- [x] Google OAuth only (no password storage)
- [x] Session management via Supabase
- [x] CSRF protection via SameSite cookies

---

## Deployment to Vercel

### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the `Resibilis` repo

### Step 2: Configure Build Settings

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### Step 3: Add Environment Variables

In Vercel Project Settings > Environment Variables, add:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | All |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Production |

### Step 4: Deploy

```bash
# Push to main branch to trigger deployment
git add .
git commit -m "Production deployment"
git push origin main
```

### Step 5: Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain (e.g., `resibilis.com`)
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

---

## Post-Deployment Verification

### Test Checklist

- [ ] Homepage loads correctly
- [ ] Dark/light mode toggle works
- [ ] Google sign-in works
- [ ] Receipt generation works
- [ ] PNG download works
- [ ] PDF download works
- [ ] Form validation shows errors
- [ ] Mobile responsive design works
- [ ] Receipt preview updates in real-time
- [ ] Language toggle (EN/TL) works
- [ ] Products page accessible (when signed in)
- [ ] History saves and loads (when signed in)

### Security Tests

- [ ] Try entering `<script>alert('xss')</script>` in form fields
- [ ] Verify disposable email is blocked
- [ ] Check CSP headers in browser DevTools > Network
- [ ] Verify HTTPS redirect works
- [ ] Test rate limiting on API endpoints

### Performance Tests

- [ ] Run Lighthouse audit (target: 90+ performance)
- [ ] Check Core Web Vitals in Search Console
- [ ] Verify images are optimized
- [ ] Check bundle size

---

## Monitoring & Analytics

### Recommended Services (Free Tiers)

1. **Error Tracking**: [Sentry](https://sentry.io) - Free tier: 5K errors/month
2. **Analytics**: [Vercel Analytics](https://vercel.com/analytics) - Free with Vercel
3. **Uptime Monitoring**: [UptimeRobot](https://uptimerobot.com) - Free: 50 monitors
4. **Performance**: [Vercel Speed Insights](https://vercel.com/docs/speed-insights)

### Setting up Sentry (Optional)

```bash
npx @sentry/wizard@latest -i nextjs
```

Add to `.env`:
```env
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## Scaling Considerations

### When to Scale

| Metric | Action Required |
|--------|-----------------|
| > 10K users/month | Add Redis for rate limiting |
| > 1K receipts/day | Consider CDN for images |
| > 100 concurrent users | Upgrade Supabase plan |

### Database Indexes

Already configured in `schema.sql`:
- `idx_invoices_user_id`
- `idx_invoices_receipt_number`
- `idx_invoices_created_at`
- `idx_products_services_user_id`

### Caching Strategy

Currently no caching needed. When scaling:
1. Add Redis for session/rate limit storage
2. Use ISR for static pages
3. Add CDN for image delivery

---

## Rollback Procedure

If something goes wrong:

### Via Vercel Dashboard
1. Go to Deployments
2. Find last working deployment
3. Click "..." > "Promote to Production"

### Via Git
```bash
git revert HEAD
git push origin main
```

---

## Support & Maintenance

### Regular Maintenance Tasks

- [ ] Weekly: Check error logs
- [ ] Monthly: Update dependencies (`npm audit fix`)
- [ ] Quarterly: Review security headers
- [ ] Yearly: Rotate API keys

### Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update all packages (carefully!)
npm update

# Security audit
npm audit
npm audit fix
```

---

## Cost Estimation (Free Tier)

| Service | Free Tier Limit | Cost if Exceeded |
|---------|-----------------|------------------|
| Vercel | 100GB bandwidth | $20/100GB |
| Supabase | 500MB DB, 2GB transfer | $25/month Pro |
| Google OAuth | Unlimited | Free |
| Sentry | 5K errors/month | $26/month |

**Total for small-medium usage: $0/month** 🎉

---

## Quick Commands

```bash
# Local development
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Start production server locally
npm run start

# Lint code
npm run lint
```

---

*Last updated: November 2025*
