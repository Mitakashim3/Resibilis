import { calculateReceiptTotal, formatCurrency, type ReceiptItem } from '../taxDiscount';

describe('Tax & Discount Calculation Logic', () => {
  const sampleItems: ReceiptItem[] = [
    { price: 100, qty: 2 }, // ₱200
    { price: 50, qty: 3 },  // ₱150
  ];
  // Total: ₱350

  describe('calculateReceiptTotal', () => {
    test('should calculate correct subtotal for multiple items', () => {
      const result = calculateReceiptTotal(sampleItems);
      expect(result.subtotal).toBe(350);
    });

    test('should handle 0% tax correctly', () => {
      const result = calculateReceiptTotal(sampleItems, { taxPercent: 0 });
      expect(result.taxAmount).toBe(0);
      expect(result.total).toBe(350);
    });

    test('should calculate 12% VAT correctly', () => {
      const result = calculateReceiptTotal(sampleItems, { taxPercent: 12 });
      expect(result.subtotal).toBe(350);
      expect(result.taxAmount).toBe(42); // 350 * 0.12 = 42
      expect(result.total).toBe(392);
    });

    test('should handle 100% discount (percentage)', () => {
      const result = calculateReceiptTotal(sampleItems, {
        discountType: 'percentage',
        discountValue: 100,
      });
      expect(result.discountAmount).toBe(350);
      expect(result.total).toBe(0);
    });

    test('should apply flat discount correctly', () => {
      const result = calculateReceiptTotal(sampleItems, {
        discountType: 'flat',
        discountValue: 50,
      });
      expect(result.discountAmount).toBe(50);
      expect(result.total).toBe(300); // 350 - 50
    });

    test('should not allow flat discount to exceed subtotal', () => {
      const result = calculateReceiptTotal(sampleItems, {
        discountType: 'flat',
        discountValue: 500, // More than subtotal
      });
      expect(result.discountAmount).toBe(350); // Capped at subtotal
      expect(result.total).toBe(0);
    });

    test('should apply tax AFTER discount', () => {
      // Subtotal: 350
      // Discount: 50 (flat)
      // Taxable: 300
      // Tax (10%): 30
      // Total: 330
      const result = calculateReceiptTotal(sampleItems, {
        taxPercent: 10,
        discountType: 'flat',
        discountValue: 50,
      });
      expect(result.subtotal).toBe(350);
      expect(result.discountAmount).toBe(50);
      expect(result.taxAmount).toBe(30); // 10% of (350-50)
      expect(result.total).toBe(330);
    });

    test('should round currency correctly to 2 decimals', () => {
      const items: ReceiptItem[] = [
        { price: 10.99, qty: 3 }, // 32.97
      ];
      const result = calculateReceiptTotal(items, { taxPercent: 12.5 });
      // Subtotal: 32.97
      // Tax: 32.97 * 0.125 = 4.12125 -> rounds to 4.12
      // Total: 37.09
      expect(result.subtotal).toBe(32.97);
      expect(result.taxAmount).toBe(4.12);
      expect(result.total).toBe(37.09);
    });

    test('should handle empty items array', () => {
      const result = calculateReceiptTotal([]);
      expect(result.subtotal).toBe(0);
      expect(result.total).toBe(0);
    });

    test('should handle zero quantity items', () => {
      const items: ReceiptItem[] = [
        { price: 100, qty: 0 },
        { price: 50, qty: 2 },
      ];
      const result = calculateReceiptTotal(items);
      expect(result.subtotal).toBe(100); // Only the second item counts
    });

    test('should handle decimal prices and quantities', () => {
      const items: ReceiptItem[] = [
        { price: 9.99, qty: 2.5 }, // 24.975 -> rounds to 24.98
      ];
      const result = calculateReceiptTotal(items);
      expect(result.subtotal).toBe(24.98);
    });

    test('should throw error for negative tax', () => {
      expect(() => {
        calculateReceiptTotal(sampleItems, { taxPercent: -5 });
      }).toThrow('Tax percentage must be between 0 and 100');
    });

    test('should throw error for tax > 100%', () => {
      expect(() => {
        calculateReceiptTotal(sampleItems, { taxPercent: 150 });
      }).toThrow('Tax percentage must be between 0 and 100');
    });

    test('should throw error for negative discount', () => {
      expect(() => {
        calculateReceiptTotal(sampleItems, { discountValue: -10 });
      }).toThrow('Discount value cannot be negative');
    });

    test('should throw error for percentage discount > 100%', () => {
      expect(() => {
        calculateReceiptTotal(sampleItems, {
          discountType: 'percentage',
          discountValue: 150,
        });
      }).toThrow('Discount percentage cannot exceed 100%');
    });

    test('should handle complex scenario: multiple items, tax, and discount', () => {
      const items: ReceiptItem[] = [
        { price: 100, qty: 1 },
        { price: 200, qty: 2 },
        { price: 50, qty: 3 },
      ];
      // Subtotal: 100 + 400 + 150 = 650
      // Discount (20%): 650 * 0.2 = 130
      // Taxable: 650 - 130 = 520
      // Tax (12%): 520 * 0.12 = 62.40
      // Total: 520 + 62.40 = 582.40

      const result = calculateReceiptTotal(items, {
        taxPercent: 12,
        discountType: 'percentage',
        discountValue: 20,
      });

      expect(result.subtotal).toBe(650);
      expect(result.discountAmount).toBe(130);
      expect(result.taxAmount).toBe(62.4);
      expect(result.total).toBe(582.4);
    });

    test('should handle very small amounts without precision errors', () => {
      const items: ReceiptItem[] = [
        { price: 0.01, qty: 100 },
      ];
      const result = calculateReceiptTotal(items, { taxPercent: 5 });
      expect(result.subtotal).toBe(1);
      expect(result.taxAmount).toBe(0.05);
      expect(result.total).toBe(1.05);
    });
  });

  describe('formatCurrency', () => {
    test('should format PHP currency correctly', () => {
      expect(formatCurrency(1234.56, 'PHP')).toBe('₱1234.56');
      expect(formatCurrency(0, 'PHP')).toBe('₱0.00');
      expect(formatCurrency(9.9, 'PHP')).toBe('₱9.90');
    });

    test('should format USD currency correctly', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1234.56');
      expect(formatCurrency(0, 'USD')).toBe('$0.00');
    });

    test('should default to PHP when currency not specified', () => {
      expect(formatCurrency(100)).toBe('₱100.00');
    });

    test('should handle negative amounts', () => {
      expect(formatCurrency(-50.25, 'PHP')).toBe('₱-50.25');
    });
  });
});
