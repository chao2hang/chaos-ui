import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToggle } from "@/hooks/use-toggle";
import { usePrevious } from "@/hooks/use-previous";

describe("useToggle", () => {
  it("initial value", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
  });

  it("toggle flips", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(false);
  });

  it("setValue sets", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current[2](true));
    expect(result.current[0]).toBe(true);
  });
});

describe("usePrevious", () => {
  it("returns undefined initially", () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBeUndefined();
  });

  it("returns previous value after change", () => {
    const { result, rerender } = renderHook(({ v }) => usePrevious(v), {
      initialProps: { v: 1 },
    });
    rerender({ v: 2 });
    expect(result.current).toBe(1);
    rerender({ v: 3 });
    expect(result.current).toBe(2);
  });
});
