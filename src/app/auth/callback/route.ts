import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/database';
import { checkRateLimit } from '@/lib/security';
import { checkRateLimitShared, getClientIpFromHeaders } from '@/lib/ratelimit';

/**
 * Auth Callback Route
 * Handles the OAuth callback from Google
 * Exchanges the auth code for a session
 */
export async function GET(request: NextRequest) {
  // Basic abuse protection: limit callback hits per IP.
  const ip = getClientIpFromHeaders(request.headers);
  const shared = await checkRateLimitShared(`auth-callback:${ip}`, {
    limit: 20,
    windowSeconds: 60,
  });
  const rateLimit = shared ?? checkRateLimit(`auth-callback:${ip}`, 20, 60000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(rateLimit.resetIn / 1000),
      },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil(rateLimit.resetIn / 1000).toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    );
  }

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore errors in route handlers
            }
          },
        },
      }
    );

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to home page after successful auth
  return NextResponse.redirect(requestUrl.origin);
}
