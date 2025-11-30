'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ui';
import { AuthButton, UserMenu } from '@/components/auth';
import { Package } from 'lucide-react';
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
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
