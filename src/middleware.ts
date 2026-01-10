import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter using Map (Note: This is reset on serverless function restart)
// For production, use Redis (e.g., Upstash) for persistence across lambdas.
const ipRequestMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 100; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100; // 100 requests per minute

export function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    const record = ipRequestMap.get(ip) || { count: 0, lastReset: now };

    // Reset window if passed
    if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
        record.count = 0;
        record.lastReset = now;
    }

    record.count += 1;
    ipRequestMap.set(ip, record);

    // If over limit, return 429
    if (record.count > MAX_REQUESTS_PER_WINDOW) {
        return new NextResponse(
            JSON.stringify({ success: false, message: 'Too many requests' }),
            { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const response = NextResponse.next();

    // Add simple security headers in middleware as extra layer (though next.config.mjs handles most)
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW.toString());
    response.headers.set('X-RateLimit-Remaining', (MAX_REQUESTS_PER_WINDOW - record.count).toString());

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - robots.txt
         * - sitemap.xml
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
