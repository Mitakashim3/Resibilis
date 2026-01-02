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
    'Free, secure receipt generator for Filipino freelancers, students, and small sellers. Create professional receipts instantly.',
  keywords: [
    'receipt generator',
    'resibo',
    'Filipino',
    'invoice',
    'freelancer',
    'small business',
    'free',
    'receipt maker',
    'online receipt',
    'Philippines',
    'professional receipts',
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
    title: 'Resibilis - Lightning-Fast Receipt Generator',
    description:
      'Free, secure receipt generator for Filipino freelancers, students, and small sellers.',
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
    title: 'Resibilis - Lightning-Fast Receipt Generator',
    description:
      'Free, secure receipt generator for Filipino freelancers, students, and small sellers.',
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
        url: 'https://resibilis.vercel.app',
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://resibilis.vercel.app/#webapp',
        name: 'Resibilis',
        url: 'https://resibilis.vercel.app',
        description:
          'Free, secure receipt generator for Filipino freelancers, students, and small sellers',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
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
