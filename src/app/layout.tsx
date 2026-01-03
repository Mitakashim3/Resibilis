import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';
import { LiquidBackground } from '@/components/ui/LiquidBackground';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://resibilis.vercel.app'),
  title: {
    default: 'Resibilis - Lightning-Fast Receipt Generator',
    template: '%s | Resibilis',
  },
  description:
    'Free, secure receipt generator for Filipino freelancers, students, and small sellers. Create professional receipts instantly. No sign-up required.',
  keywords: [
    // Head Terms (High Priority)
    'receipt generator',
    'invoice maker',
    'resibo',
    'free receipt',
    'receipt maker',
    
    // Body Keywords (Medium Priority)
    'receipt generator philippines',
    'free receipt generator',
    'online receipt maker',
    'invoice generator free',
    'digital receipt maker',
    'professional receipt generator',
    'business receipt maker',
    'receipt template generator',
    'resibo generator',
    'filipino receipt maker',
    
    // Long-Tail Keywords (Quick Wins)
    'free receipt generator for freelancers',
    'receipt maker for filipino freelancers',
    'receipt generator for small business philippines',
    'online receipt generator no sign up',
    'how to create receipt online',
    'instant receipt maker',
    'receipt generator with logo',
    'customizable receipt template',
    'free invoice generator philippines',
    
    // Filipino/Tagalog Keywords
    'resibo maker',
    'gumawa ng resibo',
    'resibo para sa negosyo',
    'online resibo',
    
    // Audience-Specific
    'freelancer',
    'small business',
    'filipino',
    'philippines',
    'students',
    
    // Feature Modifiers
    'free',
    'instant',
    'professional',
    'online',
    'no sign up',
  ],
  authors: [{ name: 'Clark Jim Gabiota', url: 'https://mitakashime.vercel.app' }],
  creator: 'Clark Jim Gabiota',
  publisher: 'Resibilis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://resibilis.vercel.app',
    title: 'Resibilis - Free Receipt Generator for Filipino Freelancers & Small Business',
    description:
      'Create professional receipts instantly. Free receipt generator for Filipino freelancers, students, and small business. No sign-up required. Download as PNG or PDF.',
    siteName: 'Resibilis',
    images: [
      {
        url: '/og-image.png', // You'll need to create this
        width: 1200,
        height: 630,
        alt: 'Resibilis - Receipt Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resibilis - Free Receipt Generator Philippines',
    description:
      'Create professional receipts instantly. Free for Filipino freelancers, students, and small business. No sign-up required.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://resibilis.vercel.app',
  },
  category: 'Technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f2f2' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
};

// Set to true when AdSense is approved
const ADS_ENABLED = process.env.NODE_ENV === 'production';
const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? 'ca-pub-8782757148864843';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Structured Data for better SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://resibilis.vercel.app/#website',
        url: 'https://resibilis.vercel.app',
        name: 'Resibilis',
        inLanguage: 'en-PH',
      },
      {
        '@type': 'Organization',
        '@id': 'https://resibilis.vercel.app/#organization',
        name: 'Resibilis',
        alternateName: 'Resibilis Receipt Generator',
        url: 'https://resibilis.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://resibilis.vercel.app/logo.svg',
          width: 512,
          height: 512,
        },
        sameAs: [],
        description: 'Free receipt generator for Filipino freelancers, students, and small business owners',
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://resibilis.vercel.app/#webapp',
        name: 'Resibilis',
        alternateName: 'Resibilis Receipt Generator',
        url: 'https://resibilis.vercel.app',
        description:
          'Free, secure receipt generator for Filipino freelancers, students, and small sellers',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        brand: {
          '@id': 'https://resibilis.vercel.app/#organization',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'PHP',
        },
        author: {
          '@type': 'Person',
          name: 'Clark Jim Gabiota',
          url: 'https://mitakashime.vercel.app',
        },
        inLanguage: 'en-PH',
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense - Enable when approved */}
        {ADS_ENABLED && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <LiquidBackground />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
