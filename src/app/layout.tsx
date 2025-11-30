import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Resibilis - Lightning-Fast Receipt Generator',
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
  ],
  authors: [{ name: 'Resibilis Team' }],
  creator: 'Resibilis',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://resibilis.vercel.app',
    title: 'Resibilis - Lightning-Fast Receipt Generator',
    description:
      'Free, secure receipt generator for Filipino freelancers, students, and small sellers.',
    siteName: 'Resibilis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resibilis - Lightning-Fast Receipt Generator',
    description:
      'Free, secure receipt generator for Filipino freelancers, students, and small sellers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

// Set to true when AdSense is approved
const ADS_ENABLED = true;
const ADSENSE_PUBLISHER_ID = 'ca-pub-8782757148864843'; // Replace with your ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense - Enable when approved */}
        {ADS_ENABLED && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
