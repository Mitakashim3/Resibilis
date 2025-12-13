'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  invoiceFormSchema,
  InvoiceFormData,
  createEmptyItem,
  defaultInvoiceValues,
  Language,
} from '@/lib/schemas';
import { Button, Input, Textarea, Select, Modal } from '@/components/ui';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Package, Wrench, ChevronDown, Languages } from 'lucide-react';
import type { Database } from '@/types/database';

// Receipt dimension options
export type ReceiptDimension = 'standard' | 'compact' | 'thermal' | 'a4';

export const dimensionOptions: { value: ReceiptDimension; label: string; width: number; description: string }[] = [
  { value: 'standard', label: 'Standard', width: 400, description: '400px - Perfect for digital sharing' },
  { value: 'compact', label: 'Compact', width: 320, description: '320px - Mobile-friendly' },
  { value: 'thermal', label: 'Thermal', width: 280, description: '280px - Like POS receipts' },
  { value: 'a4', label: 'A4 Full', width: 595, description: '595px - Full page width' },
];

type ProductRow = Database['public']['Tables']['products_services']['Row'];

interface Product {
  id: string;
  name: string;
  description: string | null;
  type: 'product' | 'service';
  default_price: number | null;
  unit: string | null;
}

interface InvoiceFormProps {
  onDataChange: (data: InvoiceFormData) => void;
  onSave?: (data: InvoiceFormData) => Promise<void>;
  onDownload: () => void;
  onDimensionChange?: (dimension: ReceiptDimension) => void;
  isAuthenticated: boolean;
  isSaving?: boolean;
}

