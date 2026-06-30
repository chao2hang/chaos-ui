import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUndo } from "./use-undo";

describe("useUndo", () => {
  it("starts with initial value and no undo/redo", () => {
    const { result } = renderHook(() => useUndo("a"));
    expect(result.current.value).toBe("a");
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it("supports undo and redo after setting values", () => {
    const { result } = renderHook(() => useUndo("a"));
    act(() => result.current.setValue("b"));
    act(() => result.current.setValue("c"));
    expect(result.current.value).toBe("c");
    expect(result.current.canUndo).toBe(true);
    act(() => result.current.undo());
    expect(result.current.value).toBe("b");
    expect(result.current.canRedo).toBe(true);
    act(() => result.current.redo());
    expect(result.current.value).toBe("c");
  });

  it("clear resets to initial", () => {
    const { result } = renderHook(() => useUndo("a"));
    act(() => result.current.setValue("b"));
    act(() => result.current.clear());
    expect(result.current.value).toBe("a");
    expect(result.current.canUndo).toBe(false);
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useUndo(1));
    act(() => result.current.setValue((p) => p + 1));
    expect(result.current.value).toBe(2);
  });
});
