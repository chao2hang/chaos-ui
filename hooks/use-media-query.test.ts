import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMediaQuery, useIsDesktop, useIsTablet } from "./use-media-query";

type Listener = (e: { matches: boolean }) => void;

interface MockMQL {
  matches: boolean;
  media: string;
  onchange: null;
  addEventListener: (type: string, l: Listener) => void;
  removeEventListener: (type: string, l: Listener) => void;
  addListener: (l: Listener) => void;
  removeListener: (l: Listener) => void;
  dispatchEvent: () => boolean;
  __listeners: Set<Listener>;
}

function createMatchMedia(initialMatches: boolean) {
  return (query: string): MockMQL => {
    const mql: MockMQL = {
      matches: initialMatches,
      media: query,
      onchange: null,
      __listeners: new Set<Listener>(),
      addEventListener(type: string, l: Listener) {
        if (type === "change") this.__listeners.add(l);
      },
      removeEventListener(type: string, l: Listener) {
        if (type === "change") this.__listeners.delete(l);
      },
      addListener(l: Listener) {
        this.__listeners.add(l);
      },
      removeListener(l: Listener) {
        this.__listeners.delete(l);
      },
      dispatchEvent: () => false,
    };
    return mql;
  };
}

describe("use-media-query", () => {
  let original: typeof window.matchMedia | undefined;
  beforeEach(() => {
    original = window.matchMedia;
  });
  afterEach(() => {
    window.matchMedia = original!;
  });

  it("exports useMediaQuery", () => {
    expect(useMediaQuery).toBeDefined();
  });
  it("exports useIsDesktop", () => {
    expect(useIsDesktop).toBeDefined();
  });
  it("exports useIsTablet", () => {
    expect(useIsTablet).toBeDefined();
  });

  it("returns false when media does not match", () => {
    window.matchMedia = createMatchMedia(false) as unknown as typeof window.matchMedia;
    const { result } = renderHook(() => useMediaQuery("(min-width: 1024px)"));
    expect(result.current).toBe(false);
  });

  it("returns true when media matches on initial read", () => {
    window.matchMedia = createMatchMedia(true) as unknown as typeof window.matchMedia;
    const { result } = renderHook(() => useMediaQuery("(min-width: 1024px)"));
    expect(result.current).toBe(true);
  });

  it("updates matches when the media query change event fires", () => {
    let mqlRef: MockMQL | null = null;
    const mm = (query: string): MockMQL => {
      const mql = createMatchMedia(false)(query);
      mqlRef = mql;
      return mql;
    };
    window.matchMedia = mm as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);

    act(() => {
      mqlRef!.matches = true;
      mqlRef!.__listeners.forEach((l) => l({ matches: true }));
    });
    expect(result.current).toBe(true);
  });

  it("re-binds when the query changes", () => {
    const calls: string[] = [];
    const factory = (query: string): MockMQL => {
      const mql = createMatchMedia(false)(query);
      calls.push(query);
      return mql;
    };
    window.matchMedia = factory as unknown as typeof window.matchMedia;

    const { rerender } = renderHook(({ q }) => useMediaQuery(q), {
      initialProps: { q: "(min-width: 1px)" },
    });
    rerender({ q: "(min-width: 2px)" });
    // A fresh mql was created for each distinct query.
    expect(calls).toContain("(min-width: 1px)");
    expect(calls).toContain("(min-width: 2px)");
  });

  it("useIsDesktop uses default 1024 breakpoint", () => {
    window.matchMedia = createMatchMedia(true) as unknown as typeof window.matchMedia;
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(true);
  });

  it("useIsTablet uses min/max range", () => {
    window.matchMedia = createMatchMedia(false) as unknown as typeof window.matchMedia;
    const { result } = renderHook(() => useIsTablet());
    expect(result.current).toBe(false);
  });

  it("useIsTablet custom min/max override the default range", () => {
    let capturedQuery = "";
    const factory = (query: string): MockMQL => {
      capturedQuery = query;
      return createMatchMedia(true)(query);
    };
    window.matchMedia = factory as unknown as typeof window.matchMedia;
    renderHook(() => useIsTablet(500, 900));
    expect(capturedQuery).toBe("(min-width: 500px) and (max-width: 900px)");
  });

  it("useIsDesktop custom breakpoint is reflected in the query", () => {
    let capturedQuery = "";
    const factory = (query: string): MockMQL => {
      capturedQuery = query;
      return createMatchMedia(false)(query);
    };
    window.matchMedia = factory as unknown as typeof window.matchMedia;
    renderHook(() => useIsDesktop(768));
    expect(capturedQuery).toBe("(min-width: 768px)");
  });

  it("schedules a setTimeout to sync matches on mount", () => {
    window.matchMedia = createMatchMedia(true) as unknown as typeof window.matchMedia;
    const setTimeoutSpy = vi.spyOn(window, "setTimeout");
    renderHook(() => useMediaQuery("(min-width: 1px)"));
    expect(setTimeoutSpy).toHaveBeenCalled();
    setTimeoutSpy.mockRestore();
  });

  it("cleans up the timeout and listener on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    let removeSpy: ReturnType<typeof vi.spyOn> | null = null;
    const factory = (query: string): MockMQL => {
      const mql = createMatchMedia(false)(query);
      removeSpy = vi.spyOn(mql, "removeEventListener");
      return mql;
    };
    window.matchMedia = factory as unknown as typeof window.matchMedia;
    const { unmount } = renderHook(() => useMediaQuery("(min-width: 1px)"));
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(removeSpy).not.toBeNull();
    expect(removeSpy).toHaveBeenCalledWith("change", expect.any(Function));
    clearTimeoutSpy.mockRestore();
  });
});
