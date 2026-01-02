'use client';

import React, { useState, useCallback } from 'react';
import { calculateReceiptTotal, formatCurrency, type ReceiptItem } from '@/lib/utils/taxDiscount';

interface TaxDiscountControlsProps {
  items: ReceiptItem[];
  currency?: 'PHP' | 'USD';
  onTotalChange?: (total: number) => void;
}

/**
 * Error Boundary for Tax/Discount Controls
 * Prevents the entire app from crashing if calculation errors occur
 */
class TaxDiscountErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('TaxDiscount calculation error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
            Calculation Error
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300">
            {this.state.error?.message || 'An error occurred during calculation'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-3 text-sm text-red-700 dark:text-red-200 underline hover:no-underline"
          >
            Reset
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Tax & Discount Controls Component
 * Real-time calculation with input validation
 */
function TaxDiscountControlsInner({
  items,
  currency = 'PHP',
  onTotalChange,
}: TaxDiscountControlsProps) {
  const [taxPercent, setTaxPercent] = useState<string>('');
  const [discountType, setDiscountType] = useState<'flat' | 'percentage'>('percentage');
  const [discountValue, setDiscountValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * Safe number parsing with validation
   */
  const parseNumber = useCallback((value: string): number => {
    if (value === '' || value === '-') return 0;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  /**
   * Calculate totals with current settings
   */
  const calculation = React.useMemo(() => {
    try {
      setError('');
      const result = calculateReceiptTotal(items, {
        taxPercent: parseNumber(taxPercent),
        discountType,
        discountValue: parseNumber(discountValue),
      });
      
      // Notify parent of total change
      if (onTotalChange) {
        onTotalChange(result.total);
      }
      
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Calculation error';
      setError(errorMsg);
      return {
        subtotal: 0,
        taxAmount: 0,
        discountAmount: 0,
        total: 0,
      };
    }
  }, [items, taxPercent, discountType, discountValue, parseNumber, onTotalChange]);

  /**
   * Handle input with validation
   */
  const handleNumberInput = useCallback(
    (value: string, setter: React.Dispatch<React.SetStateAction<string>>, max?: number) => {
      // Allow empty, numbers, and single decimal point
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        // Validate max if provided
        if (max !== undefined) {
          const num = parseFloat(value);
          if (!isNaN(num) && num > max) {
            setError(`Value cannot exceed ${max}`);
            return;
          }
        }
        setError('');
        setter(value);
      } else {
        setError('Please enter a valid number');
      }
    },
    []
  );

  return (
    <div className="space-y-4">
      {/* Tax Input */}
      <div>
        <label htmlFor="tax-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tax %
        </label>
        <input
          id="tax-input"
          type="text"
          inputMode="decimal"
          value={taxPercent}
          onChange={(e) => handleNumberInput(e.target.value, setTaxPercent, 100)}
          placeholder="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          aria-label="Tax percentage"
          aria-describedby="tax-help"
        />
        <p id="tax-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          e.g., 12 for 12% VAT
        </p>
      </div>

      {/* Discount Type */}
      <div>
        <label htmlFor="discount-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Discount Type
        </label>
        <select
          id="discount-type"
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value as 'flat' | 'percentage')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          aria-label="Discount type"
        >
          <option value="percentage">Percentage (%)</option>
          <option value="flat">Flat Amount ({currency})</option>
        </select>
      </div>

      {/* Discount Value */}
      <div>
        <label htmlFor="discount-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Discount {discountType === 'percentage' ? '%' : 'Amount'}
        </label>
        <input
          id="discount-input"
          type="text"
          inputMode="decimal"
          value={discountValue}
          onChange={(e) =>
            handleNumberInput(
              e.target.value,
              setDiscountValue,
              discountType === 'percentage' ? 100 : undefined
            )
          }
          placeholder="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          aria-label="Discount value"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Calculation Breakdown */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(calculation.subtotal, currency)}
          </span>
        </div>
        
        {calculation.discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Discount:</span>
            <span className="font-medium text-green-600 dark:text-green-400">
              -{formatCurrency(calculation.discountAmount, currency)}
            </span>
          </div>
        )}
        
        {calculation.taxAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Tax ({taxPercent}%):</span>
            <span className="font-medium text-gray-900 dark:text-white">
              +{formatCurrency(calculation.taxAmount, currency)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-gray-900 dark:text-white">Total:</span>
          <span className="text-primary-600 dark:text-primary-400">
            {formatCurrency(calculation.total, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Exported component with error boundary
 */
export function TaxDiscountControls(props: TaxDiscountControlsProps) {
  return (
    <TaxDiscountErrorBoundary>
      <TaxDiscountControlsInner {...props} />
    </TaxDiscountErrorBoundary>
  );
}