export function InvoiceForm({
  onDataChange,
  onSave,
  onDownload,
  onDimensionChange,
  isAuthenticated,
  isSaving = false,
}: InvoiceFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductDropdown, setShowProductDropdown] = useState<number | null>(null);
  const [selectedDimension, setSelectedDimension] = useState<ReceiptDimension>('standard');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const supabase = createClient();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: defaultInvoiceValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // Fetch user's products
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  async function fetchProducts() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('products_services')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      // Map database rows to Product interface
      const mappedProducts: Product[] = (data || []).map((row: ProductRow) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        type: row.type as 'product' | 'service',
        default_price: row.default_price,
        unit: row.unit,
      }));

      setProducts(mappedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }

  // Watch form changes and notify parent
  const formData = watch();
  
  // Update parent with current form data
  const handleFormChange = useCallback(() => {
    // Get latest form values using getValues for immediate response
    const currentData = watch();
    // Validate and transform data before sending
    const result = invoiceFormSchema.safeParse(currentData);
    if (result.success) {
      onDataChange(result.data);
    } else {
      // Send partial data for preview even if not fully valid
      onDataChange(currentData);
    }
  }, [watch, onDataChange]);

  const handleDimensionChange = (dimension: ReceiptDimension) => {
    setSelectedDimension(dimension);
    onDimensionChange?.(dimension);
  };

  const handleSaveClick = handleSubmit(async (data) => {
    if (onSave) {
      await onSave(data);
    }
    setShowSaveModal(false);
  });

  const handleDownloadClick = () => {
    onDownload();
    setShowDownloadModal(false);
  };

  const handleSelectProduct = (index: number, product: Product) => {
    setValue(`items.${index}.item`, product.name);
    if (product.default_price) {
      setValue(`items.${index}.price`, product.default_price);
    }
    setShowProductDropdown(null);
    handleFormChange();
  };

  const currencyOptions = [
    { value: 'PHP', label: '₱ PHP (Philippine Peso)' },
    { value: 'USD', label: '$ USD (US Dollar)' },
  ];

  return (
    <form
      onChange={handleFormChange}
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Receipt Dimension Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Receipt Size / Laki ng Resibo
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {dimensionOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleDimensionChange(option.value)}
              className={cn(
                'p-3 rounded-lg border text-sm transition-all',
                selectedDimension === option.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-primary-200 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600'
              )}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-primary-600 dark:text-primary-400">{option.width}px</div>
            </button>
          ))}
        </div>
      </div>

      {/* Language Toggle */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Receipt Language / Wika ng Resibo
        </label>
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  field.onChange('en');
                  handleFormChange();
                }}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border text-sm transition-all',
                  field.value === 'en'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'border-primary-200 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600'
                )}
              >
                <Languages className="w-4 h-4" />
                <span className="font-medium">English</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  field.onChange('tl');
                  handleFormChange();
                }}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border text-sm transition-all',
                  field.value === 'tl'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'border-primary-200 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600'
                )}
              >
                <Languages className="w-4 h-4" />
                <span className="font-medium">Tagalog</span>
              </button>
            </div>
          )}
        />
      </div>

      {/* Business Name / Receipt Title */}
      <Input
        label="Business Name / Pangalan ng Negosyo (Optional)"
        placeholder="My Business Name / RESIBILIS"
        error={errors.businessName?.message}
        {...register('businessName')}
      />

      {/* Customer Name */}
      <Input
        label="Customer Name / Pangalan ng Customer"
        placeholder="Juan dela Cruz"
        error={errors.customerName?.message}
        {...register('customerName')}
      />

      {/* Currency Selection */}
      <Controller
        name="currency"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Currency / Pera
            </label>
            <div className="flex gap-2">
              {currencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    field.onChange(option.value);
                    // Trigger immediate update
                    setTimeout(handleFormChange, 0);
                  }}
                  className={cn(
                    'flex-1 p-3 rounded-lg border text-sm transition-all',
                    field.value === option.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-primary-200 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600'
                  )}
                >
                  <div className="font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      />

      {/* Line Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">
            Items / Mga Produkto
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append(createEmptyItem())}
            disabled={fields.length >= 50}
          >
            + Add Item
          </Button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={cn(
                'grid gap-3 p-4 rounded-lg border',
                'border-gray-200 dark:border-gray-700',
                'bg-gray-50 dark:bg-gray-800/50'
              )}
            >
              {/* Mobile: Stack, Desktop: Grid */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_120px_40px] gap-3 items-start">
                {/* Item Name with Product Dropdown */}
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Item name"
                        error={errors.items?.[index]?.item?.message}
                        {...register(`items.${index}.item`)}
                      />
                    </div>
                    {isAuthenticated && products.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowProductDropdown(showProductDropdown === index ? null : index)}
                        className={cn(
                          'px-3 py-2 rounded-lg border transition-colors h-10',
                          'border-gray-300 dark:border-gray-600',
                          'hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
                          showProductDropdown === index && 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        )}
                        title="Select from saved products"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* Product Dropdown */}
                  {showProductDropdown === index && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {products.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleSelectProduct(index, product)}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                        >
                          <span className={cn(
                            'p-1 rounded',
                            product.type === 'product' 
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                          )}>
                            {product.type === 'product' ? <Package className="w-3 h-3" /> : <Wrench className="w-3 h-3" />}
                          </span>
                          <span className="flex-1 text-sm">{product.name}</span>
                          {product.default_price && (
                            <span className="text-xs text-gray-500">₱{product.default_price}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <Input
                  type="number"
                  placeholder="Qty"
                  min={1}
                  max={99999}
                  error={errors.items?.[index]?.qty?.message}
                  {...register(`items.${index}.qty`, { valueAsNumber: true })}
                />

                {/* Price */}
                <Input
                  type="number"
                  placeholder="Price"
                  min={0}
                  step="0.01"
                  error={errors.items?.[index]?.price?.message}
                  {...register(`items.${index}.price`, { valueAsNumber: true })}
                />

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-10"
                  aria-label="Remove item"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {errors.items?.message && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.items.message}
          </p>
        )}
      </div>

      {/* Notes */}
      <Textarea
        label="Notes / Mga Tala (Optional)"
        placeholder="Thank you for your support! / Salamat sa inyong suporta!"
        {...register('notes')}
        error={errors.notes?.message}
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        {/* Download Button - Always available (Guest User Scenario) */}
        <Button
          type="button"
          variant="primary"
          onClick={() => setShowDownloadModal(true)}
          className="flex-1"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Resibo (PNG)
        </Button>

        {/* Save Button - Only for authenticated users */}
        {isAuthenticated && onSave && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowSaveModal(true)}
            isLoading={isSaving}
            disabled={!isValid}
            className="flex-1"
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
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Save to History
          </Button>
        )}
      </div>

      {!isAuthenticated && (
        <p className="text-sm text-primary-600 dark:text-primary-400 text-center">
          Sign in to save receipts to your history
        </p>
      )}

      {/* Download Confirmation Modal */}
      <Modal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        title="Download Receipt"
      >
        <div className="space-y-4">
          <p className="text-primary-700 dark:text-primary-300">
            Your receipt will be downloaded as a PNG image.
          </p>
          <div className="rounded-lg p-3 text-sm bg-primary-50 dark:bg-primary-900/20 border border-primary-200/50 dark:border-primary-700/30">
            <p className="text-primary-700 dark:text-primary-300">
              <strong>Size:</strong> {dimensionOptions.find(d => d.value === selectedDimension)?.description}
            </p>
          </div>
          {isAuthenticated && (
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ This receipt will also be saved to your history automatically.
            </p>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowDownloadModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDownloadClick}>
              Download Now
            </Button>
          </div>
        </div>
      </Modal>

      {/* Save Confirmation Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save to History"
      >
        <div className="space-y-4">
          <p className="text-primary-700 dark:text-primary-300">
            This receipt will be saved to your history. You can view, edit, or download it later.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-sm text-green-700 dark:text-green-300">
            <p>💾 Your receipt data will be securely stored in your account.</p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveClick} isLoading={isSaving}>
              Save Receipt
            </Button>
          </div>
        </div>
      </Modal>
    </form>
  );
}
