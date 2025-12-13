import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-200/50 dark:border-primary-800/50 py-8 mt-auto bg-white/5 dark:bg-black/5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-foreground mb-3">Resibilis</h3>
            <p className="text-sm text-primary-600 dark:text-primary-400">
              Free, lightning-fast receipt generator for Filipino entrepreneurs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
                  Create Receipt
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/how-to-use" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
                  How to Use
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-600 dark:text-primary-400">Free Receipt Generation</li>
              <li className="text-gray-500 dark:text-gray-400">Multiple Currencies</li>
              <li className="text-gray-500 dark:text-gray-400">English & Tagalog</li>
              <li className="text-gray-500 dark:text-gray-400">PNG & PDF Export</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p>
              © {currentYear} Resibilis. Created by{' '}
              <a
                href="https://mitakashime.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
              >
                Clark Jim Gabiota
              </a>
              . Made with Pagpalanga for Filipino entrepreneurs.
            </p>
            <p className="text-xs">
              Contact: <a
                href="https://mitakashime.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
              >
                mitakashime.vercel.app
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
