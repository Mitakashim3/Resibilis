# Tax & Discount System - Integration Guide

## ✅ What Was Implemented

### 1. **Backend Logic** (`src/lib/utils/taxDiscount.ts`)
- `calculateReceiptTotal()` - Currency-safe calculation with proper decimal rounding
- `formatCurrency()` - PHP and USD formatting
- Handles: percentage tax, flat/percentage discounts, edge cases

### 2. **Frontend Component** (`src/components/invoice/TaxDiscountControls.tsx`)
- Real-time calculation updates
- Input validation (prevents letters, negative values)
- Error boundary (app won't crash on bad input)
- Responsive UI with Tailwind CSS
- Dark mode support

### 3. **Test Suite** (`src/lib/utils/__tests__/taxDiscount.test.ts`)
- 21 comprehensive tests (all passing ✅)
- Coverage: 80%+ on all metrics
- Tests include: 0% tax, 100% discount, multiple items, edge cases

### 4. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
- Runs on every push/PR
- Type checking, linting, tests, build
- **Blocks deployment if tests fail**
- Multi-version Node.js testing (18.x, 20.x)

---

## 🚀 How to Use in Your Invoice Generator

### Option 1: Add to InvoiceForm Component

```typescript
// In src/components/invoice/InvoiceForm.tsx
import { TaxDiscountControls } from './TaxDiscountControls';
import { type InvoiceItem } from '@/lib/schemas/invoice';

function InvoiceForm() {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [finalTotal, setFinalTotal] = useState(0);

  return (
    <div>
      {/* Your existing item inputs */}
      <ItemsInput items={items} onChange={setItems} />

      {/* NEW: Tax & Discount Controls */}
      <div className="mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Tax & Discount</h3>
        <TaxDiscountControls
          items={items}
          currency="PHP"
          onTotalChange={(total) => setFinalTotal(total)}
        />
      </div>

      {/* Use finalTotal for PDF generation, etc. */}
      <button onClick={() => generatePDF(items, finalTotal)}>
        Download Receipt
      </button>
    </div>
  );
}
```

### Option 2: Use as Standalone Calculator

```typescript
import { calculateReceiptTotal } from '@/lib/utils/taxDiscount';

const items = [
  { price: 100, qty: 2 },
  { price: 50, qty: 3 },
];

const result = calculateReceiptTotal(items, {
  taxPercent: 12,        // 12% VAT
  discountType: 'percentage',
  discountValue: 10,     // 10% discount
});

console.log(result);
// {
//   subtotal: 350,
//   discountAmount: 35,
//   taxAmount: 37.8,
//   total: 352.8
// }
```

---

## 📊 Example Calculations

### Example 1: Philippine VAT (12%)
```typescript
const items = [{ price: 100, qty: 1 }];
const result = calculateReceiptTotal(items, { taxPercent: 12 });
// subtotal: 100
// tax: 12
// total: 112
```

### Example 2: Senior Citizen Discount (20% off)
```typescript
const items = [{ price: 500, qty: 1 }];
const result = calculateReceiptTotal(items, {
  discountType: 'percentage',
  discountValue: 20,
});
// subtotal: 500
// discount: 100
// total: 400
```

### Example 3: VAT + Flat Discount
```typescript
const items = [{ price: 1000, qty: 1 }];
const result = calculateReceiptTotal(items, {
  taxPercent: 12,
  discountType: 'flat',
  discountValue: 100,
});
// subtotal: 1000
// discount: 100
// taxable: 900
// tax: 108 (12% of 900)
// total: 1008
```

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Watch mode (auto-rerun on file changes)
npm run test:watch

# With coverage report
npm run test:coverage

# Type checking
npm run type-check
```

---

## 🔒 CI/CD Setup (Critical Steps)

### 1. GitHub Repository Settings

**Go to Settings → Branches → Add Rule for `main`:**
- ✅ Require status checks to pass before merging
- Select these checks:
  - `Run Tests`
  - `Build Application`
  - `Deployment Gate`
- ✅ Require branches to be up to date

### 2. Add GitHub Secrets

**Go to Settings → Secrets and variables → Actions:**

Add these secrets (needed for CI build):
```
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
```

### 3. Vercel Dashboard Settings

**Go to Vercel → Your Project → Settings → Git:**
- Enable: **"Only deploy when checks pass"**
- This prevents broken code from reaching production

---

## ✅ Verification Checklist

After pushing your code:

1. **Check GitHub Actions Tab**
   - Visit: `https://github.com/<your-username>/Resibilis/actions`
   - Verify all 4 jobs pass:
     - ✅ Run Tests
     - ✅ Build Application
     - ✅ Security Audit
     - ✅ Deployment Gate

2. **Check Vercel Dashboard**
   - Should show: "Deployment queued (waiting for checks)"
   - After CI passes: "Building..." → "Deployed"

3. **Test the Protection**
   - Make a breaking change (e.g., delete a function)
   - Push to a new branch
   - Create PR
   - Verify: ❌ CI fails → ❌ Merge blocked

---

## 🎯 What to Do Now

### Immediate (Required):

1. **Add GitHub Secrets**
   ```bash
   # Go to GitHub → Settings → Secrets → Actions
   # Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. **Enable Branch Protection**
   ```bash
   # Go to GitHub → Settings → Branches
   # Add protection rule for main branch
   # Require status checks: Run Tests, Build Application, Deployment Gate
   ```

3. **Configure Vercel**
   ```bash
   # Vercel Dashboard → Settings → Git
   # Enable "Only deploy when checks pass"
   ```

### Next (Integration):

4. **Integrate Component into Invoice Generator**
   - Import `TaxDiscountControls` into your main invoice form
   - Pass `items` array and handle `onTotalChange` callback
   - Use the `finalTotal` for PDF generation

5. **Update Database Schema (Optional)**
   ```sql
   -- If you want to save tax/discount info:
   ALTER TABLE invoices ADD COLUMN tax_percent DECIMAL(5,2);
   ALTER TABLE invoices ADD COLUMN discount_type VARCHAR(20);
   ALTER TABLE invoices ADD COLUMN discount_value DECIMAL(10,2);
   ```

6. **Test in Development**
   ```bash
   npm run dev
   # Navigate to invoice page
   # Test tax/discount calculations
   # Verify PDF includes updated totals
   ```

### Future Enhancements:

- Add preset tax rates (e.g., "VAT 12%", "Sales Tax 8%")
- Save tax/discount preferences per user
- Add discount code system
- Generate tax-inclusive receipts for BIR compliance

---

## 🐛 Troubleshooting

**Tests fail locally:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

**CI fails on GitHub but works locally:**
```bash
# Check Node.js version
node --version  # Should be 18.x or 20.x

# Run exact CI commands locally:
npm ci
npm run type-check
npm run lint
npm test -- --coverage
npm run build
```

**Vercel deploys despite failing tests:**
- Verify branch protection is enabled
- Check Vercel Git settings
- Ensure "Only deploy when checks pass" is ON

---

## 📚 Files Created

```
src/
├── lib/utils/
│   ├── taxDiscount.ts                    # Core calculation logic
│   └── __tests__/
│       └── taxDiscount.test.ts           # 21 unit tests
├── components/invoice/
│   └── TaxDiscountControls.tsx           # React component with error boundary
.github/workflows/
└── ci.yml                                # GitHub Actions CI/CD pipeline
jest.config.ts                            # Jest configuration
jest.setup.ts                             # Test setup
docs/
├── VERCEL_CI_INTEGRATION.md              # Vercel integration guide
└── TAX_DISCOUNT_INTEGRATION.md           # This file
```

---

## 🎓 Key Concepts

**Order of Operations:**
1. Calculate subtotal (sum all items)
2. Apply discount to subtotal
3. Calculate tax on discounted amount
4. Final total = (subtotal - discount) + tax

**Why tax comes after discount:**
- In most jurisdictions, tax applies to the *net* amount (after discounts)
- Example: ₱100 item with 10% discount and 12% tax
  - Wrong: ₱100 + ₱12 tax - ₱10 discount = ₱102
  - Correct: (₱100 - ₱10) + (₱90 × 0.12) = ₱100.80

**Error Handling:**
- Invalid inputs (letters, negative numbers) → prevented at UI level
- Out-of-range values → thrown errors with clear messages
- Calculation errors → caught by error boundary (app stays running)

---

Ready to integrate! Let me know if you need help with any step. 🚀
