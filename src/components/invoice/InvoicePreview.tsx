'use client';

import { forwardRef, useState, useEffect } from 'react';
import { InvoiceFormData, calculateTotal } from '@/lib/schemas';
import { formatCurrency, generateInvoiceNumber } from '@/lib/utils';
import type { ReceiptDimension } from './InvoiceForm';

const dimensionWidths: Record<ReceiptDimension, number> = {
  standard: 400,
  compact: 320,
  thermal: 280,
  a4: 595,
};

interface InvoicePreviewProps {
  data: InvoiceFormData;
  invoiceNumber?: string;
  dimension?: ReceiptDimension;
}

/**
 * InvoicePreview Component
 * 
 * IMPORTANT: This component maintains white background (#FFFFFF) and black text
 * regardless of the app's dark/light mode. This ensures receipts are always
 * readable when printed or shared via messaging apps.
 */
export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ data, invoiceNumber, dimension = 'standard' }, ref) => {
    const [receiptNumber, setReceiptNumber] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>('');
    
    // Generate these values only on client to avoid hydration mismatch
    useEffect(() => {
      setReceiptNumber(invoiceNumber || generateInvoiceNumber());
      setCurrentDate(new Date().toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }));
    }, [invoiceNumber]);
    
    const total = calculateTotal(data.items);
    const currencySymbol = data.currency === 'PHP' ? '₱' : '$';
    const width = dimensionWidths[dimension];

    return (
      <div
        ref={ref}
        className="mx-auto"
        style={{
          // Force white background for printing/export - NEVER dark mode
          backgroundColor: '#FFFFFF',
          color: '#000000',
          width: `${width}px`,
          maxWidth: '100%',
        }}
      >
        {/* Receipt Paper */}
        <div
          className="p-6 shadow-lg rounded-lg border"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#e5e7eb',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: dimension === 'thermal' ? '12px' : dimension === 'compact' ? '13px' : '14px',
          }}
        >
          {/* Header */}
          <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: '#000000' }}
            >
              RESIBILIS
            </h1>
            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>
              Official Receipt / Opisyal na Resibo
            </p>
          </div>

          {/* Receipt Info */}
          <div className="text-sm space-y-1 mb-4">
            <div className="flex justify-between">
              <span style={{ color: '#6b7280' }}>Receipt #:</span>
              <span className="font-medium" style={{ color: '#000000' }}>
                {receiptNumber || '---'}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#6b7280' }}>Date:</span>
              <span className="font-medium" style={{ color: '#000000' }}>
                {currentDate || '---'}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#6b7280' }}>Customer:</span>
              <span
                className="font-medium text-right truncate max-w-[200px]"
                style={{ color: '#000000' }}
              >
                {data.customerName || 'Guest Customer'}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            className="border-t border-dashed my-4"
            style={{ borderColor: '#d1d5db' }}
          />

          {/* Items Header */}
          <div
            className="grid grid-cols-[1fr_50px_80px] text-xs font-semibold mb-2"
            style={{ color: '#6b7280' }}
          >
            <span>ITEM</span>
            <span className="text-center">QTY</span>
            <span className="text-right">AMOUNT</span>
          </div>

          {/* Items List */}
          <div className="space-y-2">
            {data.items.map((item, index) => {
              const qty = Number(item.qty) || 0;
              const price = Number(item.price) || 0;
              const lineTotal = qty * price;
              return (
                <div
                  key={item.id || index}
                  className="grid grid-cols-[1fr_50px_80px] text-sm"
                  style={{ color: '#000000' }}
                >
                  <span className="truncate pr-2">
                    {item.item || `Item ${index + 1}`}
                  </span>
                  <span className="text-center">{qty}</span>
                  <span className="text-right font-medium">
                    {currencySymbol}
                    {lineTotal.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div
            className="border-t border-dashed my-4"
            style={{ borderColor: '#d1d5db' }}
          />

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span style={{ color: '#000000' }}>TOTAL</span>
            <span style={{ color: '#000000' }}>
              {formatCurrency(total, data.currency)}
            </span>
          </div>

          {/* Notes */}
          {data.notes && (
            <>
              <div
                className="border-t border-dashed my-4"
                style={{ borderColor: '#d1d5db' }}
              />
              <div className="text-sm">
                <p className="font-medium mb-1" style={{ color: '#6b7280' }}>
                  Notes:
                </p>
                <p
                  className="whitespace-pre-wrap break-words"
                  style={{ color: '#000000' }}
                >
                  {data.notes}
                </p>
              </div>
            </>
          )}

          {/* Footer */}
          <div
            className="border-t border-dashed mt-4 pt-4 text-center text-xs"
            style={{ color: '#9ca3af' }}
          >
            <p>Salamat sa inyong suporta!</p>
            <p>Thank you for your business!</p>
            <p className="mt-2">Generated by Resibilis</p>
          </div>
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';
