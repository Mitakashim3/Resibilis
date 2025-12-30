# 💰 Resibilis Payment & Financial Documentation

## Overview

This document outlines the recommended payment integration strategy for Resibilis, specifically tailored for Filipino users.

---

## 🏦 Recommended Payment Gateway: **PayMongo**

### Why PayMongo?

1. **Built for Filipinos** - Philippine-based company, understands local market
2. **BSP Licensed** - Bangko Sentral ng Pilipinas regulated (safe and legal)
3. **Multiple Payment Methods** - GCash, Maya, cards, bank transfers
4. **Low Fees** - Competitive rates for Philippine businesses
5. **Easy Integration** - Simple API, great documentation
6. **No Monthly Fees** - Only pay per transaction

### PayMongo Pricing (as of 2024)

| Payment Method | Fee |
|---------------|-----|
| Credit/Debit Card | 3.5% + ₱15 per transaction |
| GCash | 2.9% per transaction |
| Maya | 2.9% per transaction |
| GrabPay | 2.9% per transaction |
| Bank Transfer (InstaPay) | ₱15 flat per transaction |

### Getting Started with PayMongo

1. Sign up at https://paymongo.com
2. Complete business verification (DTI/SEC registration, valid ID)
3. Get API keys (test + live)
4. Integrate using their SDK or API

---

## 💵 Revenue Breakdown (Per Template Sale at ₱50)

| Item | Amount |
|------|--------|
| Sale Price | ₱50.00 |
| PayMongo Fee (GCash @ 2.9%) | -₱1.45 |
| **Net Revenue** | **₱48.55** |

For Premium Subscription (₱299/month):
| Item | Amount |
|------|--------|
| Subscription Price | ₱299.00 |
| PayMongo Fee (Card @ 3.5% + ₱15) | -₱25.47 |
| **Net Revenue** | **₱273.53** |

---

## 🔐 Where Does the Money Go?

### PayMongo Settlement Process

1. **Customer pays** → Money goes to PayMongo
2. **PayMongo holds** → 7-day rolling settlement (for new merchants)
3. **PayMongo transfers** → To your registered bank account
4. **Settlement frequency** → Daily (after initial period)

### Required Bank Accounts

You'll need a Philippine bank account for settlements:
- BDO, BPI, Metrobank, UnionBank, etc.
- Business or personal savings account
- Must match your PayMongo account name

---

## 📊 Alternative Payment Providers

### 1. **Stripe** ⭐ (Recommended for Scale)

Stripe is now available directly in the Philippines as of 2023!

#### Stripe Philippines Pricing
| Payment Method | Fee |
|---------------|-----|
| Cards (Visa/Mastercard) | 3.4% + ₱15 per transaction |
| International Cards | 4.4% + ₱15 per transaction |
| GCash (via Stripe) | 2.9% per transaction |
| GrabPay (via Stripe) | 2.9% per transaction |

#### Pros of Stripe
- ✅ **Global Standard** - Best-in-class documentation
- ✅ **Developer Friendly** - Excellent SDK, webhooks, testing tools
- ✅ **Now in Philippines** - No need for US entity anymore!
- ✅ **Subscription Support** - Built-in recurring billing
- ✅ **Stripe Checkout** - Beautiful hosted payment page
- ✅ **Fraud Protection** - Radar for fraud detection
- ✅ **Multi-currency** - Accept PHP, USD, and 135+ currencies

#### Cons of Stripe
- ❌ Slightly higher fees than PayMongo for local cards
- ❌ Settlement in 7 days (vs 2-3 days for PayMongo)
- ❌ Support response may be slower (global company)

#### When to Choose Stripe
- You plan to scale internationally
- You need subscription billing
- You want best developer experience
- You need multi-currency support

#### Stripe Integration Example

```typescript
// Install: npm install stripe @stripe/stripe-js

// src/app/api/payments/stripe-checkout/route.ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { templateId, price, userId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'gcash', 'grab_pay'],
    line_items: [{
      price_data: {
        currency: 'php',
        product_data: {
          name: `Resibilis Template: ${templateId}`,
          description: 'Premium receipt template - one-time purchase',
        },
        unit_amount: price * 100, // Stripe uses centavos
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      user_id: userId,
      template_id: templateId,
    },
  });

  return NextResponse.json({ url: session.url });
}
```

#### Stripe Environment Variables
```env
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

### 2. **Dragonpay**
- More payment channels (7-Eleven, Cebuana, etc.)
- Higher complexity
- Best for: Reaching unbanked customers

### 3. **Xendit**
- International reach (SEA)
- More complex pricing
- Best for: Multi-country expansion

### 4. **PayPal**
- International customers
- Higher fees (~4.4% + fixed fee)
- Best for: USD transactions from abroad

---

## 🆚 PayMongo vs Stripe Comparison

| Feature | PayMongo | Stripe |
|---------|----------|--------|
| **Card Fee** | 3.5% + ₱15 | 3.4% + ₱15 |
| **GCash Fee** | 2.9% | 2.9% |
| **Maya Fee** | 2.9% | N/A (use GrabPay) |
| **Settlement** | 2-7 days | 7 days |
| **Documentation** | Good | Excellent |
| **Subscriptions** | Manual | Built-in |
| **International** | PHP only | 135+ currencies |
| **Support** | Local (faster) | Global |
| **Best For** | Local-only business | Scale/International |

### My Recommendation

**Start with PayMongo** if:
- You're just starting out
- Your customers are 100% Filipino
- You want faster settlement
- You need local support

**Use Stripe** if:
- You plan to accept international payments
- You need subscription billing
- You want the best developer experience
- You might expand outside Philippines

---

## 📝 Implementation Steps

### Phase 1: Setup (Week 1)
```
1. Register PayMongo account
2. Submit business documents
3. Wait for verification (2-5 business days)
4. Get API keys
```

### Phase 2: Integration (Week 2)
```
1. Install PayMongo SDK
   npm install paymongo

