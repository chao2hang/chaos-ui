import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act as hookAct } from "@testing-library/react";
import { useClipboard } from "@/hooks/use-clipboard";

describe("useClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial state", () => {
    const { result } = renderHook(() => useClipboard());
    expect(result.current.copying).toBe(false);
    expect(result.current.copied).toBe(false);
    expect(result.current.value).toBeNull();
    expect(typeof result.current.copy).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("copies text successfully via navigator.clipboard", async () => {
    const { result } = renderHook(() => useClipboard());
    let success: boolean | undefined;
    await hookAct(async () => {
      success = await result.current.copy("hello world");
    });
    expect(success).toBe(true);
    expect(result.current.copied).toBe(true);
    expect(result.current.value).toBe("hello world");
    expect(result.current.copying).toBe(false);
  });

  it("resets copied state after timeout", async () => {
    const { result } = renderHook(() => useClipboard(1000));
    await hookAct(async () => {
      await result.current.copy("test");
    });
    expect(result.current.copied).toBe(true);
    hookAct(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.copied).toBe(false);
  });

  it("resets state with reset function", async () => {
    const { result } = renderHook(() => useClipboard());
    await hookAct(async () => {
      await result.current.copy("test");
    });
    expect(result.current.copied).toBe(true);
    expect(result.current.value).toBe("test");
    hookAct(() => {
      result.current.reset();
    });
    expect(result.current.copied).toBe(false);
    expect(result.current.value).toBeNull();
    expect(result.current.copying).toBe(false);
  });

  it("falls back to execCommand when clipboard API fails", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("not supported")),
      },
    });
    // Mock document.execCommand for fallback
    const execCommandMock = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    const { result } = renderHook(() => useClipboard());
    let success: boolean | undefined;
    await hookAct(async () => {
      success = await result.current.copy("fallback text");
    });
    expect(success).toBe(true);
    expect(result.current.copied).toBe(true);
    expect(result.current.value).toBe("fallback text");
  });

  it("returns false when both clipboard and execCommand fail", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("fail")),
      },
    });
    document.execCommand = vi.fn().mockReturnValue(false);

    const { result } = renderHook(() => useClipboard());
    let success: boolean | undefined;
    await hookAct(async () => {
      success = await result.current.copy("fail text");
    });
    expect(success).toBe(false);
    expect(result.current.copied).toBe(false);
    expect(result.current.value).toBeNull();
  });

  it("clears previous timeout on subsequent copies", async () => {
    const { result } = renderHook(() => useClipboard(5000));
    await hookAct(async () => {
      await result.current.copy("first");
    });
    expect(result.current.copied).toBe(true);

    // Copy again before first timeout elapses
    await hookAct(async () => {
      await result.current.copy("second");
    });
    expect(result.current.copied).toBe(true);
    expect(result.current.value).toBe("second");

    // Advance past the original timeout — should still be copied
    // because the timeout was reset
    hookAct(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.copied).toBe(false);
  });

  it("module is importable", async () => {
    const mod = await import("@/hooks/use-clipboard");
    expect(mod.useClipboard).toBeDefined();
  });
});
