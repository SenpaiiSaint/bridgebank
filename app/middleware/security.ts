import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RATE_LIMIT_CONFIG, SECURITY_HEADERS } from '../config/security';

// Simple in-memory rate limiting (for demo purposes)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Middleware to add security headers and rate limiting
 * 
 * This middleware:
 * 1. Adds security headers to all responses
 * 2. Implements basic rate limiting for sensitive endpoints
 * 3. Logs security-related events
 */
export function securityMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers to all responses
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Rate limiting for sensitive endpoints
  if (isSensitiveEndpoint(request.nextUrl.pathname)) {
    const ip = request.ip || 'unknown';
    const now = Date.now();
    
    // Get or initialize rate limit data for this IP
    const rateLimitData = requestCounts.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_CONFIG.timeWindow };
    
    // Reset counter if time window has passed
    if (now > rateLimitData.resetTime) {
      rateLimitData.count = 0;
      rateLimitData.resetTime = now + RATE_LIMIT_CONFIG.timeWindow;
    }
    
    // Check if rate limit exceeded
    if (rateLimitData.count >= RATE_LIMIT_CONFIG.maxRequests) {
      return new NextResponse('Too many requests', { status: 429 });
    }
    
    // Increment request count
    rateLimitData.count++;
    requestCounts.set(ip, rateLimitData);
  }

  return response;
}

/**
 * Check if the endpoint is sensitive and needs rate limiting
 */
function isSensitiveEndpoint(pathname: string): boolean {
  const sensitivePaths = [
    '/api/auth',
    '/api/transactions',
    '/api/balance',
  ];
  return sensitivePaths.some(path => pathname.startsWith(path));
} 