2. Create payment endpoints
   - POST /api/payments/create-checkout
   - POST /api/payments/webhook

3. Handle webhooks for:
   - payment.paid
   - payment.failed
```

### Phase 3: Testing (Week 3)
```
1. Test with sandbox/test keys
2. Test all payment methods
3. Verify webhook handling
4. Test refund flow
```

### Phase 4: Go Live (Week 4)
```
1. Switch to live keys
2. Monitor transactions
3. Set up reporting
```

---

## 🛡️ Legal & Compliance Requirements

### Required for Philippine Online Business

1. **DTI Registration** (for sole proprietor) - ₱200-₱1,000
2. **BIR Registration** (TIN) - Free
3. **Business Permit** (LGU) - Varies by city
4. **SEC Registration** (if corporation) - ₱15,000+

### Tax Obligations

- **VAT** (12%) - If gross sales > ₱3M annually
- **Percentage Tax** (3%) - If below VAT threshold
- **Income Tax** - Based on tax bracket

### Privacy & Data

- **Data Privacy Act of 2012** compliance
- Privacy policy required
- User consent for data collection

---

## 💡 Pricing Strategy Recommendations

### Template Pricing
| Template Type | Suggested Price | Reasoning |
|--------------|-----------------|-----------|
| Basic Premium | ₱50 | Entry-level, impulse buy |
| Advanced | ₱75 | More features |
| Luxury/Custom | ₱100 | Premium positioning |

### Subscription Tiers
| Tier | Price | Features |
|------|-------|----------|
| Free | ₱0 | Basic features, 1 template |
| Pro Monthly | ₱299/mo | All templates, branding |
| Pro Yearly | ₱2,399/yr (₱200/mo) | Same + 2 months free |

### Revenue Projections (Conservative)

**Monthly (Year 1):**
- 100 template sales × ₱50 = ₱5,000
- 20 Pro subscribers × ₱299 = ₱5,980
- **Total Gross: ₱10,980/month**
- After PayMongo fees: ~₱10,500/month

---

## 🔧 Technical Integration Code

### Environment Variables Needed
```env
# .env.local
PAYMONGO_SECRET_KEY=sk_live_xxxxx
PAYMONGO_PUBLIC_KEY=pk_live_xxxxx
PAYMONGO_WEBHOOK_SECRET=whsec_xxxxx
```

### API Route: Create Checkout Session
```typescript
// src/app/api/payments/create-checkout/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { templateId, price, userId } = await req.json();

  const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        attributes: {
          line_items: [{
            name: `Resibilis Template: ${templateId}`,
            amount: price * 100, // PayMongo uses centavos
            currency: 'PHP',
            quantity: 1,
          }],
          payment_method_types: ['gcash', 'grab_pay', 'card', 'paymaya'],
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/purchase/success?template=${templateId}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
          metadata: {
            user_id: userId,
            template_id: templateId,
          },
        },
      },
    }),
  });

  const checkout = await response.json();
  return NextResponse.json({ checkoutUrl: checkout.data.attributes.checkout_url });
}
```

### Webhook Handler
```typescript
// src/app/api/payments/webhook/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('paymongo-signature');

  // Verify webhook signature (important for security!)
  // ... verification logic ...

  const event = JSON.parse(payload);

  if (event.data.attributes.type === 'checkout_session.payment.paid') {
    const metadata = event.data.attributes.data.attributes.metadata;
    const userId = metadata.user_id;
    const templateId = metadata.template_id;

    // Grant template to user in Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY! // Use service key for admin operations
    );

    await supabase.from('user_templates').insert({
      user_id: userId,
      template_id: templateId,
    });
  }

  return NextResponse.json({ received: true });
}
```

---

## 📞 Support Contacts

- **PayMongo Support**: support@paymongo.com
- **PayMongo Docs**: https://developers.paymongo.com
- **BIR Hotline**: (02) 8538-3200
- **DTI Online**: https://bnrs.dti.gov.ph

---

## ✅ Checklist Before Launch

- [ ] PayMongo account verified
- [ ] Bank account linked for settlements
- [ ] Test payments working
- [ ] Webhooks configured and tested
- [ ] Privacy policy updated with payment data handling
- [ ] Terms of service includes refund policy
- [ ] Tax registration complete (if applicable)
- [ ] Invoice/receipt system for purchases

---

*Last updated: November 2025*
