import { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { createServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'How to Use Resibilis - Step-by-Step Guide',
  description:
    'Learn how to create professional receipts with Resibilis. Step-by-step guide for freelancers, students, and small business owners in the Philippines.',
  alternates: {
    canonical: 'https://resibilis.vercel.app/how-to-use',
  },
  openGraph: {
    title: 'How to Use Resibilis - Step-by-Step Guide',
    description: 'Learn how to create professional receipts with Resibilis. Complete guide for Filipino freelancers.',
    url: 'https://resibilis.vercel.app/how-to-use',
    type: 'article',
  },
};

export default async function HowToUsePage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header user={user || null} />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How to Use <span className="text-primary-500">Resibilis</span>
            </h1>
            <p className="text-lg text-primary-700 dark:text-primary-300">
              Create professional receipts in 4 simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-12">
            {/* Step 1 */}
            <div className="glass-panel rounded-xl p-6 md:p-8 border border-primary-200/30 dark:border-primary-700/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Enter Customer Information
                  </h2>
                  <p className="text-primary-700 dark:text-primary-300 mb-4">
                    Start by entering the customer&apos;s name. This will appear at the top of the 
                    receipt. You can also customize your business name if you have an account.
                  </p>
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border border-primary-200/50 dark:border-primary-700/30">
                    <p className="text-sm text-primary-700 dark:text-primary-300">
                      <strong>Tip:</strong> If you frequently serve the same customers, create 
                      an account to save your receipt history for easy reference.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-panel rounded-xl p-6 md:p-8 border border-primary-200/30 dark:border-primary-700/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Add Your Items
                  </h2>
                  <p className="text-primary-700 dark:text-primary-300 mb-4">
                    Click &quot;Add Item&quot; to add products or services to your receipt. For each item, 
                    enter the name, quantity, and price. The total will be calculated automatically.
                  </p>
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border border-primary-200/50 dark:border-primary-700/30">
                    <p className="text-sm text-primary-700 dark:text-primary-300">
                      <strong>Pro Feature:</strong> With an account, you can save frequently 
                      used items to your Product Catalog for quick selection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-panel rounded-xl p-6 md:p-8 border border-primary-200/30 dark:border-primary-700/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Customize Your Receipt
                  </h2>
                  <p className="text-primary-700 dark:text-primary-300 mb-4">
                    Choose your preferred settings:
                  </p>
                  <ul className="space-y-2 text-primary-700 dark:text-primary-300 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="text-primary-500">•</span>
                      <strong>Currency:</strong> PHP (₱), USD ($), or EUR (€)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary-500">•</span>
                      <strong>Language:</strong> English or Tagalog
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary-500">•</span>
                      <strong>Size:</strong> Standard, Compact, or Wide format
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary-500">•</span>
                      <strong>Notes:</strong> Add any additional information
                    </li>
                  </ul>
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border border-primary-200/50 dark:border-primary-700/30">
                    <p className="text-sm text-primary-700 dark:text-primary-300">
                      <strong>Tip:</strong> Use the live preview on the right to see exactly 
                      how your receipt will look before downloading.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="glass-panel rounded-xl p-6 md:p-8 border border-primary-200/30 dark:border-primary-700/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Download or Save
                  </h2>
                  <p className="text-primary-700 dark:text-primary-300 mb-4">
                    When you&apos;re satisfied with your receipt, you have several options:
                  </p>
                  <ul className="space-y-2 text-primary-700 dark:text-primary-300 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <strong>Download PNG:</strong> High-quality image file, perfect for 
                      printing or sharing via messaging apps
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <strong>Download PDF:</strong> Professional document format, ideal 
                      for email attachments
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <strong>Save to History:</strong> (Requires account) Store receipts 
                      for future reference
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="glass-panel rounded-xl border border-primary-200/30 dark:border-primary-700/30 overflow-hidden">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-foreground hover:bg-primary-100/40 dark:hover:bg-primary-800/30">
                  Is Resibilis really free?
                </summary>
                <div className="px-6 pb-4 text-primary-700 dark:text-primary-300">
                  Yes! Resibilis is completely free to use. You can create unlimited receipts 
                  without any charges. We may introduce optional premium features in the future, 
                  but the core receipt generation will always be free.
                </div>
              </details>

              <details className="glass-panel rounded-xl border border-primary-200/30 dark:border-primary-700/30 overflow-hidden">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-foreground hover:bg-primary-100/40 dark:hover:bg-primary-800/30">
                  Do I need to create an account?
                </summary>
                <div className="px-6 pb-4 text-primary-700 dark:text-primary-300">
                  No, you can use Resibilis without an account. However, creating a free account 
                  gives you access to additional features like receipt history, product catalog, 
                  and custom business name.
                </div>
              </details>

              <details className="glass-panel rounded-xl border border-primary-200/30 dark:border-primary-700/30 overflow-hidden">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-foreground hover:bg-primary-100/40 dark:hover:bg-primary-800/30">
                  Is my data secure?
                </summary>
                <div className="px-6 pb-4 text-primary-700 dark:text-primary-300">
                  Yes, we take security seriously. Receipt generation happens in your browser – 
                  your data is not sent to our servers unless you choose to save it. If you 
                  create an account, your data is protected with industry-standard encryption.
                </div>
              </details>

              <details className="glass-panel rounded-xl border border-primary-200/30 dark:border-primary-700/30 overflow-hidden">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-foreground hover:bg-primary-100/40 dark:hover:bg-primary-800/30">
                  Can I use Resibilis on my phone?
                </summary>
                <div className="px-6 pb-4 text-primary-700 dark:text-primary-300">
                  Absolutely! Resibilis is fully responsive and works great on smartphones and 
                  tablets. You can create receipts on the go, whether you&apos;re on Android or iOS.
                </div>
              </details>

              <details className="glass-panel rounded-xl border border-primary-200/30 dark:border-primary-700/30 overflow-hidden">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-foreground hover:bg-primary-100/40 dark:hover:bg-primary-800/30">
                  Are the receipts official/valid for BIR?
                </summary>
                <div className="px-6 pb-4 text-primary-700 dark:text-primary-300">
                  Resibilis generates informal receipts suitable for small transactions and 
                  personal record-keeping. For official BIR-compliant receipts, you&apos;ll need 
                  to use registered official receipts. Resibilis receipts are perfect for 
                  acknowledgments, informal sales, and personal documentation.
                </div>
              </details>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 mb-6 max-w-xl mx-auto">
              Creating your first receipt takes less than a minute. No sign-up required!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Create Your First Receipt
              <span>→</span>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
