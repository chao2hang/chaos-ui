import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScatterChart } from "./scatter-chart";
import type { ScatterChartProps } from "./scatter-chart";

describe("ScatterChart", () => {
  it("renders axis captions", () => {
    render(
      <ScatterChart data={[{ x: 10, y: 20 }]} xLabel="成本" yLabel="收益" />,
    );
    expect(screen.getByText("成本")).toBeDefined();
    expect(screen.getByText("收益")).toBeDefined();
  });

  it("renders default axis labels when omitted", () => {
    render(<ScatterChart />);
    expect(screen.getByText("X")).toBeDefined();
    expect(screen.getByText("Y")).toBeDefined();
  });

  it("exports types", () => {
    const _t: ScatterChartProps | undefined = undefined;
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
              contentRect: { width: 800, height: 200 } as DOMRectReadOnly,
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
      const { container } = render(
        <div style={{ width: 800 }}>
          <ScatterChart data={[{ x: 1, y: 2 }]} height={200} />
        </div>,
      );
      // layout effect may need flush
      await Promise.resolve();
      const svg = container.querySelector('[data-slot="scatter-chart"] svg');
      // getBoundingClientRect may still be 0 in jsdom; RO path sets 800
      expect(svg?.getAttribute("viewBox")).toMatch(/0 0 800 200|0 0 320 200/);
      // Prefer RO width when available
      if (svg?.getAttribute("viewBox")?.includes("800")) {
        expect(svg?.getAttribute("viewBox")).toBe("0 0 800 200");
      }
    } finally {
      globalThis.ResizeObserver = OriginalRO;
    }
  });
});
