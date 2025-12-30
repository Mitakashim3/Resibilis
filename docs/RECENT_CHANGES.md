# Recent Changes (December 13, 2025)

This document summarizes the latest updates applied to this Resibilis codebase.

## Summary

- Updated public attribution so the app identifies **Clark Jim Gabiota** as the creator.
- Refreshed About + Terms content and added a clear website contact.
- Improved the background grid so it’s subtler and visually balanced.
- Added production-ready (serverless-safe) **shared rate limiting** using **Upstash Redis** (optional; supports Vercel free tier via Upstash free tier).

---

## 1) Attribution + Contact Updates

### What changed

- Site metadata now sets `authors` and `creator` to **Clark Jim Gabiota**.
- About page content updated to creator biography and includes a **Contact** section linking to:
  - `https://mitakashime.vercel.app`
- Terms of Service updated to reflect sole creator/ownership and uses the website as contact.
- Footer includes a creator credit and website link.

### Files

- src/app/layout.tsx
- src/app/about/page.tsx
- src/app/terms/page.tsx
- src/components/layout/Footer.tsx

---

## 2) Background Grid Design Update

### What changed

- Reduced grid visibility (lower opacity/intensity).
- Increased spacing so the grid is less busy.
- Centered the pattern so it feels consistent on wide screens.
- Added a subtle paper texture behind the grid to soften contrast.

### Files

- src/app/globals.css
- src/components/ui/LiquidBackground.tsx

---

## 3) DDoS / Bot Abuse Hardening (Layer-7)

### Context

- **Vercel (free tier)** provides baseline platform-level DDoS mitigation.
- For **HTTP-layer bot floods** and per-route abuse, app-level rate limiting is still recommended.

### What changed

- Added a shared rate limiter using Upstash Redis (`@upstash/redis` + `@upstash/ratelimit`).
- Routes will:
  - Use **Upstash shared limiting** when env vars are present
  - Fall back to the existing **in-memory limiter** when Upstash isn’t configured or is unavailable

### Current protected routes

- `POST /api/validate-email`
  - limit: **10 / 60s** per IP
- `GET /auth/callback`
  - limit: **20 / 60s** per IP (basic abuse protection)

### Files

- src/lib/ratelimit.ts
- src/app/api/validate-email/route.ts
- src/app/auth/callback/route.ts

### Dependencies

- `@upstash/redis`
- `@upstash/ratelimit`

---

## Environment Variables (Upstash)

### Local development

Add these to `.env.local` (do not commit secrets):

```env
UPSTASH_REDIS_REST_URL=https://<your-upstash-endpoint>
UPSTASH_REDIS_REST_TOKEN=<your-upstash-rest-token>
```

Important notes:
- `UPSTASH_REDIS_REST_URL` must be an **https URL**.
- Do **not** paste the `redis-cli --tls -u ...` command into `UPSTASH_REDIS_REST_URL`.

### Vercel production

Set the same variables in **Vercel → Project → Settings → Environment Variables**.

---

## Quick Verification

- A full production build was run successfully after these changes:
  - `npm run build`

If you add new API routes later, copy the same pattern used in `validate-email` / `auth/callback`:
- derive IP via `getClientIpFromHeaders`
- call `checkRateLimitShared(...)` with a suitable limit/window
- fall back to `checkRateLimit(...)`
