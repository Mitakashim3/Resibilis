import { Metadata } from 'next';
import { PricingContent } from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing - Resibilis',
  description: 'Affordable premium features for your receipt generation needs. Templates starting at ₱50.',
  alternates: {
    canonical: 'https://resibilis.vercel.app/pricing',
  },
  openGraph: {
    title: 'Pricing - Resibilis Receipt Generator',
    description: 'Affordable premium features for your receipt generation needs. Templates starting at ₱50.',
    url: 'https://resibilis.vercel.app/pricing',
    type: 'website',
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
