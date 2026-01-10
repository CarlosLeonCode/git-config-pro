import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limiter (Note: resets on serverless function cold starts)
const ipRequestMap = new Map<string, { count: number; lastReset: number }>();

// Standard production-friendly limit: 100 requests per minute
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute (60,000 ms)
const MAX_REQUESTS_PER_WINDOW = 100;

export function proxy(request: NextRequest) {
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

    // If over limit, return 429 (Too Many Requests)
    if (record.count > MAX_REQUESTS_PER_WINDOW) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: 'Rate limit exceeded. Please try again in a minute.',
                status: 429
            }),
            {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Retry-After': '60'
                }
            }
        );
    }

    const response = NextResponse.next();

    // Informative headers for the client
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW.toString());
    response.headers.set('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS_PER_WINDOW - record.count).toString());

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, placeholder.svg, robots.txt, sitemap.xml
         */
        '/((?!_next/static|_next/image|favicon.ico|placeholder.svg|robots.txt|sitemap.xml).*)',
    ],
};
