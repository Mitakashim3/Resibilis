import { createServerClient } from '@/lib/supabase/server';
import { Header, Footer, FAQ } from '@/components/layout';
import { InvoiceGenerator } from './InvoiceGenerator';

export default async function HomePage() {
  const supabase = await createServerClient();

  // Get current user (more secure than getSession)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header user={user || null} />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <InvoiceGenerator user={user || null} />
      </main>
      <FAQ />
      <Footer />
    </>
  );
}
