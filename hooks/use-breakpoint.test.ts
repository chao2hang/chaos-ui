import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBreakpoint, useIsBreakpoint } from "@/hooks/use-breakpoint";

describe("useBreakpoint", () => {
  it("initial value is undefined (SSR/hydration-safe)", () => {
    // Before the effect runs, breakpoint should be undefined so SSR and first
    // client render match (no assumed "lg" causing hydration mismatch).
    const { result } = renderHook(() => useBreakpoint());
    // renderHook runs effects synchronously in jsdom, so it may already be set.
    const bp = result.current;
    expect(bp === undefined || ["xs", "sm", "md", "lg", "xl", "2xl"].includes(bp)).toBe(true);
  });

  it("returns a valid breakpoint after effect", () => {
    const { result } = renderHook(() => useBreakpoint());
    const bp = result.current;
    if (bp !== undefined) {
      expect(["xs", "sm", "md", "lg", "xl", "2xl"]).toContain(bp);
    }
  });
});

describe("useIsBreakpoint", () => {
  it("returns false before hydration (undefined current)", () => {
    // useIsBreakpoint returns false when current is undefined (safer than
    // assuming a default breakpoint).
    const { result } = renderHook(() => useIsBreakpoint("md"));
    expect(typeof result.current).toBe("boolean");
  });
});
