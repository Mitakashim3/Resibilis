'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui';
import { AuthButton, UserMenu } from '@/components/auth';
import { Package, Crown } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Resibilis Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Resibilis
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
                  Lightning-fast receipts
                </p>
              </div>
            </Link>

            {/* Nav Links for authenticated users */}
            {user && (
              <nav className="hidden sm:flex items-center gap-1 ml-4">
                <Link
                  href="/products"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  Products
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  Upgrade
                </Link>
              </nav>
            )}

            {/* Pricing link for non-authenticated users */}
            {!user && (
              <nav className="hidden sm:flex items-center gap-1 ml-4">
                <Link
                  href="/pricing"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  Pricing
                </Link>
              </nav>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <UserMenu user={user} />
            ) : (
              <AuthButton mode="compact" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
