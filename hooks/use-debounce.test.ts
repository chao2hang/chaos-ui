import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/use-debounce";

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 100));
    expect(result.current).toBe("hello");
  });

  it("debounces value changes", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 100), {
      initialProps: { v: "a" },
    });
    rerender({ v: "b" });
    expect(result.current).toBe("a"); // still old within delay
    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe("b");
    vi.useRealTimers();
  });
});
