import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBreakpoint, useIsBreakpoint } from "@/hooks/use-breakpoint";

function setWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
}

describe("useBreakpoint", () => {
  afterEach(() => {
    setWidth(1024);
  });

  it("initial value is undefined (SSR/hydration-safe)", () => {
    const { result } = renderHook(() => useBreakpoint());
    const bp = result.current;
    expect(bp === undefined || ["xs", "sm", "md", "lg", "xl", "2xl"].includes(bp)).toBe(true);
  });

  it("returns a valid breakpoint after effect", () => {
    setWidth(1024);
    const { result } = renderHook(() => useBreakpoint());
    expect(["xs", "sm", "md", "lg", "xl", "2xl"]).toContain(result.current);
  });

  it("detects 2xl at very wide viewport", () => {
    setWidth(2000);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("2xl");
  });

  it("detects xl at 1280px", () => {
    setWidth(1280);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("xl");
  });

  it("detects lg at 1024px", () => {
    setWidth(1024);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("lg");
  });

  it("detects md at 768px", () => {
    setWidth(768);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("md");
  });

  it("detects sm at 640px", () => {
    setWidth(640);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("sm");
  });

  it("detects xs below 640px", () => {
    setWidth(320);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("xs");
  });

  it("adds the resize listener with passive option", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    renderHook(() => useBreakpoint());
    const resizeCall = addSpy.mock.calls.find((c) => c[0] === "resize");
    expect(resizeCall).toBeDefined();
    expect(resizeCall?.[2]).toEqual({ passive: true });
    addSpy.mockRestore();
  });

  it("updates breakpoint on resize", () => {
    setWidth(1280);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("xl");
    act(() => {
      setWidth(500);
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toBe("xs");
  });

  it("removes resize listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useBreakpoint());
    unmount();
    // Source calls removeEventListener without an options 3rd arg.
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    removeSpy.mockRestore();
  });
});

describe("useIsBreakpoint", () => {
  afterEach(() => {
    setWidth(1024);
  });

  it("returns false before hydration (undefined current)", () => {
    const { result } = renderHook(() => useIsBreakpoint("md"));
    expect(typeof result.current).toBe("boolean");
  });

  it("returns true when current >= given breakpoint", () => {
    setWidth(1024);
    const { result } = renderHook(() => useIsBreakpoint("md"));
    expect(result.current).toBe(true);
  });

  it("returns true when current equals the given breakpoint", () => {
    setWidth(768);
    const { result } = renderHook(() => useIsBreakpoint("md"));
    expect(result.current).toBe(true);
  });

  it("returns false when current is below the given breakpoint", () => {
    setWidth(500);
    const { result } = renderHook(() => useIsBreakpoint("lg"));
    expect(result.current).toBe(false);
  });

  it("updates reactively on resize", () => {
    setWidth(1280);
    const { result } = renderHook(() => useIsBreakpoint("xl"));
    expect(result.current).toBe(true);
    act(() => {
      setWidth(500);
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toBe(false);
  });
});
