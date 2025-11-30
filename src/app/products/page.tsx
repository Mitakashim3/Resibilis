import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { ProductCatalog } from '@/components/products';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Product Catalog | Resibilis',
  description: 'Manage your products and services for quick receipt generation',
};

export default async function ProductsPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect to home if not authenticated
  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header user={user} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Product & Service Catalog
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Save your products and services here so you can quickly add them to your receipts 
              using a dropdown instead of typing them every time.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <ProductCatalog />
          </div>

          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">
              💡 Pro Tip
            </h3>
            <p className="text-sm text-green-700 dark:text-green-400">
              Once you&apos;ve added items here, you can quickly select them when creating a new receipt.
              The default price will be pre-filled, saving you time!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
