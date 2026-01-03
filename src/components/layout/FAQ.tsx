'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I create a professional receipt online?',
    answer: 'Simply fill out the form with your business name, customer details, and item information. Resibilis automatically generates a professional receipt that you can download as PNG or PDF. No design skills needed!'
  },
  {
    question: 'Is this receipt generator really free for Filipino freelancers?',
    answer: 'Yes! Resibilis is 100% free for everyone, including Filipino freelancers, students, and small business owners. You can create unlimited receipts without any subscription or hidden fees.'
  },
  {
    question: 'Do I need to sign up to use the receipt maker?',
    answer: 'No sign-up is required to generate and download receipts. However, creating a free account allows you to save your receipts to history, manage products, and access them from any device.'
  },
  {
    question: 'Can I add tax and discounts to my receipts?',
    answer: 'Yes! Resibilis includes a built-in tax & discount calculator. You can add percentage-based or flat-amount discounts, and apply tax (like 12% VAT in the Philippines). The calculations are automatic and accurate.'
  },
  {
    question: 'What languages does the receipt generator support?',
    answer: 'Resibilis supports both English and Tagalog/Filipino. You can switch between languages when creating your receipt, making it perfect for local businesses and Filipino customers.'
  },
  {
    question: 'How do I download my receipt as PNG or PDF?',
    answer: 'After filling out your receipt details, click the "Download Resibo (PNG)" button for an image file, or use the PDF option in the preview panel. Your receipt downloads instantly to your device.'
  },
  {
    question: 'Can I use this for my small business or sari-sari store?',
    answer: 'Absolutely! Resibilis is perfect for small businesses, sari-sari stores, online sellers, and anyone who needs to issue receipts. You can customize receipts with your business name and add multiple items.'
  },
  {
    question: 'Is my data secure when using this receipt generator?',
    answer: 'Yes. We use industry-standard encryption and never share your data. Guest users\' data isn\'t stored on our servers. Registered users\' data is protected with bank-level security through Supabase.'
  },
  {
    question: 'Paano gumawa ng resibo online? (How to make receipt online?)',
    answer: 'Punuin lang ang form na may business name, customer details, at mga item. I-click ang "Download Resibo" at mayroon ka nang professional receipt. Libre at walang sign-up!'
  },
  {
    question: 'Can I save my products for faster receipt creation?',
    answer: 'Yes! Signed-in users can save their frequently sold products and services. This makes creating receipts much faster - just select items from your saved list instead of typing them each time.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-primary-600 dark:text-primary-400">
              Everything you need to know about using Resibilis
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-primary-500 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 text-primary-700 dark:text-primary-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* SEO-friendly structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map(faq => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                  }
                }))
              })
            }}
          />
        </div>
      </div>
    </section>
  );
}
