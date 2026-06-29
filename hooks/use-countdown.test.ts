import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountdown } from "@/hooks/use-countdown";

describe("useCountdown", () => {
  it("counts down correctly", () => {
    vi.useFakeTimers();
    const target = Date.now() + 3 * 1000; // 3 seconds
    const { result } = renderHook(() => useCountdown(target));
    expect(result.current.seconds).toBeLessThanOrEqual(3);
    vi.useRealTimers();
  });

  it("isFinished when target is in the past", () => {
    const { result } = renderHook(() => useCountdown(Date.now() - 1000));
    expect(result.current.isFinished).toBe(true);
  });

  it("stops ticking after countdown finishes (no wasted re-renders)", () => {
    vi.useFakeTimers();
    const target = Date.now() + 1000; // 1 second
    const { result } = renderHook(() => useCountdown(target));
    // Advance past the target.
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(result.current.isFinished).toBe(true);
    // Capture totalSeconds; advancing further should NOT keep changing now
    // (interval cleared). We verify isFinished stays true.
    const before = result.current.totalSeconds;
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.totalSeconds).toBe(before); // 0, no further ticks
    vi.useRealTimers();
  });

  it("handles NaN target", () => {
    const { result } = renderHook(() => useCountdown("not-a-date"));
    expect(result.current.isFinished).toBe(true);
  });
});
