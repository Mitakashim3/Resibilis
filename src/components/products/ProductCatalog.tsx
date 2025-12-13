'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Modal } from '@/components/ui';
import { Trash2, Edit2, Plus, Package, Wrench } from 'lucide-react';
import DOMPurify from 'dompurify';
import type { Database } from '@/types/database';
import { cn } from '@/lib/utils';

type ProductRow = Database['public']['Tables']['products_services']['Row'];

const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  type: z.enum(['product', 'service']),
  default_price: z.number().min(0, 'Price must be positive').optional().nullable(),
  unit: z.string().max(20, 'Unit too long').optional(),
});

type ProductForm = z.infer<typeof productSchema>;

interface Product {
  id: string;
  name: string;
  description: string | null;
  type: 'product' | 'service';
  default_price: number | null;
  unit: string | null;
  created_at: string;
}

interface ProductCatalogProps {
  onSelectProduct?: (product: Product) => void;
  selectionMode?: boolean;
}

export function ProductCatalog({ onSelectProduct, selectionMode = false }: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<'all' | 'product' | 'service'>('all');
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      type: 'product',
    },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setProducts([]);
        return;
      }

      const { data, error } = await supabase
        .from('products_services')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (error) throw error;
      
      // Map database rows to Product interface
      const mappedProducts: Product[] = (data || []).map((row: ProductRow) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        type: row.type as 'product' | 'service',
        default_price: row.default_price,
        unit: row.unit,
        created_at: row.created_at,
      }));
      
      setProducts(mappedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data: ProductForm) {
    try {
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Please sign in to manage products');
        return;
      }

      const sanitizedData = {
        name: DOMPurify.sanitize(data.name),
        description: data.description ? DOMPurify.sanitize(data.description) : null,
        type: data.type,
        default_price: data.default_price || null,
        unit: data.unit ? DOMPurify.sanitize(data.unit) : null,
        user_id: user.id,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products_services')
          .update(sanitizedData)
          .eq('id', editingProduct.id)
          .eq('user_id', user.id); // IDOR protection

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products_services')
          .insert(sanitizedData as Database['public']['Tables']['products_services']['Insert']);

        if (error) throw error;
      }

      await fetchProducts();
      closeModal();
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product');
    }
  }

  async function handleDelete() {
    if (!deletingProduct) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Please sign in to delete products');
        return;
      }

      const { error } = await supabase
        .from('products_services')
        .delete()
        .eq('id', deletingProduct.id)
        .eq('user_id', user.id); // IDOR protection

      if (error) throw error;

      await fetchProducts();
      setShowDeleteModal(false);
      setDeletingProduct(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setValue('name', product.name);
    setValue('description', product.description || '');
    setValue('type', product.type);
    setValue('default_price', product.default_price || undefined);
    setValue('unit', product.unit || '');
    setShowAddModal(true);
  }

  function closeModal() {
    setShowAddModal(false);
    setEditingProduct(null);
    reset();
  }

  const filteredProducts = products.filter(
    (p) => filter === 'all' || p.type === filter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'product' | 'service')}
            className="rounded-lg border border-primary-200/60 dark:border-primary-700/40 bg-paper text-paper-foreground px-3 py-2 text-sm"
          >
            <option value="all">All Items</option>
            <option value="product">Products Only</option>
            <option value="service">Services Only</option>
          </select>
        </div>
        
        {!selectionMode && (
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-primary-600 dark:text-primary-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No items yet. Add your first product or service!</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={cn(
                'flex items-center justify-between p-4 rounded-lg glass-panel border border-primary-200/30 dark:border-primary-700/30',
                selectionMode
                  ? 'cursor-pointer hover:border-primary-500/60 transition-colors'
                  : ''
              )}
              onClick={() => selectionMode && onSelectProduct?.(product)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  product.type === 'product' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                }`}>
                  {product.type === 'product' ? (
                    <Package className="w-4 h-4" />
                  ) : (
                    <Wrench className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  {product.description && (
                    <p className="text-sm text-primary-600 dark:text-primary-400">{product.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1 text-xs text-primary-600/80 dark:text-primary-400/80">
                    <span className="capitalize">{product.type}</span>
                    {product.default_price && (
                      <>
                        <span>•</span>
                        <span>₱{product.default_price.toLocaleString()}{product.unit ? ` / ${product.unit}` : ''}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {!selectionMode && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="p-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDeletingProduct(product);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 text-primary-600 dark:text-primary-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={closeModal}
        title={editingProduct ? 'Edit Item' : 'Add New Item'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
              Type
            </label>
            <select
              {...register('type')}
              className="w-full rounded-lg border border-primary-200/60 dark:border-primary-700/40 bg-paper text-paper-foreground px-3 py-2"
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
          </div>

          <Input
            label="Name"
            {...register('name')}
            error={errors.name?.message}
            placeholder="e.g., Logo Design, T-Shirt"
          />

          <div>
            <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
              Description (optional)
            </label>
            <textarea
              {...register('description')}
              rows={2}
              className="w-full rounded-lg border border-primary-200/60 dark:border-primary-700/40 bg-paper text-paper-foreground px-3 py-2 text-sm"
              placeholder="Brief description of the item"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Default Price (₱)"
              type="number"
              step="0.01"
              {...register('default_price', { valueAsNumber: true })}
              error={errors.default_price?.message}
              placeholder="0.00"
            />
            <Input
              label="Unit (optional)"
              {...register('unit')}
              error={errors.unit?.message}
              placeholder="e.g., pc, hour, kg"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingProduct ? 'Update' : 'Add Item'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingProduct(null);
        }}
        title="Delete Item"
      >
        <p className="text-primary-700 dark:text-primary-300 mb-6">
          Are you sure you want to delete &quot;{deletingProduct?.name}&quot;? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false);
              setDeletingProduct(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
