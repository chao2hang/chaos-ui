import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWindowSize } from "./use-window-size";

function setWindow(innerWidth: number, innerHeight: number) {
  Object.defineProperty(window, "innerWidth", {
    value: innerWidth,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(window, "innerHeight", {
    value: innerHeight,
    configurable: true,
    writable: true,
  });
}

describe("use-window-size", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setWindow(1024, 768);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("exports useWindowSize", () => {
    expect(useWindowSize).toBeDefined();
  });

  it("returns the initial window dimensions immediately", () => {
    setWindow(800, 600);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  it("uses the default debounce of 100ms", () => {
    setWindow(800, 600);
    const { result } = renderHook(() => useWindowSize());
    setWindow(1000, 800);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    // Not updated yet (debounce pending).
    expect(result.current.width).toBe(800);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.width).toBe(1000);
    expect(result.current.height).toBe(800);
  });

  it("respects a custom debounce delay", () => {
    setWindow(800, 600);
    const { result } = renderHook(() => useWindowSize(250));
    setWindow(1200, 900);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current.width).toBe(800);

    // Before the custom delay elapses -> still old value.
    act(() => {
      vi.advanceTimersByTime(249);
    });
    expect(result.current.width).toBe(800);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.width).toBe(1200);
    expect(result.current.height).toBe(900);
  });

  it("debounces multiple rapid resizes to the latest dimensions", () => {
    setWindow(800, 600);
    const { result } = renderHook(() => useWindowSize(100));

    act(() => {
      setWindow(900, 700);
      window.dispatchEvent(new Event("resize"));
    });
    act(() => {
      setWindow(1100, 800);
      window.dispatchEvent(new Event("resize"));
    });
    act(() => {
      setWindow(1400, 900);
      window.dispatchEvent(new Event("resize"));
    });

    // Still debounced — only the final dimensions should apply.
    expect(result.current.width).toBe(800);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.width).toBe(1400);
    expect(result.current.height).toBe(900);
  });

  it("removes the resize listener and clears the timer on unmount", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useWindowSize(100));

    expect(addSpy.mock.calls.filter(([t]) => t === "resize").length).toBeGreaterThanOrEqual(1);

    unmount();
    expect(removeSpy.mock.calls.filter(([t]) => t === "resize").length).toBeGreaterThanOrEqual(1);

    // Firing a resize after unmount should not throw / schedule anything.
    expect(() => {
      setWindow(2000, 1000);
      window.dispatchEvent(new Event("resize"));
      vi.advanceTimersByTime(100);
    }).not.toThrow();
  });
});
