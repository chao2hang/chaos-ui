import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { PullToRefresh } from "@/components/mobile/mobile-pull-to-refresh";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("PullToRefresh", () => {
  it("renders children", () => {
    const { container, getByText } = render(
      <PullToRefresh onRefresh={() => {}}>
        <div>content</div>
      </PullToRefresh>,
    );
    expect(container.querySelector('[data-slot="pull-to-refresh"]')).not.toBeNull();
    expect(getByText("content")).toBeTruthy();
  });

  it("triggers onRefresh when pull exceeds threshold", async () => {
    const onRefresh = vi.fn(async () => {});
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} threshold={60}>
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector('[data-slot="pull-to-refresh"]') as HTMLElement;

    // Simulate touch sequence: start at top, move down past threshold, end.
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 200 }] });
    fireEvent.touchEnd(el);

    // onRefresh should have been called (distance 100*0.5=50? no, 200-100=100, *0.5=50 < 60).
    // Move further to exceed threshold.
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 250 }] }); // dy=150, *0.5=75 >= 60
    fireEvent.touchEnd(el);

    expect(onRefresh).toHaveBeenCalled();
  });

  it("does not trigger onRefresh when pull is below threshold", () => {
    const onRefresh = vi.fn();
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} threshold={60}>
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector('[data-slot="pull-to-refresh"]') as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 120 }] }); // dy=20, *0.5=10 < 60
    fireEvent.touchEnd(el);
    expect(onRefresh).not.toHaveBeenCalled();
  });
});
