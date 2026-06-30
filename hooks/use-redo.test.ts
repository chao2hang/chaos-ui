import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRedo } from "./use-redo";

describe("useRedo", () => {
  it("pushes, peeks, and pops", () => {
    const { result } = renderHook(() => useRedo<string>());
    expect(result.current.redoCount).toBe(0);
    act(() => result.current.push("a"));
    act(() => result.current.push("b"));
    expect(result.current.redoCount).toBe(2);
    expect(result.current.peek()).toBe("b");
    act(() => result.current.pop());
    expect(result.current.peek()).toBe("a");
    expect(result.current.redoCount).toBe(1);
  });

  it("clear empties the queue", () => {
    const { result } = renderHook(() => useRedo<number>());
    act(() => result.current.push(1));
    act(() => result.current.clear());
    expect(result.current.redoCount).toBe(0);
  });
});
