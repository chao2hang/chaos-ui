import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useVisibilityChange } from "./use-visibility-change";

function setHidden(hidden: boolean) {
  Object.defineProperty(document, "hidden", {
    value: hidden,
    configurable: true,
    writable: true,
  });
}

describe("use-visibility-change", () => {
  beforeEach(() => {
    setHidden(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("exports useVisibilityChange", () => {
    expect(useVisibilityChange).toBeDefined();
  });

  it("returns true when document is visible at init", () => {
    setHidden(false);
    const { result } = renderHook(() => useVisibilityChange());
    expect(result.current).toBe(true);
  });

  it("returns false when document is hidden at init", () => {
    setHidden(true);
    const { result } = renderHook(() => useVisibilityChange());
    expect(result.current).toBe(false);
  });

  it("updates to false when the page becomes hidden", () => {
    setHidden(false);
    const { result } = renderHook(() => useVisibilityChange());
    expect(result.current).toBe(true);

    act(() => {
      setHidden(true);
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current).toBe(false);
  });

  it("updates to true when the page becomes visible again", () => {
    setHidden(false);
    const { result } = renderHook(() => useVisibilityChange());
    act(() => {
      setHidden(true);
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current).toBe(false);

    act(() => {
      setHidden(false);
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current).toBe(true);
  });

  it("invokes the onChange callback with the new visibility", () => {
    const onChange = vi.fn();
    setHidden(false);
    renderHook(() => useVisibilityChange(onChange));

    act(() => {
      setHidden(true);
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(onChange).toHaveBeenLastCalledWith(false);

    act(() => {
      setHidden(false);
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(onChange).toHaveBeenLastCalledWith(true);
  });

  it("works without an onChange callback (no throw)", () => {
    setHidden(false);
    const { result } = renderHook(() => useVisibilityChange());
    expect(() =>
      act(() => {
        setHidden(true);
        document.dispatchEvent(new Event("visibilitychange"));
      }),
    ).not.toThrow();
    expect(result.current).toBe(false);
  });

  it("removes the visibilitychange listener on unmount", () => {
    const addSpy = vi.spyOn(document, "addEventListener");
    const removeSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useVisibilityChange());

    expect(
      addSpy.mock.calls.filter(([t]) => t === "visibilitychange").length,
    ).toBeGreaterThanOrEqual(1);

    unmount();
    expect(
      removeSpy.mock.calls.filter(([t]) => t === "visibilitychange").length,
    ).toBeGreaterThanOrEqual(1);
  });
});
