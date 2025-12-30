# Resibilis - Project Documentation

> **Resibilis** - A free, secure, lightning-fast receipt generator web application built specifically for Filipino freelancers, students, sari-sari store owners, and small business entrepreneurs.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Security](#security)
6. [Database Schema](#database-schema)
7. [Environment Variables](#environment-variables)
8. [Getting Started](#getting-started)
9. [Deployment](#deployment)
10. [Monetization](#monetization)
11. [API Reference](#api-reference)
12. [Contributing](#contributing)

---

## Overview

### What is Resibilis?

Resibilis (from Filipino "resibo" meaning receipt) is a web-based receipt generator designed to help Filipino entrepreneurs create professional receipts instantly. The application is:

- **Free** - Core features are always free
- **Fast** - Generate receipts in seconds
- **Secure** - Data stays on your device unless you choose to save it
- **Mobile-friendly** - Works on any device

### Target Users

- Freelancers (graphic designers, writers, virtual assistants)
- Students selling products or services
- Sari-sari store owners
- Online sellers (Shopee, Lazada, Facebook Marketplace)
- Service providers (electricians, plumbers, cleaners)

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.5 | React framework with App Router |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **Supabase** | Latest | Authentication & PostgreSQL database |
| **React Hook Form** | 7.x | Form state management |
| **Zod** | 3.x | Schema validation |
| **html-to-image** | 1.x | Client-side image generation |
| **jsPDF** | 2.x | PDF generation |
| **DOMPurify** | 3.x | XSS protection |
| **Lucide React** | Latest | Icon library |
| **next-themes** | Latest | Dark mode support |

---

## Project Structure

```
resibilis/
├── .env.example              # Environment variables template
├── .env.local                # Local environment variables (git-ignored)
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
│
├── docs/                     # Documentation
│   ├── PROJECT_DOCUMENTATION.md  # This file
│   ├── DEPLOYMENT.md         # Deployment guide
│   ├── PAYMENT_INTEGRATION.md    # Payment setup guide
│   └── ADS_SETUP.md          # AdSense integration guide
│
├── public/                   # Static assets
│   └── logo.svg              # Application logo
│
├── supabase/                 # Supabase configuration
│   └── migrations/           # Database migrations
│
└── src/                      # Source code
    ├── app/                  # Next.js App Router
    │   ├── layout.tsx        # Root layout
    │   ├── page.tsx          # Home page
    │   ├── providers.tsx     # Context providers
    │   ├── globals.css       # Global styles
    │   ├── InvoiceGenerator.tsx  # Main receipt component
    │   │
    │   ├── about/            # About page
    │   │   └── page.tsx
    │   ├── how-to-use/       # User guide
    │   │   └── page.tsx
    │   ├── pricing/          # Pricing page
    │   │   ├── page.tsx
    │   │   └── PricingContent.tsx
    │   ├── privacy/          # Privacy policy
    │   │   └── page.tsx
    │   ├── terms/            # Terms of service
    │   │   └── page.tsx
    │   ├── products/         # Product catalog
    │   │   └── page.tsx
    │   │
    │   └── api/              # API routes
    │       ├── auth/         # Auth callbacks
    │       └── validate-email/   # Email validation
    │
    ├── components/           # React components
    │   ├── ads/              # Advertisement components
    │   │   ├── AdBanner.tsx
    │   │   └── index.ts
    │   │
    │   ├── auth/             # Authentication components
    │   │   ├── AuthButton.tsx
    │   │   ├── UserMenu.tsx
    │   │   └── index.ts
    │   │
    │   ├── invoice/          # Invoice/Receipt components
    │   │   ├── InvoiceForm.tsx
    │   │   ├── InvoicePreview.tsx
    │   │   ├── InvoiceHistory.tsx
    │   │   └── index.ts
    │   │
    │   ├── layout/           # Layout components
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── index.ts
    │   │
    │   ├── premium/          # Premium feature components
    │   │   ├── PremiumPromo.tsx
    │   │   └── index.ts
    │   │
    │   ├── templates/        # Receipt templates
    │   │   ├── TemplateSelector.tsx
    │   │   └── index.ts
    │   │
    │   └── ui/               # Reusable UI components
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Input.tsx
    │       ├── ThemeToggle.tsx
    │       └── index.ts
    │
    ├── lib/                  # Utility libraries
    │   ├── schemas/          # Zod validation schemas
    │   │   ├── invoice.ts
    │   │   └── index.ts
    │   │
    │   ├── security/         # Security utilities
    │   │   └── index.ts      # Disposable email list, XSS protection
    │   │
    │   ├── supabase/         # Supabase clients
    │   │   ├── client.ts     # Browser client
    │   │   ├── server.ts     # Server client
    │   │   └── index.ts
    │   │
    │   ├── templates/        # Receipt template definitions
    │   │   ├── receipt-templates.ts
    │   │   └── index.ts
    │   │
    │   └── utils/            # Helper functions
    │       └── index.ts
    │
    ├── middleware.ts         # Next.js middleware (CSP, auth)
    │
    └── types/                # TypeScript types
        └── database.ts       # Supabase generated types
```

---

## Features

### Core Features (Free)

| Feature | Description |
|---------|-------------|
| **Receipt Generation** | Create professional receipts instantly |
| **Multiple Currencies** | Support for PHP (₱), USD ($), EUR (€) |
| **Bilingual Support** | English and Tagalog languages |
| **Export Options** | Download as PNG or PDF |
| **Live Preview** | Real-time receipt preview while editing |
| **Custom Business Name** | Add your business name to receipts |
| **Multiple Items** | Add unlimited line items |
| **Auto Calculation** | Automatic total calculation |
| **Receipt Dimensions** | Standard, Compact, and Wide formats |
| **Notes Field** | Add custom notes to receipts |
| **Dark Mode** | System-aware dark/light theme |
| **Mobile Responsive** | Works on all devices |

### Account Features (Free with Sign-up)

| Feature | Description |
|---------|-------------|
| **Google Sign-In** | Easy authentication with Google |
| **Receipt History** | View and manage past receipts |
| **Product Catalog** | Save frequently used products |
| **Cloud Sync** | Access receipts from any device |

### Premium Features (Coming Soon)

| Feature | Description |
|---------|-------------|
| **Custom Templates** | 7 premium receipt designs |
| **Logo Upload** | Add business logo to receipts |
| **Remove Branding** | White-label receipts |
| **Priority Support** | Dedicated customer support |
| **Analytics** | Sales tracking and reports |

---

## Security

### Implemented Security Measures

#### 1. Content Security Policy (CSP)
```typescript
// src/middleware.ts
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://pagead2.googlesyndication.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.supabase.co",
  "frame-ancestors 'none'",
  // ... more directives
];
```

#### 2. Disposable Email Blocking
- 800+ disposable email domains blocked
- Prevents spam signups
- Located in `src/lib/security/index.ts`

#### 3. Input Sanitization
```typescript
// XSS Protection with DOMPurify
import DOMPurify from 'dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
}
```

#### 4. Rate Limiting
```typescript
// In-memory fallback rate limiting
// Implementation in src/lib/security/index.ts

// Shared/serverless-safe rate limiting (recommended for Vercel)
// Implementation in src/lib/ratelimit.ts
```

**Production note (Vercel/serverless):** In-memory limiting is per-instance and can reset.
For stronger Layer-7 abuse protection, configure Upstash and use the shared limiter.

#### 5. Row Level Security (RLS)
```sql
-- Supabase RLS policies
CREATE POLICY "Users can only view own invoices"
ON invoices FOR SELECT
USING (auth.uid() = user_id);
```

#### 6. Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Strict-Transport-Security (production)

---

## Database Schema

### Tables

#### `invoices`
Stores user receipts.

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'PHP',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own invoices"
ON invoices FOR ALL
USING (auth.uid() = user_id);
```

#### `products`
Stores user product catalog.

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'PHP',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own products"
ON products FOR ALL
USING (auth.uid() = user_id);
```

### Items JSONB Structure

```typescript
interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// Example
{
  "items": [
    { "id": "1", "name": "Product A", "quantity": 2, "price": 100 },
    { "id": "2", "name": "Service B", "quantity": 1, "price": 500 }
  ]
}
```

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# ===========================================
# SUPABASE CONFIGURATION (Required)
# ===========================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# ===========================================
# GOOGLE ADSENSE (Optional)
# ===========================================
NEXT_PUBLIC_ADSENSE_ENABLED=false
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX

# ===========================================
# APPLICATION SETTINGS
# ===========================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Variable Descriptions

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key |
| `NEXT_PUBLIC_ADSENSE_ENABLED` | No | Enable/disable AdSense ads |
| `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` | No | Your AdSense publisher ID |
| `NEXT_PUBLIC_APP_URL` | No | Application URL for callbacks |

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud Console project (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mitakashim3/Resibilis.git
   cd Resibilis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations
   - Enable Google OAuth in Authentication settings
   - Configure redirect URLs

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

---

## Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Configure Environment Variables**
   - Add all variables from `.env.local`

3. **Deploy**
   - Vercel automatically deploys on push to main

4. **Configure Supabase**
   - Add your Vercel URL to Supabase redirect URLs
   - Update Google OAuth redirect URIs

### Production URL
```
https://resibilis.vercel.app
```

See `docs/DEPLOYMENT.md` for detailed deployment instructions.

---

## Monetization

### 1. Google AdSense

The application is configured for Google AdSense integration:

- **Status**: Configured, pending approval
- **Ad Locations**: Below receipt form, footer area
- **Configuration**: `src/components/ads/AdBanner.tsx`

See `docs/ADS_SETUP.md` for setup instructions.

### 2. Premium Subscriptions (Coming Soon)

Planned payment integration:

| Provider | Best For | Status |
|----------|----------|--------|
| **PayMongo** | Philippine users (GCash, Maya, cards) | Documented |
| **Stripe** | International users | Documented |

See `docs/PAYMENT_INTEGRATION.md` for implementation details.

### Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free** | ₱0 | Core receipt generation |
| **Pro** | ₱199/mo | Custom templates, logo upload |
| **Business** | ₱499/mo | All features, priority support |

---

## API Reference

### Authentication

Authentication is handled by Supabase Auth with Google OAuth.

#### Sign In
```typescript
import { createClient } from '@/lib/supabase';

const supabase = createClient();
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/api/auth/callback`
  }
});
```

#### Sign Out
```typescript
await supabase.auth.signOut();
```

#### Get Current User
```typescript
const { data: { user } } = await supabase.auth.getUser();
```

### API Routes

#### `POST /api/validate-email`
Validates an email address against disposable email list.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "valid": true,
  "message": "Email is valid"
}
```

#### `GET /api/auth/callback`
Handles OAuth callback from Supabase/Google.

---

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes
4. Run type checking
   ```bash
   npm run type-check
   ```
5. Commit your changes
   ```bash
   git commit -m "Add your feature"
   ```
6. Push to your fork
   ```bash
   git push origin feature/your-feature
   ```
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing component patterns
- Use Tailwind CSS for styling
- Add proper type definitions
- Write meaningful commit messages

### Reporting Issues

Please open an issue on GitHub with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

## License

This project is proprietary software. All rights reserved.

---

## Contact

- **Repository**: [github.com/Mitakashim3/Resibilis](https://github.com/Mitakashim3/Resibilis)
- **Live Demo**: [resibilis.vercel.app](https://resibilis.vercel.app)

---

**Made with 💚 for Filipino entrepreneurs**
