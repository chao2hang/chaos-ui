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

    rerender({ h: () => { count = 2; } });
    const bindsAfterRerender = addSpy.mock.calls.length;

    expect(bindsAfterRerender).toBe(bindsAfterFirst);

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

    rerender({ opts: { passive: true } });
    rerender({ opts: { passive: false } });

    expect(addSpy.mock.calls.length).toBe(bindsAfterFirst);

    div.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("passes options to addEventListener on bind", () => {
    const div = document.createElement("div");
    const handler = vi.fn();
    const opts = { passive: true, capture: true };
    const addSpy = vi.spyOn(div, "addEventListener");
    renderHook(() => useEventListener(div, "click", handler, opts));
    expect(addSpy).toHaveBeenCalledWith("click", expect.any(Function), opts);
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

  it("does not throw when target is undefined", () => {
    expect(() => renderHook(() => useEventListener(undefined, "click", () => {}))).not.toThrow();
  });

  it("binds to window target", () => {
    const handler = vi.fn();
    renderHook(() => useEventListener(window, "resize", handler));
    window.dispatchEvent(new Event("resize"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("binds to document target", () => {
    const handler = vi.fn();
    renderHook(() => useEventListener(document, "keydown", handler));
    document.dispatchEvent(new KeyboardEvent("keydown"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("re-binds when eventName changes", () => {
    const div = document.createElement("div");
    const handler = vi.fn();
    const addSpy = vi.spyOn(div, "addEventListener");

    const { rerender } = renderHook(
      ({ name }: { name: string }) =>
        useEventListener(div, name, handler),
      { initialProps: { name: "click" } },
    );
    const afterFirst = addSpy.mock.calls.length;

    rerender({ name: "input" });
    expect(addSpy.mock.calls.length).toBeGreaterThan(afterFirst);

    // The new event triggers the handler.
    div.dispatchEvent(new Event("input"));
    expect(handler).toHaveBeenCalled();
  });

  it("handler receives the event object", () => {
    const div = document.createElement("div");
    const handler = vi.fn();
    renderHook(() => useEventListener(div, "click", handler));
    const evt = new Event("click");
    div.dispatchEvent(evt);
    expect(handler).toHaveBeenCalledWith(evt);
  });

  it("component integration: responds to a real DOM event", () => {
    const handler = vi.fn();
    function Bound() {
      useEventListener(document, "custom-x", handler);
      return <button type="button">btn</button>;
    }
    render(<Bound />);
    document.dispatchEvent(new Event("custom-x"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("re-binds when the target changes", () => {
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const handler = vi.fn();
    const { rerender } = renderHook(
      ({ t }) => useEventListener(t, "click", handler),
      { initialProps: { t: div1 } },
    );
    div1.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);

    rerender({ t: div2 });
    // Old target no longer fires.
    div1.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
    // New target fires.
    div2.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it("cleans up the old target when switching to a new one", () => {
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const removeSpy = vi.spyOn(div1, "removeEventListener");
    const handler = vi.fn();
    const { rerender } = renderHook(
      ({ t }) => useEventListener(t, "click", handler),
      { initialProps: { t: div1 } },
    );
    rerender({ t: div2 });
    expect(removeSpy).toHaveBeenCalledWith("click", expect.any(Function), undefined);
    removeSpy.mockRestore();
  });

  it("binds to a MediaQueryList target", () => {
    const mql: MediaQueryList = {
      matches: false,
      media: "(min-width: 1px)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: () => false,
    } as unknown as MediaQueryList;
    const handler = vi.fn();
    renderHook(() => useEventListener(mql, "change", handler));
    expect(mql.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
      undefined,
    );
  });

  it("passive option is forwarded on bind (read once at bind time)", () => {
    const div = document.createElement("div");
    const handler = vi.fn();
    const addSpy = vi.spyOn(div, "addEventListener");
    renderHook(() => useEventListener(div, "scroll", handler, { passive: true }));
    expect(addSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      { passive: true },
    );
    addSpy.mockRestore();
  });

  it("latest handler is invoked even after re-render without re-bind", () => {
    const div = document.createElement("div");
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(
      ({ h }) => useEventListener(div, "click", h),
      { initialProps: { h: first } },
    );
    rerender({ h: second });
    div.dispatchEvent(new Event("click"));
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
