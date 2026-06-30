import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobilePullRefresh } from "./mobile-pull-refresh";

describe("MobilePullRefresh", () => {
  it("renders children", () => {
    render(
      <MobilePullRefresh>
        <div>content</div>
      </MobilePullRefresh>,
    );
    expect(screen.getByText("content")).toBeDefined();
  });

  it("shows a refresh indicator when refreshing=true", () => {
    const { container } = render(
      <MobilePullRefresh refreshing onRefresh={() => {}}>
        <div>content</div>
      </MobilePullRefresh>,
    );
    expect(
      container.querySelector('[data-slot="mobile-pull-refresh-spinner"]'),
    ).not.toBeNull();
  });

  it("does not show spinner when not refreshing", () => {
    const { container } = render(
      <MobilePullRefresh refreshing={false}>
        <div>content</div>
      </MobilePullRefresh>,
    );
    expect(
      container.querySelector('[data-slot="mobile-pull-refresh-spinner"]'),
    ).toBeNull();
  });

  it("calls onRefresh after a pull past threshold (touch simulation)", () => {
    const handleRefresh = vi.fn();
    const { container } = render(
      <MobilePullRefresh onRefresh={handleRefresh} threshold={60}>
        <div>content</div>
      </MobilePullRefresh>,
    );
    const root = container.querySelector(
      '[data-slot="mobile-pull-refresh"]',
    ) as HTMLElement;
    // simulate a pull of 100px past the 60px threshold
    fireEvent.touchStart(root, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(root, { touches: [{ clientY: 100 }] });
    fireEvent.touchEnd(root);
    expect(handleRefresh).toHaveBeenCalled();
  });

  it("does not call onRefresh when pull is below threshold", () => {
    const handleRefresh = vi.fn();
    const { container } = render(
      <MobilePullRefresh onRefresh={handleRefresh} threshold={60}>
        <div>content</div>
      </MobilePullRefresh>,
    );
    const root = container.querySelector(
      '[data-slot="mobile-pull-refresh"]',
    ) as HTMLElement;
    fireEvent.touchStart(root, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(root, { touches: [{ clientY: 30 }] });
    fireEvent.touchEnd(root);
    expect(handleRefresh).not.toHaveBeenCalled();
  });
});
