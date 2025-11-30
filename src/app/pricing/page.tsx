import { Metadata } from 'next';
import { PricingContent } from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing - Resibilis',
  description: 'Affordable premium features for your receipt generation needs. Templates starting at ₱50.',
};

export default function PricingPage() {
  return <PricingContent />;
}
