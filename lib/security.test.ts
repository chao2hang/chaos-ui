import { describe, it, expect } from "vitest";
import { cspHeaders } from "./security";

describe("security", () => {
  it("exports cspHeaders", () => {
    expect(cspHeaders).toBeDefined();
    expect(typeof cspHeaders).toBe("function");
  });

  it("returns an array of header objects", () => {
    const headers = cspHeaders();
    expect(Array.isArray(headers)).toBe(true);
    expect(headers.length).toBeGreaterThan(0);
    for (const h of headers) {
      expect(typeof h.key).toBe("string");
      expect(typeof h.value).toBe("string");
    }
  });

  it("includes Content-Security-Policy header", () => {
    const headers = cspHeaders();
    const csp = headers.find((h) => h.key === "Content-Security-Policy");
    expect(csp).toBeDefined();
    expect(csp?.value).toContain("default-src 'self'");
    expect(csp?.value).toContain("script-src 'self' 'unsafe-eval' 'unsafe-inline'");
    expect(csp?.value).toContain("object-src 'none'");
    expect(csp?.value).toContain("frame-ancestors 'none'");
    expect(csp?.value).toContain("upgrade-insecure-requests");
  });

  it("includes the static security headers", () => {
    const headers = cspHeaders();
    const byKey = Object.fromEntries(headers.map((h) => [h.key, h.value]));
    expect(byKey["X-Content-Type-Options"]).toBe("nosniff");
    expect(byKey["X-Frame-Options"]).toBe("DENY");
    expect(byKey["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(byKey["Permissions-Policy"]).toBe(
      "camera=(), microphone=(), geolocation=()",
    );
  });

  it("returns a fresh array each call (no shared mutation)", () => {
    const a = cspHeaders();
    const b = cspHeaders();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });

  it("joins CSP directives with semicolons", () => {
    const headers = cspHeaders();
    const csp = headers.find((h) => h.key === "Content-Security-Policy")?.value ?? "";
    // Every directive boundary should be "; " joined, no trailing separator
    expect(csp.endsWith("; ")).toBe(false);
    expect(csp.includes("; ")).toBe(true);
  });
});
