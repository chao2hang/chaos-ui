import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import * as React from "react";
import { useClickOutside } from "./use-click-outside";

describe("use-click-outside", () => {
  it("exports useClickOutside", () => {
    expect(useClickOutside).toBeDefined();
  });

  it("calls the handler when a mousedown fires outside the ref element", () => {
    const inside = document.createElement("div");
    const outside = document.createElement("div");
    document.body.append(inside, outside);

    const ref = { current: inside } as React.RefObject<HTMLElement | null>;
    const handler = vi.fn();
    renderHook(() => useClickOutside(ref, handler));

    actMouseEvent("mousedown", outside);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0]![0]).toBeInstanceOf(MouseEvent);
  });

  it("does NOT call the handler when the click target is inside the ref element", () => {
    const inside = document.createElement("div");
    const child = document.createElement("button");
    inside.appendChild(child);
    document.body.append(inside);

    const ref = { current: inside } as React.RefObject<HTMLElement | null>;
    const handler = vi.fn();
    renderHook(() => useClickOutside(ref, handler));

    actMouseEvent("mousedown", child);
    expect(handler).not.toHaveBeenCalled();
  });

  it("does NOT call the handler when ref.current is null", () => {
    const outside = document.createElement("div");
    document.body.append(outside);

    const ref = { current: null } as React.RefObject<HTMLElement | null>;
    const handler = vi.fn();
    renderHook(() => useClickOutside(ref, handler));

    actMouseEvent("mousedown", outside);
    expect(handler).not.toHaveBeenCalled();
  });

  it("listens for touchstart events too", () => {
    const inside = document.createElement("div");
    const outside = document.createElement("div");
    document.body.append(inside, outside);

    const ref = { current: inside } as React.RefObject<HTMLElement | null>;
    const handler = vi.fn();
    renderHook(() => useClickOutside(ref, handler));

    actMouseEvent("touchstart", outside);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not attach listeners when enabled=false", () => {
    const inside = document.createElement("div");
    const outside = document.createElement("div");
    document.body.append(inside, outside);

    const ref = { current: inside } as React.RefObject<HTMLElement | null>;
    const handler = vi.fn();
    renderHook(() => useClickOutside(ref, handler, false));

    actMouseEvent("mousedown", outside);
    actMouseEvent("touchstart", outside);
    expect(handler).not.toHaveBeenCalled();
  });

  it("always invokes the LATEST handler (handlerRef stays in sync)", () => {
    const inside = document.createElement("div");
    const outside = document.createElement("div");
    document.body.append(inside, outside);

    const ref = { current: inside } as React.RefObject<HTMLElement | null>;
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(
      ({ h }) => useClickOutside(ref, h),
      { initialProps: { h: first } },
    );

    rerender({ h: second });
    actMouseEvent("mousedown", outside);
    expect(second).toHaveBeenCalledTimes(1);
    expect(first).not.toHaveBeenCalled();
  });

  it("removes document listeners on unmount", () => {
    const inside = document.createElement("div");
    const outside = document.createElement("div");
    document.body.append(inside, outside);

    const ref = { current: inside } as React.RefObject<HTMLElement | null>;
    const handler = vi.fn();
    const { unmount } = renderHook(() => useClickOutside(ref, handler));

    unmount();
    actMouseEvent("mousedown", outside);
    expect(handler).not.toHaveBeenCalled();
  });
});

// Fire a real DOM event on the given target so document-level listeners catch it.
function actMouseEvent(type: "mousedown" | "touchstart", target: Node) {
  const event =
    type === "touchstart"
      ? new TouchEvent(type, { bubbles: true, cancelable: true })
      : new MouseEvent(type, { bubbles: true, cancelable: true });
  target.dispatchEvent(event);
}
