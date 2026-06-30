import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIdle } from "./use-idle";

describe("useIdle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("is not idle initially and becomes idle after timeout", () => {
    const { result } = renderHook(() => useIdle(1000));
    expect(result.current).toBe(false);
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(result.current).toBe(true);
  });

  it("resets idle on activity", () => {
    const { result } = renderHook(() => useIdle(1000));
    act(() => {
      vi.advanceTimersByTime(500);
      window.dispatchEvent(new Event("mousedown"));
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe(false);
    vi.useRealTimers();
  });
});
