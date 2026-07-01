import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useKey, useKeyCombo, type KeyFilter } from "@/hooks/use-key";

function fireKeyOnTarget(
  target: EventTarget,
  key: string,
  type: "keydown" | "keyup" | "keypress" = "keydown",
  options: KeyboardEventInit = {},
) {
  const event = new KeyboardEvent(type, {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });
  target.dispatchEvent(event);
  return event;
}

describe("useKey", () => {
  it("is exported and types are importable", () => {
    expect(useKey).toBeDefined();
    expect(useKeyCombo).toBeDefined();
  });

  it("calls handler when key matches a single string", () => {
    const handler = vi.fn();
    renderHook(() => useKey("Escape", handler));
    fireKeyOnTarget(window, "Escape");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not call handler when key does not match", () => {
    const handler = vi.fn();
    renderHook(() => useKey("Escape", handler));
    fireKeyOnTarget(window, "Enter");
    expect(handler).not.toHaveBeenCalled();
  });

  it("calls handler for any matching key in an array", () => {
    const handler = vi.fn();
    renderHook(() => useKey(["Meta+k", "Control+k"], handler));
    fireKeyOnTarget(window, "k", "keydown", { ctrlKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("calls handler when key filter is a function returning true", () => {
    const handler = vi.fn();
    const filter: KeyFilter = (e: KeyboardEvent) => e.key === "ArrowDown";
    renderHook(() => useKey(filter, handler));
    fireKeyOnTarget(window, "ArrowDown");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not call handler when key filter function returns false", () => {
    const handler = vi.fn();
    const filter: KeyFilter = (e: KeyboardEvent) => e.key === "ArrowDown";
    renderHook(() => useKey(filter, handler));
    fireKeyOnTarget(window, "ArrowUp");
    expect(handler).not.toHaveBeenCalled();
  });

  it("supports keyup event type", () => {
    const handler = vi.fn();
    renderHook(() => useKey("a", handler, { event: "keyup" }));
    fireKeyOnTarget(window, "a", "keyup");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not fire when enabled is false", () => {
    const handler = vi.fn();
    renderHook(() => useKey("a", handler, { enabled: false }));
    fireKeyOnTarget(window, "a");
    expect(handler).not.toHaveBeenCalled();
  });

  it("prevents default when preventDefault is true", () => {
    const handler = vi.fn();
    renderHook(() => useKey("a", handler, { preventDefault: true }));
    const event = fireKeyOnTarget(window, "a");
    expect(event.defaultPrevented).toBe(true);
  });

  it("does not prevent default when preventDefault is false", () => {
    const handler = vi.fn();
    renderHook(() => useKey("a", handler, { preventDefault: false }));
    const event = fireKeyOnTarget(window, "a");
    expect(event.defaultPrevented).toBe(false);
  });

  it("supports custom target element", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    renderHook(() => useKey("a", handler, { target: div }));
    fireKeyOnTarget(div, "a");
    expect(handler).toHaveBeenCalledTimes(1);
    document.body.removeChild(div);
  });

  it("cleans up event listener on unmount", () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useKey("x", handler));
    unmount();
    fireKeyOnTarget(window, "x");
    expect(handler).not.toHaveBeenCalled();
  });

  it("matches ctrl+key combo", () => {
    const handler = vi.fn();
    renderHook(() => useKey("ctrl+s", handler));
    fireKeyOnTarget(window, "s", "keydown", { ctrlKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("matches shift+key combo", () => {
    const handler = vi.fn();
    renderHook(() => useKey("shift+a", handler));
    fireKeyOnTarget(window, "a", "keydown", { shiftKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("matches alt+key combo", () => {
    const handler = vi.fn();
    renderHook(() => useKey("alt+p", handler));
    fireKeyOnTarget(window, "p", "keydown", { altKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("matches meta+key combo", () => {
    const handler = vi.fn();
    renderHook(() => useKey("meta+k", handler));
    fireKeyOnTarget(window, "k", "keydown", { metaKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not match when modifier is missing", () => {
    const handler = vi.fn();
    renderHook(() => useKey("ctrl+s", handler));
    fireKeyOnTarget(window, "s"); // no ctrl
    expect(handler).not.toHaveBeenCalled();
  });
});

describe("useKeyCombo", () => {
  it("calls handler when combo matches", () => {
    const handler = vi.fn();
    renderHook(() => useKeyCombo("ctrl+k", handler));
    fireKeyOnTarget(window, "k", "keydown", { ctrlKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("module is importable", async () => {
    const mod = await import("@/hooks/use-key");
    expect(mod.useKey).toBeDefined();
    expect(mod.useKeyCombo).toBeDefined();
  });
});
