import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

const MOBILE_BREAKPOINT = 768;

type ChangeListener = (e: Event) => void;

// A controllable matchMedia mock that records "change" listeners so tests can
// fire them and exercise the hook's effect branch.
let changeListeners: ChangeListener[] = [];
let currentWidth = 1200;

function installMatchMediaMock() {
  changeListeners = [];
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: currentWidth < MOBILE_BREAKPOINT,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (_type: string, cb: ChangeListener) => {
        if (_type === "change") changeListeners.push(cb);
      },
      removeEventListener: (_type: string, cb: ChangeListener) => {
        const i = changeListeners.indexOf(cb);
        if (i >= 0) changeListeners.splice(i, 1);
      },
      dispatchEvent: () => false,
    }),
  });
}

function setWidth(width: number) {
  currentWidth = width;
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
}

function fireChange() {
  for (const cb of changeListeners) cb(new Event("change"));
}

describe("use-mobile", () => {
  beforeEach(() => {
    setWidth(1200);
    installMatchMediaMock();
  });

  it("exports useIsMobile", () => {
    expect(useIsMobile).toBeDefined();
  });

  it("returns false for a wide viewport at init", () => {
    setWidth(1200);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when innerWidth is below the breakpoint at init", () => {
    setWidth(500);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false when innerWidth equals the breakpoint (strict less-than)", () => {
    setWidth(MOBILE_BREAKPOINT);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("updates to true when the viewport crosses below the breakpoint", () => {
    setWidth(1200);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    setWidth(600);
    act(() => fireChange());
    expect(result.current).toBe(true);
  });

  it("updates back to false when the viewport crosses above the breakpoint", () => {
    setWidth(600);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    setWidth(1000);
    act(() => fireChange());
    expect(result.current).toBe(false);
  });

  it("removes its change listener on unmount", () => {
    setWidth(1200);
    const { unmount } = renderHook(() => useIsMobile());
    expect(changeListeners.length).toBe(1);
    unmount();
    expect(changeListeners.length).toBe(0);
  });
});
