import { NextResponse } from 'next/server';
import { validateEmail, checkRateLimit } from '@/lib/security';
import { checkRateLimitShared, getClientIpFromHeaders } from '@/lib/ratelimit';

/**
 * Email Validation Endpoint
 * Checks if an email is valid and not from a disposable provider
 */
export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const ip = getClientIpFromHeaders(req.headers);

    // Rate limit: 10 requests per minute per IP
    // Prefer shared limiter (Upstash) when configured; otherwise use in-memory fallback.
    const shared = await checkRateLimitShared(`email-validate:${ip}`);
    const rateLimit =
      shared ?? checkRateLimit(`email-validate:${ip}`, 10, 60000);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil(rateLimit.resetIn / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(rateLimit.resetIn / 1000).toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          }
        }
      );
    }

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { valid: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const result = validateEmail(email);

    if (!result.valid) {
      return NextResponse.json(
        { valid: false, error: result.reason },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Email validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Validation failed' },
      { status: 500 }
    );
  }
}
