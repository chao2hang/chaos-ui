import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScroll, useScrollDirection } from "./use-scroll";

// Helper: set window scroll position and fire a scroll event.
function setWindowScroll(x: number, y: number) {
  Object.defineProperty(window, "scrollX", { value: x, configurable: true, writable: true });
  Object.defineProperty(window, "scrollY", { value: y, configurable: true, writable: true });
  window.dispatchEvent(new Event("scroll"));
}

describe("use-scroll", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "scrollX", { value: 0, configurable: true, writable: true });
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true, writable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("exports useScroll", () => {
    expect(useScroll).toBeDefined();
  });

  it("exports useScrollDirection", () => {
    expect(useScrollDirection).toBeDefined();
  });

  it("initial state is zeros with isScrolled=false and direction=null", () => {
    const { result } = renderHook(() => useScroll());
    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
    expect(result.current.isScrolled).toBe(false);
    expect(result.current.direction).toBeNull();
  });

  it("updates isScrolled=true and direction=down when scrolling down", () => {
    const { result } = renderHook(() => useScroll(0));
    act(() => {
      setWindowScroll(0, 100);
      vi.advanceTimersByTime(0);
    });
    expect(result.current.y).toBe(100);
    expect(result.current.isScrolled).toBe(true);
    expect(result.current.direction).toBe("down");
  });

  it("detects direction=up when scrolling back up", () => {
    const { result } = renderHook(() => useScroll(0));
    act(() => {
      setWindowScroll(0, 200);
    });
    expect(result.current.direction).toBe("down");
    act(() => {
      setWindowScroll(0, 50);
    });
    expect(result.current.y).toBe(50);
    expect(result.current.direction).toBe("up");
  });

  it("direction is null when y does not change (dy=0)", () => {
    const { result } = renderHook(() => useScroll(0));
    act(() => {
      setWindowScroll(0, 0);
    });
    expect(result.current.direction).toBeNull();
    expect(result.current.isScrolled).toBe(false);
  });

  it("throttles rapid scroll events within throttleMs window", () => {
    const { result } = renderHook(() => useScroll(100));
    act(() => {
      setWindowScroll(0, 10);
    });
    // First event within throttle window is ignored (lastTime=0 initially, but now-0 >= 100 so first fires)
    // After first fires, subsequent within 100ms are ignored.
    expect(result.current.y).toBe(10);
    act(() => {
      setWindowScroll(0, 20); // within 100ms throttle -> ignored
    });
    expect(result.current.y).toBe(10);
    act(() => {
      vi.advanceTimersByTime(100);
      setWindowScroll(0, 30); // now past throttle -> fires
    });
    expect(result.current.y).toBe(30);
  });

  it("tracks an element ref target instead of window", () => {
    const el = document.createElement("div");
    Object.defineProperty(el, "scrollLeft", { value: 5, configurable: true, writable: true });
    Object.defineProperty(el, "scrollTop", { value: 80, configurable: true, writable: true });
    const ref = { current: el };
    const { result } = renderHook(() => useScroll(0, ref));
    act(() => {
      Object.defineProperty(el, "scrollTop", { value: 80, configurable: true, writable: true });
      el.dispatchEvent(new Event("scroll"));
    });
    expect(result.current.y).toBe(80);
    expect(result.current.isScrolled).toBe(true);
  });
});

describe("useScrollDirection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "scrollX", { value: 0, configurable: true, writable: true });
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true, writable: true });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns null initially", () => {
    const { result } = renderHook(() => useScrollDirection());
    expect(result.current).toBeNull();
  });

  it("returns the direction after scrolling down", () => {
    const { result } = renderHook(() => useScrollDirection(0));
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 40, configurable: true, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toBe("down");
  });
});
