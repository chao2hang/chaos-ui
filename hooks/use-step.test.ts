import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStep } from "./use-step";

describe("use-step", () => {
  it("exports useStep", () => {
    expect(useStep).toBeDefined();
  });

  it("starts at the given initial step with isFirst=true, isLast=false", () => {
    const { result } = renderHook(() => useStep(3, 0));
    expect(result.current.step).toBe(0);
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);
  });

  it("defaults initial step to 0", () => {
    const { result } = renderHook(() => useStep(3));
    expect(result.current.step).toBe(0);
    expect(result.current.isFirst).toBe(true);
  });

  it("next() advances the step", () => {
    const { result } = renderHook(() => useStep(3, 0));
    act(() => result.current.next());
    expect(result.current.step).toBe(1);
    expect(result.current.isFirst).toBe(false);
  });

  it("next() clamps to the last step (max-1)", () => {
    const { result } = renderHook(() => useStep(3, 2));
    expect(result.current.isLast).toBe(true);
    act(() => result.current.next());
    expect(result.current.step).toBe(2);
    expect(result.current.isLast).toBe(true);
  });

  it("prev() decrements the step", () => {
    const { result } = renderHook(() => useStep(3, 2));
    act(() => result.current.prev());
    expect(result.current.step).toBe(1);
  });

  it("prev() clamps to 0 (cannot go below first)", () => {
    const { result } = renderHook(() => useStep(3, 0));
    act(() => result.current.prev());
    expect(result.current.step).toBe(0);
    expect(result.current.isFirst).toBe(true);
  });

  it("goTo() jumps to an arbitrary valid index", () => {
    const { result } = renderHook(() => useStep(5, 0));
    act(() => result.current.goTo(3));
    expect(result.current.step).toBe(3);
    expect(result.current.isFirst).toBe(false);
    expect(result.current.isLast).toBe(false);
  });

  it("goTo() clamps above max-1", () => {
    const { result } = renderHook(() => useStep(3, 0));
    act(() => result.current.goTo(99));
    expect(result.current.step).toBe(2);
    expect(result.current.isLast).toBe(true);
  });

  it("goTo() clamps below 0", () => {
    const { result } = renderHook(() => useStep(3, 1));
    act(() => result.current.goTo(-5));
    expect(result.current.step).toBe(0);
    expect(result.current.isFirst).toBe(true);
  });

  it("reset() returns to the initial step", () => {
    const { result } = renderHook(() => useStep(3, 1));
    act(() => result.current.goTo(2));
    expect(result.current.step).toBe(2);
    act(() => result.current.reset());
    expect(result.current.step).toBe(1);
  });

  it("isFirst and isLast are both true when max is 1", () => {
    const { result } = renderHook(() => useStep(1, 0));
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(true);
  });

  it("a full forward-then-backward walk hits both ends", () => {
    const { result } = renderHook(() => useStep(3, 0));
    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current.isLast).toBe(true);
    act(() => result.current.prev());
    act(() => result.current.prev());
    expect(result.current.isFirst).toBe(true);
  });
});
