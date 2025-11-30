import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security Middleware for Resibilis
 * Handles: CSP Headers, Auth Session Refresh, Security Headers
 */
export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: req,
  });

  // Create Supabase client for session management
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value)
          );
          res = NextResponse.next({
            request: req,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired - important for Server Components
  await supabase.auth.getUser();

  // ===========================================
  // SECURITY HEADERS
  // ===========================================
  
  // Content Security Policy - Strict policy to prevent XSS
  // Using nonce would be better but requires more setup
  // Google AdSense domains are included but only load when ADS_ENABLED is true in layout.tsx
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com https://partner.googleadservices.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.supabase.co https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://*.google.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://accounts.google.com https://pagead2.googlesyndication.com https://*.google.com",
    "frame-src 'self' https://accounts.google.com https://*.supabase.co https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ');
  
  res.headers.set('Content-Security-Policy', cspDirectives);
  
  // Prevent clickjacking
  res.headers.set('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS filter (legacy browsers)
  res.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy - disable unnecessary features
  res.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  // HSTS - enforce HTTPS (enabled in production)
  if (process.env.NODE_ENV === 'production') {
    res.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Add cache control for security
  if (req.nextUrl.pathname.startsWith('/api/')) {
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
  }

  return res;
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
