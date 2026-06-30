import { describe, it, expect, beforeEach, vi } from "vitest";
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

  it("stringify array skips null/undefined entries", () => {
    expect(url.stringify({ a: [1, null, 2, undefined, 3] })).toBe("a=1&a=2&a=3");
  });

  it("stringify booleans and numbers", () => {
    expect(url.stringify({ a: true, b: false, c: 0 })).toBe("a=true&b=false&c=0");
  });

  it("stringify empty object returns empty string", () => {
    expect(url.stringify({})).toBe("");
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
    expect(parts.hash).toBe("#hash");
    expect(parts.search).toBe("?x=1");
  });

  it("parseUrl with port", () => {
    const parts = url.parseUrl("http://localhost:8080/p?a=1");
    expect(parts.port).toBe("8080");
    expect(parts.hostname).toBe("localhost");
    expect(parts.params.a).toBe("1");
  });

  it("parseUrl invalid returns empty", () => {
    expect(url.parseUrl("not-a-url").protocol).toBe("");
    expect(url.parseUrl("not-a-url").hostname).toBe("");
    expect(url.parseUrl("not-a-url").params).toEqual({});
  });

  it("buildUrl", () => {
    expect(url.buildUrl("https://x.com", { a: 1 })).toBe("https://x.com?a=1");
    expect(url.buildUrl("https://x.com?z=0", { a: 1 })).toBe(
      "https://x.com?z=0&a=1",
    );
    expect(url.buildUrl("https://x.com")).toBe("https://x.com");
  });

  it("buildUrl with empty params returns base unchanged", () => {
    expect(url.buildUrl("https://x.com", {})).toBe("https://x.com");
  });

  // ---- browser-only branches ----
  describe("browser environment", () => {
    beforeEach(() => {
      // jsdom origin is http://localhost — use same-origin URLs so
      // history.replaceState does not throw a SecurityError.
      window.history.replaceState({}, "", "http://localhost:3000/start");
    });

    it("parse falls back to window.location.search when no arg", () => {
      window.history.replaceState({}, "", "http://localhost:3000/page?foo=bar");
      expect(url.parse().foo).toBe("bar");
    });

    it("setQuery replaces params in the URL by default", () => {
      url.setQuery({ page: 2, q: "hi" });
      expect(window.location.search).toContain("page=2");
      expect(window.location.search).toContain("q=hi");
    });

    it("setQuery with push:true calls history.pushState", () => {
      const pushSpy = vi.spyOn(window.history, "pushState");
      url.setQuery({ sort: "asc" }, { push: true });
      expect(pushSpy).toHaveBeenCalledTimes(1);
      expect(window.location.search).toContain("sort=asc");
    });

    it("setQuery deletes null/undefined params", () => {
      window.history.replaceState({}, "", "http://localhost:3000/x?drop=1&keep=1");
      url.setQuery({ drop: null });
      expect(window.location.search).not.toContain("drop=");
      expect(window.location.search).toContain("keep=1");
    });

    it("setQuery appends array values", () => {
      url.setQuery({ tag: ["a", "b"] });
      expect(window.location.search).toContain("tag=a");
      expect(window.location.search).toContain("tag=b");
    });

    it("setQuery appends array skipping null/undefined", () => {
      url.setQuery({ tag: ["a", null, "b", undefined] });
      expect(window.location.search).toContain("tag=a");
      expect(window.location.search).toContain("tag=b");
      // null/undefined entries should not produce empty tags
      expect(window.location.search).not.toContain("tag=&");
    });

    it("removeQuery removes a single key (string)", () => {
      window.history.replaceState({}, "", "http://localhost:3000/x?a=1&b=2");
      url.removeQuery("a");
      expect(window.location.search).not.toContain("a=");
      expect(window.location.search).toContain("b=2");
    });

    it("removeQuery removes multiple keys (array)", () => {
      window.history.replaceState({}, "", "http://localhost:3000/x?a=1&b=2&c=3");
      url.removeQuery(["a", "b"]);
      expect(window.location.search).not.toContain("a=");
      expect(window.location.search).not.toContain("b=");
      expect(window.location.search).toContain("c=3");
    });

    it("isExternal returns false for same-host link", () => {
      expect(url.isExternal("http://localhost:3000/inner")).toBe(false);
      expect(url.isExternal("/relative/path")).toBe(false);
    });

    it("isExternal returns true for different host", () => {
      expect(url.isExternal("https://other.com/x")).toBe(true);
    });

    it("isExternal returns false for invalid link", () => {
      expect(url.isExternal("not-a-url")).toBe(false);
    });
  });
});
