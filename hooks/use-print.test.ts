import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePrint } from "./use-print";

describe("usePrint", () => {
  it("tracks isPrinting around window.print", async () => {
    const printSpy = vi.fn();
    vi.stubGlobal("print", printSpy);
    const { result } = renderHook(() => usePrint());
    expect(result.current.isPrinting).toBe(false);
    await act(async () => {
      await result.current.print();
    });
    expect(printSpy).toHaveBeenCalled();
    expect(result.current.isPrinting).toBe(false);
    vi.unstubAllGlobals();
  });

  it("calls beforePrint and afterPrint", async () => {
    const before = vi.fn();
    const after = vi.fn();
    vi.stubGlobal("print", vi.fn());
    const { result } = renderHook(() => usePrint());
    await act(async () => {
      await result.current.print(null, { beforePrint: before, afterPrint: after });
    });
    expect(before).toHaveBeenCalledTimes(1);
    expect(after).toHaveBeenCalledTimes(1);
    vi.unstubAllGlobals();
  });
});
