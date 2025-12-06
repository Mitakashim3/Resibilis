'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { createClient } from '@/lib/supabase';
import { InvoiceForm, InvoicePreview } from '@/components/invoice';
import type { ReceiptDimension } from '@/components/invoice';
import { InvoiceHistory } from '@/components/invoice';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { AuthButton } from '@/components/auth';
import { PremiumPromo } from '@/components/premium';
import { Ad } from '@/components/ads';
import {
  InvoiceFormData,
  defaultInvoiceValues,
  calculateTotal,
} from '@/lib/schemas';
import { generateInvoiceNumber } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

interface InvoiceGeneratorProps {
  user: User | null;
}

/**
 * InvoiceGenerator - Main component orchestrating the receipt creation flow
 * 
 * Data Flow:
 * 1. InvoiceForm captures user input and validates via Zod
 * 2. Validated data flows to InvoicePreview via state (formData)
 * 3. On download: html-to-image captures the preview, client-side only
 * 4. On save (authenticated): Data is sent to Supabase with RLS protection
 */
export function InvoiceGenerator({ user }: InvoiceGeneratorProps) {
  const [formData, setFormData] = useState<InvoiceFormData>(defaultInvoiceValues);
  const [isSaving, setIsSaving] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [dimension, setDimension] = useState<ReceiptDimension>('standard');
  const previewRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Handle form data changes from InvoiceForm
  const handleDataChange = useCallback((data: InvoiceFormData) => {
    setFormData(data);
  }, []);

  // Handle dimension change
  const handleDimensionChange = useCallback((newDimension: ReceiptDimension) => {
    setDimension(newDimension);
  }, []);

  // Save to history helper
  const saveToHistory = async (data: InvoiceFormData) => {
    if (!user) return;

    try {
      const total = calculateTotal(data.items);
      
      await supabase.from('invoices').insert({
        user_id: user.id,
        customer_name: data.customerName,
        items: JSON.parse(JSON.stringify(data.items)),
        total_amount: total,
        currency: data.currency,
        notes: data.notes || null,
      } as Database['public']['Tables']['invoices']['Insert']);
    } catch (error) {
      console.error('Error auto-saving to history:', error);
    }
  };

  // Download as PNG - Client-side only (Scenario A: Guest User)
  // Also saves to history if authenticated
  const handleDownload = async () => {
    if (!previewRef.current) return;

    try {
      // Get the actual dimensions of the element
      const element = previewRef.current;
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      // Generate PNG from the preview element
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2, // High quality
        backgroundColor: '#ffffff',
        width: width,
        height: height,
        skipFonts: true, // Skip external fonts to prevent fetch errors
        cacheBust: true,
      });

      // Create download link
      const link = document.createElement('a');
      const invoiceNum = generateInvoiceNumber();
      link.download = `resibo-${invoiceNum}.png`;
      link.href = dataUrl;
      link.click();

      // Auto-save to history if authenticated
      if (user) {
        await saveToHistory(formData);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate receipt image. Please try again.');
    }
  };

  // Download as PDF
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        skipFonts: true,
        cacheBust: true,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5',
      });

      // Add image to PDF with proper scaling
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pdfWidth - 20; // 10mm margins on each side
      const imgHeight = (previewRef.current.offsetHeight / previewRef.current.offsetWidth) * imgWidth;
      pdf.addImage(dataUrl, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`resibo-${generateInvoiceNumber()}.pdf`);

      // Auto-save to history if authenticated
      if (user) {
        await saveToHistory(formData);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Save to database - Only for authenticated users (Scenario C)
  const handleSave = async (data: InvoiceFormData) => {
    if (!user) {
      alert('Please sign in to save receipts.');
      return;
    }

    try {
      setIsSaving(true);
      
      const total = calculateTotal(data.items);
      
      const { error } = await supabase.from('invoices').insert({
        user_id: user.id,
        customer_name: data.customerName,
        items: JSON.parse(JSON.stringify(data.items)),
        total_amount: total,
        currency: data.currency,
        notes: data.notes || null,
      } as Database['public']['Tables']['invoices']['Insert']);

      if (error) throw error;
      
      // Show success feedback
      alert('Receipt saved successfully!');
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('Failed to save receipt. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Premium Banner for Guest Users */}
      {!user && <PremiumPromo variant="banner" />}

      {/* Hero Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Create Your <span className="text-primary-500">Resibo</span>
        </h2>
        <p className="text-primary-600 dark:text-primary-400 max-w-md mx-auto">
          Fast, free, and secure. Generate professional receipts in seconds.
        </p>
      </div>

      {/* Main Layout: Responsive Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Form */}
        <div className="space-y-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Receipt Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InvoiceForm
                onDataChange={handleDataChange}
                onSave={user ? handleSave : undefined}
                onDownload={handleDownload}
                onDimensionChange={handleDimensionChange}
                isAuthenticated={!!user}
                isSaving={isSaving}
              />
            </CardContent>
          </Card>

          {/* Auth Prompt for Guest Users */}
          {!user && <PremiumPromo variant="card" />}

          {/* History for Authenticated Users */}
          {user && <InvoiceHistory userId={user.id} />}

          {/* Ad Placement - Below Form/History */}
          <Ad 
            slot="YOUR_AD_SLOT_ID" 
            size="rectangle" 
            className="mx-auto"
            showPlaceholder={true} // Set to false in production
          />
        </div>

        {/* Right Column: Preview (Desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Card variant="bordered">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Live Preview
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownloadPDF}
                    className="text-gray-500"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-visible">
                <div className="overflow-x-auto">
                  <InvoicePreview ref={previewRef} data={formData} dimension={dimension} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Preview Button (Sticky) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <Button
          variant="primary"
          onClick={() => setShowMobilePreview(true)}
          className="w-full shadow-lg"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Preview Receipt
        </Button>
      </div>

      {/* Mobile Preview Modal */}
      {showMobilePreview && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm">
          <div className="fixed inset-x-4 top-4 bottom-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Receipt Preview
              </h3>
              <button
                onClick={() => setShowMobilePreview(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-gray-900">
              <div className="overflow-x-auto">
                <InvoicePreview ref={previewRef} data={formData} dimension={dimension} />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <Button
                variant="primary"
                onClick={() => {
                  handleDownload();
                  setShowMobilePreview(false);
                }}
                className="w-full"
              >
                Download PNG
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  handleDownloadPDF();
                  setShowMobilePreview(false);
                }}
                className="w-full"
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
