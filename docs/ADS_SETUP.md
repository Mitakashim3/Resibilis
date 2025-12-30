# Ads Setup Guide for Resibilis

This guide walks you through setting up Google AdSense to monetize Resibilis.

## Prerequisites

1. **Website must be live** - AdSense requires a publicly accessible website
2. **Quality content** - Original, valuable content for users
3. **Privacy Policy** - You already have one at `/privacy`
4. **Terms of Service** - You already have one at `/terms`

## Step 1: Apply for Google AdSense

1. Go to [Google AdSense](https://www.google.com/adsense/start/)
2. Click "Get Started"
3. Enter your website URL: `https://your-domain.com`
4. Sign in with your Google account
5. Fill in your payment information
6. Wait for approval (usually 1-14 days)

## Step 2: Get Your Publisher ID

After approval:
1. Go to AdSense dashboard
2. Click on **Account** → **Account Information**
3. Copy your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)

## Step 3: Create Ad Units

1. In AdSense, go to **Ads** → **By ad unit**
2. Click **Create new ad unit**
3. Choose ad type:
   - **Display ads** - Flexible, responsive (recommended)
   - **In-feed ads** - For content lists
   - **In-article ads** - Between content sections

4. Configure and save
5. Copy the **Ad slot ID** (numbers after `data-ad-slot=`)

## Step 4: Configure Resibilis

### Update the Ad Component

Edit `src/components/ads/AdBanner.tsx`:

```typescript
// Change these values:
const ADS_ENABLED = true;  // Enable ads
const ADSENSE_PUBLISHER_ID = 'ca-pub-YOUR_ACTUAL_ID';  // Your publisher ID
```

### Add AdSense Script to Layout

The AdSense script is already configured in `layout.tsx`. Just uncomment it when ready:

```tsx
// In src/app/layout.tsx, the script is already added
```

### Update Content Security Policy

Edit `src/middleware.ts` to allow AdSense:

```typescript
// Add to script-src:
"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://adservice.google.com"

// Add to frame-src:
"frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com"

// Add to img-src:
"img-src 'self' data: blob: https://pagead2.googlesyndication.com"
```

## Step 5: Place Ads in Your App

### Recommended Ad Placements

1. **Below Header** (leaderboard)
```tsx
import { Ad } from '@/components/ads';

<Ad slot="YOUR_SLOT_ID" size="leaderboard" />
```

2. **Sidebar** (rectangle)
```tsx
<Ad slot="YOUR_SLOT_ID" size="rectangle" />
```

3. **Between Sections** (responsive)
```tsx
<Ad slot="YOUR_SLOT_ID" size="responsive" />
```

4. **Footer Area** (banner)
```tsx
<Ad slot="YOUR_SLOT_ID" size="banner" />
```

## Ad Placement Best Practices

### ✅ DO:
- Place ads where they don't interfere with the main functionality
- Use responsive ads for mobile compatibility
- Limit to 3-4 ads per page
- Add clear spacing around ads
- Test on mobile devices

### ❌ DON'T:
- Place ads that cover the receipt generator
- Use more ads than content
- Place ads near buttons (accidental clicks = account ban)
- Use pop-up or interstitial ads excessively
- Hide ads or make them look like content

## Recommended Placements for Resibilis

```
┌─────────────────────────────────────────┐
│  Header                                 │
├─────────────────────────────────────────┤
│  [      Leaderboard Ad (728x90)       ] │  ← Good spot
├─────────────────────────────────────────┤
│                                         │
│   Invoice Form    │    Preview          │
│                   │                     │
│                   │                     │
│   [Rectangle]     │                     │  ← Sidebar ad
│   [  Ad 300x250]  │                     │
│                   │                     │
├─────────────────────────────────────────┤
│  [      Responsive Ad (auto)          ] │  ← Below main content
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

## Revenue Expectations

| Traffic (Monthly) | Estimated Revenue |
|-------------------|-------------------|
| 1,000 visitors    | $1-5             |
| 10,000 visitors   | $10-50           |
| 50,000 visitors   | $50-250          |
| 100,000 visitors  | $100-500         |

*Actual revenue depends on:*
- Geographic location of visitors (US/EU pays more)
- Ad placement and viewability
- User engagement
- Niche (finance/tech pays more)

## Alternative: Carbon Ads (Developer-Focused)

If you want cleaner, developer-focused ads:

1. Apply at [Carbon Ads](https://www.carbonads.net/)
2. They provide a single, non-intrusive ad
3. Better for tech/developer audience
4. Requires significant traffic to apply

## Troubleshooting

### Ads not showing?
1. Check browser console for errors
2. Verify AdSense is approved
3. Check CSP headers allow AdSense domains
4. Disable ad blockers for testing
5. Wait 24-48 hours after setup

### Low revenue?
1. Improve ad placement visibility
2. Increase traffic through SEO
3. Target higher-paying keywords
4. Test different ad sizes/placements

### AdSense policy violation?
1. Don't click your own ads
2. Don't ask others to click
3. Ensure ads are clearly labeled
4. Keep content family-friendly
5. Don't place ads too close to buttons

## Environment Variables

For production, you can use environment variables:

```env
# .env.local
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
```

Then update the component to use:
```typescript
const ADS_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '';
```

---

## Quick Start Checklist

- [ ] Apply for Google AdSense
- [ ] Wait for approval
- [ ] Get Publisher ID and Ad Slot IDs
- [ ] Update `AdBanner.tsx` with your IDs
- [ ] Enable ads by setting `ADS_ENABLED = true`
- [ ] Update CSP in middleware
- [ ] Add `<Ad />` components where desired
- [ ] Test on multiple devices
- [ ] Monitor AdSense dashboard for issues
