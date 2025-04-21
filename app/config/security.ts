/**
 * Security Configuration
 * 
 * This file contains essential security settings for the FinLink banking platform.
 * We've kept it simple but secure, focusing on protecting user data and preventing
 * common security issues.
 */

// Session configuration
export const SESSION_CONFIG = {
  // Session expires after 30 minutes of inactivity
  maxAge: 30 * 60, // 30 minutes in seconds
  // Only send cookies over HTTPS in production
  secure: process.env.NODE_ENV === 'production',
  // Prevent JavaScript from accessing cookies
  httpOnly: true,
  // Only send cookies for same-site requests
  sameSite: 'strict' as const,
};

// Password requirements
export const PASSWORD_REQUIREMENTS = {
  // Minimum 8 characters
  minLength: 8,
  // Must contain at least one number
  requireNumber: true,
  // Must contain at least one uppercase letter
  requireUppercase: true,
  // Must contain at least one lowercase letter
  requireLowercase: true,
  // Must contain at least one special character
  requireSpecialChar: true,
};

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
  // Maximum 5 requests per minute for sensitive endpoints
  maxRequests: 5,
  // Time window in milliseconds (1 minute)
  timeWindow: 60 * 1000,
};

// API security headers
export const SECURITY_HEADERS = {
  // Prevent browsers from trying to guess the content type
  'X-Content-Type-Options': 'nosniff',
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block',
  // Control how much information the browser sends with requests
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Restrict which resources can be loaded
  'Content-Security-Policy': "default-src 'self'",
};

// Error messages (kept vague to avoid information leakage)
export const ERROR_MESSAGES = {
  AUTH_FAILED: 'Invalid credentials. Please try again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  INVALID_INPUT: 'Invalid input provided.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
}; 