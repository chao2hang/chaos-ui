import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import {
  SwipeActions,
  type SwipeDirection,
} from "@/components/mobile/mobile-swipe-actions";

describe("SwipeActions", () => {
  it("is exported and types are importable", () => {
    expect(SwipeActions).toBeDefined();
    const _d: SwipeDirection = "left";
    expect(_d).toBe("left");
  });

  it("renders children", () => {
    render(<SwipeActions>Content</SwipeActions>);
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("renders data-slot", () => {
    const { container } = render(<SwipeActions>x</SwipeActions>);
    expect(container.querySelector('[data-slot="swipe-actions"]')).not.toBeNull();
  });

  it("does not trigger callbacks when disabled", () => {
    const onSwipeLeft = vi.fn();
    const onSwipeRight = vi.fn();
    const { container } = render(
      <SwipeActions
        disabled
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        threshold={80}
      >
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(el, { touches: [{ clientX: 200, clientY: 0 }] });
    fireEvent.touchEnd(el);
    expect(onSwipeLeft).not.toHaveBeenCalled();
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  it("fires onSwipeRight + rightAction.onClick on right swipe past threshold", () => {
    const onSwipeRight = vi.fn();
    const rightClick = vi.fn();
    const { container } = render(
      <SwipeActions
        onSwipeRight={onSwipeRight}
        threshold={80}
        rightAction={{ label: "Delete", onClick: rightClick }}
      >
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(el, { touches: [{ clientX: 200, clientY: 0 }] });
    // action label should appear while swiping (delta > 20)
    expect(screen.getByText("Delete")).toBeDefined();
    fireEvent.touchEnd(el);
    expect(onSwipeRight).toHaveBeenCalled();
    expect(rightClick).toHaveBeenCalled();
  });

  it("fires onSwipeLeft + leftAction.onClick on left swipe past threshold", () => {
    const onSwipeLeft = vi.fn();
    const leftClick = vi.fn();
    const { container } = render(
      <SwipeActions
        onSwipeLeft={onSwipeLeft}
        threshold={80}
        leftAction={{ label: "Archive", onClick: leftClick }}
      >
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientX: 200, clientY: 0 }] });
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: 0 }] });
    expect(screen.getByText("Archive")).toBeDefined();
    fireEvent.touchEnd(el);
    expect(onSwipeLeft).toHaveBeenCalled();
    expect(leftClick).toHaveBeenCalled();
  });

  it("does not fire swipe when below threshold", () => {
    const onSwipeLeft = vi.fn();
    const { container } = render(
      <SwipeActions onSwipeLeft={onSwipeLeft} threshold={80}>
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientX: 200, clientY: 0 }] });
    fireEvent.touchMove(el, { touches: [{ clientX: 180, clientY: 0 }] }); // dx=-20 < 80
    fireEvent.touchEnd(el);
    expect(onSwipeLeft).not.toHaveBeenCalled();
  });

  it("fires onSwipeDown on vertical down swipe past threshold", () => {
    const onSwipeDown = vi.fn();
    const onSwipeUp = vi.fn();
    const { container } = render(
      <SwipeActions
        onSwipeDown={onSwipeDown}
        onSwipeUp={onSwipeUp}
        threshold={80}
      >
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: 200 }] });
    fireEvent.touchEnd(el);
    expect(onSwipeDown).toHaveBeenCalled();
    expect(onSwipeUp).not.toHaveBeenCalled();
  });

  it("fires onSwipeUp on vertical up swipe past threshold", () => {
    const onSwipeUp = vi.fn();
    const { container } = render(
      <SwipeActions onSwipeUp={onSwipeUp} threshold={80}>
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 200 }] });
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchEnd(el);
    expect(onSwipeUp).toHaveBeenCalled();
  });

  it("uses custom action color when provided", () => {
    const { container } = render(
      <SwipeActions
        threshold={80}
        rightAction={{
          label: "Custom",
          color: "#123456",
          onClick: () => {},
        }}
      >
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(el, { touches: [{ clientX: 100, clientY: 0 }] });
    const actionEl = container.querySelector(
      '[style*="background-color"]',
    ) as HTMLElement;
    expect(actionEl).not.toBeNull();
    expect(actionEl.style.backgroundColor).toBe("rgb(18, 52, 86)");
  });

  it("renders action icon when provided", () => {
    const { container } = render(
      <SwipeActions
        threshold={80}
        rightAction={{
          label: "Del",
          icon: <span data-testid="act-icon">★</span>,
          onClick: () => {},
        }}
      >
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(el, { touches: [{ clientX: 100, clientY: 0 }] });
    expect(screen.getByTestId("act-icon")).toBeDefined();
  });

  it("no action panel shown when delta small (< 20)", () => {
    const { container } = render(
      <SwipeActions
        threshold={80}
        rightAction={{ label: "Hidden", onClick: () => {} }}
      >
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(el, { touches: [{ clientX: 10, clientY: 0 }] }); // delta 10 < 20
    expect(screen.queryByText("Hidden")).toBeNull();
  });

  it("applies custom className and forwards div props", () => {
    const { container } = render(
      <SwipeActions className="swipe-custom" data-testid="root">
        x
      </SwipeActions>,
    );
    const root = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    expect(root.className).toContain("swipe-custom");
    expect(root.getAttribute("data-testid")).toBe("root");
  });

  it("touchEnd with delta zero resets without firing", () => {
    const onSwipeRight = vi.fn();
    const { container } = render(
      <SwipeActions onSwipeRight={onSwipeRight} threshold={80}>
        x
      </SwipeActions>,
    );
    const el = container.querySelector(
      '[data-slot="swipe-actions"]',
    ) as HTMLElement;
    // touchStart then touchEnd with no move (delta stays 0)
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchEnd(el);
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-swipe-actions");
    expect(mod.SwipeActions).toBeDefined();
  });
});
