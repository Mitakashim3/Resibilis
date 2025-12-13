import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { ProductCatalog } from '@/components/products';
import { Header, Footer } from '@/components/layout';
import { Card } from '@/components/ui';

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
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Product & Service Catalog
            </h1>
            <p className="text-primary-700 dark:text-primary-300">
              Save your products and services here so you can quickly add them to your receipts 
              using a dropdown instead of typing them every time.
            </p>
          </div>

          <Card variant="bordered" className="p-6">
            <ProductCatalog />
          </Card>

          <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200/50 dark:border-primary-700/30">
            <h3 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
              💡 Pro Tip
            </h3>
            <p className="text-sm text-primary-700 dark:text-primary-300">
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
