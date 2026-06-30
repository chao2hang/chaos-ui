import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useOrientation } from "./use-orientation";

function setViewport(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", { value: width, configurable: true, writable: true });
  Object.defineProperty(window, "innerHeight", { value: height, configurable: true, writable: true });
}

describe("use-orientation", () => {
  beforeEach(() => {
    setViewport(1024, 768);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("exports useOrientation", () => {
    expect(useOrientation).toBeDefined();
  });

  it("returns 'landscape' when innerWidth > innerHeight at init", () => {
    setViewport(1280, 720);
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe("landscape");
  });

  it("returns 'portrait' when innerWidth < innerHeight at init", () => {
    setViewport(375, 812);
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe("portrait");
  });

  it("returns 'portrait' when width equals height (not strictly greater)", () => {
    setViewport(500, 500);
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe("portrait");
  });

  it("updates to 'portrait' on resize when height becomes larger", () => {
    setViewport(1280, 720);
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe("landscape");

    act(() => {
      setViewport(400, 900);
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toBe("portrait");
  });

  it("updates to 'landscape' on resize when width becomes larger", () => {
    setViewport(375, 812);
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe("portrait");

    act(() => {
      setViewport(1600, 900);
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toBe("landscape");
  });

  it("removes its resize listener on unmount", () => {
    setViewport(1280, 720);
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useOrientation());

    const resizeAdds = addSpy.mock.calls.filter(([t]) => t === "resize");
    expect(resizeAdds.length).toBeGreaterThanOrEqual(1);

    unmount();
    const resizeRemoves = removeSpy.mock.calls.filter(([t]) => t === "resize");
    expect(resizeRemoves.length).toBeGreaterThanOrEqual(1);
  });
});
