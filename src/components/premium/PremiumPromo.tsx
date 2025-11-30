'use client';

import { useState } from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { AuthButton } from '@/components/auth';
import { 
  Sparkles, 
  Save, 
  Package, 
  Palette, 
  Layout, 
  Shield, 
  ArrowRight,
  X,
  Crown,
  Check,
  Clock
} from 'lucide-react';
import Link from 'next/link';

// Feature flag for premium purchases
const PREMIUM_ENABLED = false; // Set to true when payment is ready

interface PremiumPromoProps {
  variant?: 'banner' | 'card' | 'minimal';
}

const features = [
  {
    icon: Save,
    title: 'Save Receipts',
    titleTl: 'I-save ang Resibo',
    description: 'Keep a history of all your receipts',
    descriptionTl: 'Itago ang lahat ng iyong mga resibo',
    free: false,
  },
  {
    icon: Package,
    title: 'Product Catalog',
    titleTl: 'Listahan ng Produkto',
    description: 'Save your products for quick access',
    descriptionTl: 'I-save ang mga produkto para mabilis gamitin',
    free: false,
  },
  {
    icon: Layout,
    title: 'Premium Templates',
    titleTl: 'Premium na Disenyo',
    description: 'Beautiful receipt designs for your brand',
    descriptionTl: 'Magagandang disenyo para sa iyong negosyo',
    premium: true,
  },
  {
    icon: Palette,
    title: 'Custom Branding',
    titleTl: 'Sariling Branding',
    description: 'Add logo, colors, and customize fonts',
    descriptionTl: 'Magdagdag ng logo, kulay, at fonts',
    premium: true,
  },
];

const premiumTemplates = [
  { id: 'modern', name: 'Modern Clean', price: 50 },
  { id: 'classic', name: 'Classic Professional', price: 50 },
  { id: 'minimal', name: 'Minimal', price: 50 },
  { id: 'colorful', name: 'Colorful', price: 75 },
  { id: 'luxury', name: 'Luxury Gold', price: 100 },
];

export function PremiumPromo({ variant = 'card' }: PremiumPromoProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed && variant === 'banner') {
    return null;
  }

  if (variant === 'minimal') {
    return (
      <div className="text-center py-4 px-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <Sparkles className="w-4 h-4 inline mr-1 text-yellow-500" />
          Sign in to <strong>save receipts</strong>, <strong>add products</strong>, and unlock <strong>premium templates</strong>!
        </p>
        <AuthButton />
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-3 px-4 rounded-xl shadow-lg mb-6">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold">Unlock Premium Features!</p>
              <p className="text-sm text-green-100">
                Sign in to save receipts, manage products, and get beautiful templates
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AuthButton />
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                View Plans
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default: card variant
  return (
    <Card variant="bordered" className="overflow-hidden">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Mag-sign in para sa Mas Maraming Features!</h3>
            <p className="text-green-100 text-sm">Sign in to unlock more features</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className={`p-2 rounded-lg ${
                  feature.premium 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {feature.title}
                    </h4>
                    {feature.premium && (
                      <span className="px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded font-medium">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Templates Preview */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-500" />
              Premium Templates
            </h4>
            <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Coming Soon
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {premiumTemplates.slice(0, 4).map((template) => (
              <div
                key={template.id}
                className="flex-shrink-0 w-20 h-28 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center opacity-60"
              >
                <span className="text-xs text-gray-400 text-center px-1">{template.name}</span>
              </div>
            ))}
            <Link
              href="/pricing"
              className="flex-shrink-0 w-20 h-28 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-300 dark:border-green-700 flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <span className="text-xs text-green-600 dark:text-green-400 text-center font-medium">
                View All
                <ArrowRight className="w-3 h-3 mx-auto mt-1" />
              </span>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <AuthButton />
          <Link href="/pricing" className="flex-1">
            <Button variant="outline" className="w-full">
              <Crown className="w-4 h-4 mr-2 text-yellow-500" />
              View Pricing
            </Button>
          </Link>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Shield className="w-4 h-4" />
          <span>Secure login with Google • No password needed</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function PremiumFeatureGate({ 
  children, 
  feature 
}: { 
  children: React.ReactNode; 
  feature: string;
}) {
  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none blur-[1px]">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-lg">
        <div className="text-center p-4">
          <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
            Premium Feature
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Sign in to unlock {feature}
          </p>
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
