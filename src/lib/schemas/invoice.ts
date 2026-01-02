import { z } from 'zod';
import DOMPurify from 'dompurify';

/**
 * Zod Schemas for Resibilis
 * All user inputs are validated here before processing
 * This is the first line of defense against XSS and malformed data
 */

// Custom transformer to sanitize strings
const sanitizedString = (maxLength: number = 500) =>
  z
    .string()
    .max(maxLength, `Maximum ${maxLength} characters allowed`)
    .transform((val) => {
      // Only run DOMPurify on client-side
      if (typeof window !== 'undefined') {
        return DOMPurify.sanitize(val.trim(), {
          ALLOWED_TAGS: [], // Strip all HTML tags
          ALLOWED_ATTR: [], // Strip all attributes
        });
      }
      // Server-side: basic sanitization
      return val
        .trim()
        .replace(/[<>]/g, '') // Remove angle brackets
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, ''); // Remove event handlers
    });

// Individual line item in the invoice
export const invoiceItemSchema = z.object({
  id: z.string().uuid().optional(), // For tracking in UI
  item: sanitizedString(200).refine(
    (val) => val.length >= 1,
    'Item name is required'
  ),
  qty: z
    .number()
    .int('Quantity must be a whole number')
    .min(1, 'Minimum quantity is 1')
    .max(99999, 'Maximum quantity is 99,999'),
  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(99999999.99, 'Maximum price is ₱99,999,999.99'),
});

export type InvoiceItem = z.infer<typeof invoiceItemSchema>;

// Language type for receipt translations
export type Language = 'en' | 'tl';

// Base invoice form schema (without refinements)
const baseInvoiceFormSchema = z.object({
  businessName: sanitizedString(200).optional().default(''),
  customerName: sanitizedString(200).refine(
    (val) => val.length >= 1,
    'Customer name is required'
  ),
  items: z
    .array(invoiceItemSchema)
    .min(1, 'At least one item is required')
    .max(50, 'Maximum 50 items per invoice'),
  notes: sanitizedString(1000).optional().default(''),
  currency: z.enum(['PHP', 'USD']).default('PHP'),
  language: z.enum(['en', 'tl']).default('en'),
  // Tax and Discount fields
  taxPercent: z
    .number()
    .min(0, 'Tax cannot be negative')
    .max(100, 'Tax cannot exceed 100%')
    .optional()
    .default(0),
  discountType: z.enum(['flat', 'percentage']).optional().default('percentage'),
  discountValue: z
    .number()
    .min(0, 'Discount cannot be negative')
    .optional()
    .default(0),
});

// Main invoice form schema with cross-field validation
export const invoiceFormSchema = baseInvoiceFormSchema.refine((data) => {
  // Cross-field validation: percentage discount cannot exceed 100%
  if (data.discountType === 'percentage' && (data.discountValue || 0) > 100) {
    return false;
  }
  return true;
}, {
  message: 'Discount percentage cannot exceed 100%',
  path: ['discountValue'],
});

export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

// Schema for saving to database (includes computed fields)
export const invoiceDbSchema = baseInvoiceFormSchema.extend({
  totalAmount: z.number().min(0),
});

export type InvoiceDbData = z.infer<typeof invoiceDbSchema>;

// Profile schema (synced from auth)
export const profileSchema = z.object({
  id: z.string().uuid(),
  fullName: sanitizedString(200).nullable(),
  avatarUrl: z.string().url().nullable(),
  updatedAt: z.string().datetime(),
});

export type Profile = z.infer<typeof profileSchema>;

// Helper function to calculate total (handles NaN safely)
export function calculateTotal(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    return sum + qty * price;
  }, 0);
}

// Helper to create a new empty item
export function createEmptyItem(): InvoiceItem {
  return {
    id: crypto.randomUUID(),
    item: '',
    qty: 1,
    price: 0,
  };
}

// Default form values
export const defaultInvoiceValues: InvoiceFormData = {
  businessName: '',
  customerName: '',
  items: [createEmptyItem()],
  notes: '',
  currency: 'PHP',
  language: 'en',
  taxPercent: 0,
  discountType: 'percentage',
  discountValue: 0,
};
