import { describe, it, expect, vi } from "vitest";
import { render, renderHook } from "@testing-library/react";
import { useEventListener } from "@/hooks/use-event-listener";

describe("useEventListener", () => {
  it("binds listener to target", () => {
    const div = document.createElement("div");
    const handler = vi.fn();
    renderHook(() => useEventListener(div, "click", handler));
    div.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("uses latest handler closure without re-binding", () => {
    const div = document.createElement("div");
    let count = 0;
    const addSpy = vi.spyOn(div, "addEventListener");

    const { rerender } = renderHook(
      ({ h }) => useEventListener(div, "click", h),
      { initialProps: { h: () => { count = 1; } } },
    );
    const bindsAfterFirst = addSpy.mock.calls.length;

    // Re-render with a NEW handler function reference (inline).
    rerender({ h: () => { count = 2; } });
    const bindsAfterRerender = addSpy.mock.calls.length;

    // Should NOT re-bind on handler change (handler held in ref).
    expect(bindsAfterRerender).toBe(bindsAfterFirst);

    // New handler should be used on next event.
    div.dispatchEvent(new Event("click"));
    expect(count).toBe(2);
  });

  it("does not re-bind when options object reference changes", () => {
    const div = document.createElement("div");
    const handler = vi.fn();
    const addSpy = vi.spyOn(div, "addEventListener");

    const { rerender } = renderHook(
      ({ opts }) => useEventListener(div, "click", handler, opts),
      { initialProps: { opts: { passive: true } } },
    );
    const bindsAfterFirst = addSpy.mock.calls.length;

    // New options object reference each render (common inline usage).
    rerender({ opts: { passive: true } });
    rerender({ opts: { passive: false } });

    // Should NOT re-bind on options reference change.
    expect(addSpy.mock.calls.length).toBe(bindsAfterFirst);

    // Still receives events.
    div.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("cleans up listener on unmount", () => {
    const div = document.createElement("div");
    const handler = vi.fn();
    const removeSpy = vi.spyOn(div, "removeEventListener");

    const { unmount } = renderHook(() => useEventListener(div, "click", handler));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      undefined,
    );

    div.dispatchEvent(new Event("click"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("does not throw when target is null", () => {
    expect(() => renderHook(() => useEventListener(null, "click", () => {}))).not.toThrow();
  });
});

// keep render import used
void render;
