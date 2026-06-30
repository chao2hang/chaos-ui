import { describe, it, expect } from "vitest";
import { url } from "@/lib/url";

describe("lib/url", () => {
  it("parse query string", () => {
    expect(url.parse("?a=1&b=2")).toEqual({ a: "1", b: "2" });
    expect(url.parse("a=1&b=2")).toEqual({ a: "1", b: "2" });
    expect(url.parse("")).toEqual({});
  });

  it("stringify params", () => {
    expect(url.stringify({ a: 1, b: "two" })).toBe("a=1&b=two");
  });

  it("stringify skips null/undefined", () => {
    expect(url.stringify({ a: 1, b: null, c: undefined })).toBe("a=1");
  });

  it("stringify array", () => {
    expect(url.stringify({ a: [1, 2] })).toBe("a=1&a=2");
  });

  it("getQuery", () => {
    expect(url.getQuery("a", "?a=1&b=2")).toBe("1");
    expect(url.getQuery("x", "?a=1")).toBeNull();
  });

  it("parseUrl", () => {
    const parts = url.parseUrl("https://example.com/path?x=1#hash");
    expect(parts.protocol).toBe("https:");
    expect(parts.hostname).toBe("example.com");
    expect(parts.pathname).toBe("/path");
    expect(parts.params.x).toBe("1");
  });

  it("parseUrl invalid returns empty", () => {
    expect(url.parseUrl("not-a-url").protocol).toBe("");
  });

  it("buildUrl", () => {
    expect(url.buildUrl("https://x.com", { a: 1 })).toBe("https://x.com?a=1");
    expect(url.buildUrl("https://x.com?z=0", { a: 1 })).toBe("https://x.com?z=0&a=1");
    expect(url.buildUrl("https://x.com")).toBe("https://x.com");
  });
});
