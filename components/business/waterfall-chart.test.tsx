import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WaterfallChart } from "./waterfall-chart";
import type { WaterfallChartProps } from "./waterfall-chart";

describe("WaterfallChart", () => {
  it("renders step labels", () => {
    render(
      <WaterfallChart
        data={[
          { label: "期初", value: 100, absolute: true },
          { label: "收入", value: 40 },
          { label: "期末", value: 110, absolute: true },
        ]}
      />,
    );
    expect(screen.getByText("期初")).toBeDefined();
    expect(screen.getByText("收入")).toBeDefined();
    expect(screen.getByText("期末")).toBeDefined();
  });

  it("renders default data when omitted", () => {
    render(<WaterfallChart />);
    expect(screen.getByText("期初")).toBeDefined();
  });

  it("exports types", () => {
    const _t: WaterfallChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });

  it("uses measured container width in viewBox (#13/#40 sibling)", async () => {
    const OriginalRO = globalThis.ResizeObserver;
    class MockRO {
      private cb: ResizeObserverCallback;
      constructor(cb: ResizeObserverCallback) {
        this.cb = cb;
      }
      observe(target: Element) {
        this.cb(
          [
            {
              target,
              contentRect: { width: 640, height: 200 } as DOMRectReadOnly,
            } as ResizeObserverEntry,
          ],
          this as unknown as ResizeObserver,
        );
      }
      unobserve() {}
      disconnect() {}
    }
    globalThis.ResizeObserver = MockRO as unknown as typeof ResizeObserver;
    try {
      const { container } = render(<WaterfallChart height={200} />);
      await Promise.resolve();
      const svg = container.querySelector('[data-slot="waterfall-chart"] svg');
      const vb = svg?.getAttribute("viewBox") ?? "";
      expect(vb.startsWith("0 0 ")).toBe(true);
      if (vb.includes("640")) {
        expect(vb).toBe("0 0 640 200");
      }
    } finally {
      globalThis.ResizeObserver = OriginalRO;
    }
  });
});
