import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useThrottle } from "./use-throttle";

describe("use-throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("exports useThrottle", () => {
    expect(useThrottle).toBeDefined();
  });

  it("returns the initial value immediately (elapsed >= interval on first run)", () => {
    vi.setSystemTime(0);
    const { result } = renderHook(() => useThrottle("first", 300));
    expect(result.current).toBe("first");
  });

  it("updates immediately when enough time has elapsed since last run", () => {
    vi.setSystemTime(0);
    const { result, rerender } = renderHook(({ v }) => useThrottle(v, 300), {
      initialProps: { v: "a" },
    });
    expect(result.current).toBe("a");

    // Advance beyond the throttle window
    vi.setSystemTime(400);
    act(() => {
      rerender({ v: "b" });
    });
    expect(result.current).toBe("b");
  });

  it("throttles rapid changes: stays on old value until the timer fires", () => {
    vi.setSystemTime(0);
    const { result, rerender } = renderHook(({ v }) => useThrottle(v, 300), {
      initialProps: { v: "a" },
    });
    expect(result.current).toBe("a");

    // Rapid change within the throttle window schedules a timer
    vi.setSystemTime(50);
    act(() => {
      rerender({ v: "b" });
    });
    expect(result.current).toBe("a"); // still throttled

    // Advance to just before the timer fires
    act(() => {
      vi.advanceTimersByTime(249);
    });
    expect(result.current).toBe("a");

    // Timer fires (interval - elapsed = 300 - 50 = 250ms later)
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("b");
  });

  it("replaces an existing pending timer when value changes again before firing", () => {
    vi.setSystemTime(0);
    const { result, rerender } = renderHook(({ v }) => useThrottle(v, 300), {
      initialProps: { v: "a" },
    });
    vi.setSystemTime(50);
    act(() => {
      rerender({ v: "b" });
    });
    vi.setSystemTime(100);
    act(() => {
      rerender({ v: "c" });
    });
    // Still throttled
    expect(result.current).toBe("a");
    // Advance the latest timer (300 - 100 = 200ms)
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("c");
  });

  it("uses default interval of 300 when omitted", () => {
    vi.setSystemTime(0);
    const { result, rerender } = renderHook(({ v }) => useThrottle(v), {
      initialProps: { v: "x" },
    });
    expect(result.current).toBe("x");
    vi.setSystemTime(50);
    act(() => {
      rerender({ v: "y" });
    });
    expect(result.current).toBe("x");
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("y");
  });

  it("clears the pending timer on unmount", () => {
    vi.setSystemTime(0);
    const { rerender, unmount } = renderHook(({ v }) => useThrottle(v, 300), {
      initialProps: { v: "a" },
    });
    vi.setSystemTime(50);
    act(() => {
      rerender({ v: "b" });
    });
    // Should not throw when unmounting with a pending timer
    expect(() => unmount()).not.toThrow();
  });
});
