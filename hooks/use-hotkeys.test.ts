import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useHotkeys } from "@/hooks/use-hotkeys";

function fireKeyDown(key: string, options: KeyboardEventInit = {}) {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });
  document.dispatchEvent(event);
  return event;
}

describe("useHotkeys", () => {
  it("is exported", () => {
    expect(useHotkeys).toBeDefined();
  });

  it("calls handler when key matches", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ k: handler }));
    fireKeyDown("k");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not call handler when key does not match", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ k: handler }));
    fireKeyDown("j");
    expect(handler).not.toHaveBeenCalled();
  });

  it("calls handler with modifier key (ctrl+k)", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ "ctrl+k": handler }));
    fireKeyDown("k", { ctrlKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("calls handler with mod+k (ctrl on non-Mac)", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ "mod+k": handler }));
    fireKeyDown("k", { ctrlKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("calls handler with cmd+k (meta key)", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ "cmd+k": handler }));
    fireKeyDown("k", { metaKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("calls handler with shift+key", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ "shift+a": handler }));
    fireKeyDown("a", { shiftKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("calls handler with alt+key", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ "alt+s": handler }));
    fireKeyDown("s", { altKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not call handler when modifier is missing", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ "ctrl+k": handler }));
    fireKeyDown("k"); // no ctrl
    expect(handler).not.toHaveBeenCalled();
  });

  it("prevents default when preventDefault is true", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ k: handler }, { preventDefault: true }));
    const event = fireKeyDown("k");
    expect(event.defaultPrevented).toBe(true);
  });

  it("does not prevent default when preventDefault is false", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ k: handler }, { preventDefault: false }));
    const event = fireKeyDown("k");
    expect(event.defaultPrevented).toBe(false);
  });

  it("does not fire when enabled is false", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ k: handler }, { enabled: false }));
    fireKeyDown("k");
    expect(handler).not.toHaveBeenCalled();
  });

  it("ignores events from input elements by default", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ k: handler }));
    const input = document.createElement("input");
    document.body.appendChild(input);
    const event = new KeyboardEvent("keydown", {
      key: "k",
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);
    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(input);
  });

  it("fires events from input elements when allowInInputs is true", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ k: handler }, { allowInInputs: true }));
    const input = document.createElement("input");
    document.body.appendChild(input);
    const event = new KeyboardEvent("keydown", {
      key: "k",
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);
    expect(handler).toHaveBeenCalledTimes(1);
    document.body.removeChild(input);
  });

  it("cleans up event listener on unmount", () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useHotkeys({ k: handler }));
    unmount();
    fireKeyDown("k");
    expect(handler).not.toHaveBeenCalled();
  });

  it("handles multiple hotkeys", () => {
    const handlerK = vi.fn();
    const handlerJ = vi.fn();
    renderHook(() => useHotkeys({ k: handlerK, j: handlerJ }));
    fireKeyDown("k");
    expect(handlerK).toHaveBeenCalledTimes(1);
    expect(handlerJ).not.toHaveBeenCalled();
    fireKeyDown("j");
    expect(handlerJ).toHaveBeenCalledTimes(1);
  });

  it("module is importable", async () => {
    const mod = await import("@/hooks/use-hotkeys");
    expect(mod.useHotkeys).toBeDefined();
  });
});
