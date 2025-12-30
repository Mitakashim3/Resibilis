import { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { createServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'About Resibilis - Creator & Mission',
  description:
    'Learn about Resibilis and its creator, Clark Jim Gabiota. Resibilis is a secure, Next.js-based receipt generator built for Filipino freelancers and small business owners.',
  alternates: {
    canonical: 'https://resibilis.vercel.app/about',
  },
  openGraph: {
    title: 'About Resibilis - Creator & Mission',
    description:
      'Learn about Resibilis and its creator, Clark Jim Gabiota. A secure receipt generator built for Filipino freelancers.',
    url: 'https://resibilis.vercel.app/about',
    type: 'website',
  },
};

export default async function AboutPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="text-primary-500">Resibilis</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Built with care for Filipino entrepreneurs
            </p>
          </div>

          {/* Creator Section 
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Creator
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Hi! I&apos;m <strong>Clark Jim Gabiota</strong>, a Computer Science student at
                STI-West Negros University in Bacolod City, Philippines. My journey in tech began
                with the precision of data handling as a LiDAR Annotator, but my true passion
                quickly evolved into building the systems that process that data.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                Today, I&apos;m a full-stack developer who bridges the gap between complex backend
                architecture and intuitive user experiences. I don&apos;t just learn languages; I adopt
                the right tools for the job—expanding from web fundamentals into systems programming
                with Rust and Go, and advanced AI integration using Python.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                My development philosophy centers on <strong>&quot;Pagpalangga&quot; (care)</strong>—building
                software that is not only technically sound but genuinely helpful to its users.
              </p>

              <h3 className="text-gray-900 dark:text-white">Recent Work</h3>
              <ul>
                <li>
                  <strong>Resibilis:</strong> I built this secure, Next.js 16-based platform to help Filipino
                  freelancers and sari-sari store owners generate professional receipts, focusing on
                  strict security measures like Row Level Security and XSS protection.
                </li>
                <li>
                  <strong>Kalag:</strong> A RAG (Retrieval-Augmented Generation) application that lets users search
                  and interact with PDFs using Google Gemini Vision and vector databases.
                </li>
                <li>
                  <strong>OptiPOS:</strong> An offline-first POS system using Tauri (Rust) and SQLite so local retail
                  businesses can keep running even when the internet cuts out.
                </li>
              </ul>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                As I approach my graduation in 2026, I&apos;m focused on creating resilient, high-performance
                applications that solve real-world problems.
              </p>
            </div>
          </section>

          Mission Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Mission
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Resibilis was created with a simple yet powerful mission: to provide Filipino
                freelancers, students, sari-sari store owners, and small business entrepreneurs
                with a <strong>free, fast, and professional</strong> way to generate receipts.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                Many small businesses in the Philippines operate on tight budgets. Expensive accounting
                software or complicated invoicing tools are often out of reach. That&apos;s why I built
                Resibilis—a lightning-fast receipt generator that anyone can use, completely free of charge.
              </p>
            </div>
          </section>

          {/* Why Resibilis Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Resibilis?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Generate professional receipts in seconds, not minutes. Our streamlined 
                  interface lets you create and download receipts instantly.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🆓</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  100% Free
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No hidden fees, no credit card required. Create unlimited receipts 
                  without paying a single peso.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Secure & Private
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data stays on your device. We don&apos;t store receipt information 
                  unless you choose to save your history.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🇵🇭</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Made for Filipinos
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Supports Philippine Peso (₱), English and Tagalog languages, and 
                  designed with Filipino business practices in mind.
                </p>
              </div>
            </div>
          </section>

          {/* Who Uses Resibilis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Who Uses Resibilis?
            </h2>
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">✓</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Freelancers</strong>
                    <p className="text-gray-600 dark:text-gray-400">
                      Graphic designers, writers, virtual assistants, and other freelancers 
                      who need to provide receipts to clients.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">✓</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Students</strong>
                    <p className="text-gray-600 dark:text-gray-400">
                      Students selling school supplies, food, or offering tutoring services 
                      who need simple receipt documentation.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">✓</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Sari-sari Store Owners</strong>
                    <p className="text-gray-600 dark:text-gray-400">
                      Small neighborhood store owners who want to provide professional 
                      receipts for bulk purchases.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">✓</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Online Sellers</strong>
                    <p className="text-gray-600 dark:text-gray-400">
                      Shopee, Lazada, and Facebook Marketplace sellers who need to 
                      include receipts with their shipments.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">✓</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Service Providers</strong>
                    <p className="text-gray-600 dark:text-gray-400">
                      Electricians, plumbers, cleaners, and other service providers who 
                      need quick receipt generation.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Features Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Key Features
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Multiple currency support (PHP, USD, EUR)',
                'English & Tagalog languages',
                'Custom business name',
                'Add unlimited items',
                'Automatic total calculation',
                'Download as PNG or PDF',
                'Receipt history (with account)',
                'Product catalog management',
                'Dark mode support',
                'Mobile-friendly design',
                'No watermarks',
                'Instant generation',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700"
                >
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Create Your First Receipt?
            </h2>
            <p className="text-primary-100 mb-6 max-w-xl mx-auto">
              Join thousands of Filipino entrepreneurs who trust Resibilis for their 
              receipt generation needs. It&apos;s free, fast, and easy to use.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Creating Receipts
              <span>→</span>
            </Link>
          </section>

          {/* Contact Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                Want to get in touch? Visit my website:
              </p>
              <a
                href="https://mitakashime.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-3 text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
              >
                mitakashime.vercel.app
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
