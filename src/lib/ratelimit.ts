import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetIn: number; // ms
};

export type RateLimitConfig = {
  limit: number;
  windowSeconds: number;
};

const DEFAULT_CONFIG: RateLimitConfig = {
  limit: 10,
  windowSeconds: 60,
};

function getUpstashEnv() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

let upstashLimiters: Map<string, Ratelimit> | null = null;

function getUpstashLimiter(config: RateLimitConfig): Ratelimit | null {
  const env = getUpstashEnv();
  if (!env) return null;

  const key = `${config.limit}:${config.windowSeconds}`;
  if (!upstashLimiters) upstashLimiters = new Map();

  const existing = upstashLimiters.get(key);
  if (existing) return existing;

  const redis = new Redis({ url: env.url, token: env.token });
  const limiter = new Ratelimit({
    redis,
    // Sliding window is better for bot bursts than fixed windows.
    limiter: Ratelimit.slidingWindow(config.limit, `${config.windowSeconds} s`),
    analytics: true,
    prefix: 'resibilis:rl',
  });

  upstashLimiters.set(key, limiter);
  return limiter;
}

/**
 * Shared rate limiting for Vercel/serverless.
 * - Uses Upstash Redis when configured.
 * - Falls back to `null` when not configured (so callers can use in-memory limiter).
 */
export async function checkRateLimitShared(
  identifier: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): Promise<RateLimitResult | null> {
  const limiter = getUpstashLimiter(config);
  if (!limiter) return null;

  try {
    const result = await limiter.limit(identifier);
    // `reset` from Upstash is a timestamp (ms). Convert to a duration.
    const resetIn = Math.max(0, result.reset - Date.now());

    return {
      allowed: result.success,
      remaining: result.remaining,
      resetIn,
    };
  } catch {
    // If Upstash is misconfigured or temporarily unavailable, fall back.
    return null;
  }
}

export function getClientIpFromHeaders(headers: Headers): string {
  // Vercel/Proxy headers
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) return xForwardedFor.split(',')[0]?.trim() || 'unknown';

  const xRealIp = headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  return 'unknown';
}
