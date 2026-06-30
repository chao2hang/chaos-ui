/**
 * Content Security Policy (CSP) headers for Next.js apps using Chaos UI.
 *
 * Usage in next.config.ts:
 * ```ts
 * import { cspHeaders } from "@qxyfoods/chaos-ui/next";
 *
 * export default {
 *   async headers() {
 *     return [
 *       {
 *         source: "/(.*)",
 *         headers: cspHeaders(),
 *       },
 *     ];
 *   },
 * };
 * ```
 */

export function cspHeaders(): Array<{ key: string; value: string }> {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https:",
    "media-src 'self' data:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  return [
    { key: "Content-Security-Policy", value: csp },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
    },
  ];
}
