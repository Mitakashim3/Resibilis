/**
 * Tax & Discount Calculation Utility
 * Handles currency-safe decimal math for receipt totals
 */

export interface ReceiptItem {
  price: number;
  qty: number;
}

export interface TaxDiscountOptions {
  taxPercent?: number; // e.g., 12 for 12% VAT
  discountType?: 'flat' | 'percentage';
  discountValue?: number; // Flat amount or percentage
}

export interface ReceiptCalculation {
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}

/**
 * Round to 2 decimal places (currency-safe)
 */
function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculate receipt totals with tax and discount
 * 
 * Order of operations:
 * 1. Calculate subtotal (sum of all items)
 * 2. Apply discount to subtotal
 * 3. Apply tax to discounted amount
 * 4. Final total = discounted subtotal + tax
 * 
 * @param items - Array of receipt items
 * @param options - Tax and discount configuration
 * @returns Breakdown of subtotal, tax, discount, and final total
 */
export function calculateReceiptTotal(
  items: ReceiptItem[],
  options: TaxDiscountOptions = {}
): ReceiptCalculation {
  const { taxPercent = 0, discountType = 'flat', discountValue = 0 } = options;

  // Validate inputs
  if (taxPercent < 0 || taxPercent > 100) {
    throw new Error('Tax percentage must be between 0 and 100');
  }
  if (discountValue < 0) {
    throw new Error('Discount value cannot be negative');
  }
  if (discountType === 'percentage' && discountValue > 100) {
    throw new Error('Discount percentage cannot exceed 100%');
  }

  // Step 1: Calculate subtotal
  const subtotal = roundCurrency(
    items.reduce((sum, item) => {
      const itemTotal = (item.price || 0) * (item.qty || 0);
      return sum + itemTotal;
    }, 0)
  );

  // Step 2: Calculate discount
  let discountAmount = 0;
  if (discountType === 'flat') {
    discountAmount = Math.min(discountValue, subtotal); // Can't discount more than subtotal
  } else if (discountType === 'percentage') {
    discountAmount = (subtotal * discountValue) / 100;
  }
  discountAmount = roundCurrency(discountAmount);

  // Step 3: Calculate taxable amount (after discount)
  const taxableAmount = subtotal - discountAmount;

  // Step 4: Calculate tax
  const taxAmount = roundCurrency((taxableAmount * taxPercent) / 100);

  // Step 5: Final total
  const total = roundCurrency(taxableAmount + taxAmount);

  return {
    subtotal,
    taxAmount,
    discountAmount,
    total,
  };
}

/**
 * Format currency for display (Philippine Peso by default)
 */
export function formatCurrency(
  amount: number,
  currency: 'PHP' | 'USD' = 'PHP'
): string {
  const symbol = currency === 'PHP' ? '₱' : '$';
  return `${symbol}${amount.toFixed(2)}`;
}
