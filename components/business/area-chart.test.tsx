import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AreaChart } from "./area-chart";
import type { AreaChartProps } from "./area-chart";
import { formatNumber } from "@/lib/format";

describe("AreaChart", () => {
  it("renders x-axis labels from data", () => {
    render(<AreaChart data={[10, 40, 25]} labels={["一", "二", "三"]} />);
    expect(screen.getByText("一")).toBeDefined();
    expect(screen.getByText("二")).toBeDefined();
    expect(screen.getByText("三")).toBeDefined();
  });

  it("renders default labels when omitted", () => {
    render(<AreaChart />);
    expect(screen.getByText("日")).toBeDefined();
  });

  it("exports types", () => {
    const _t: AreaChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });

  it("maps CSS var token colors to concrete SVG strokes (CUI-DASH-01)", () => {
    const { container } = render(
      <AreaChart
        data={[10, 20, 30]}
        labels={["a", "b", "c"]}
        color="var(--color-primary)"
        gradient={false}
      />,
    );
    const strokePath = container.querySelector(
      'path[stroke]:not([stroke="none"])',
    ) as SVGPathElement | null;
    expect(strokePath).not.toBeNull();
    expect(strokePath?.getAttribute("stroke")).toBe("#3b82f6");
    expect(strokePath?.getAttribute("stroke") ?? "").not.toContain("var(");
  });

  it("defaults to palette color instead of currentColor", () => {
    const { container } = render(
      <AreaChart data={[1, 2, 3]} labels={["a", "b", "c"]} gradient={false} />,
    );
    const strokePath = container.querySelector(
      'path[stroke]:not([stroke="none"])',
    ) as SVGPathElement | null;
    expect(strokePath?.getAttribute("stroke")).toBe("#3b82f6");
  });

  it("uses measured container width in viewBox so wide cards fill (issue #13)", () => {
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
              contentRect: {
                width: 800,
                height: 260,
                top: 0,
                left: 0,
                bottom: 260,
                right: 800,
                x: 0,
                y: 0,
                toJSON() {
                  return {};
                },
              },
              borderBoxSize: [],
              contentBoxSize: [],
              devicePixelContentBoxSize: [],
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
        <AreaChart
          data={[1, 2, 3, 4, 5, 6]}
          labels={["1月", "2月", "3月", "4月", "5月", "6月"]}
          height={260}
          gradient={false}
        />,
      );
      const svg = container.querySelector("svg");
      expect(svg?.getAttribute("viewBox")).toBe("0 0 800 260");
    } finally {
      globalThis.ResizeObserver = OriginalRO;
    }
  });

  it("keeps legend and x-axis labels on separate rows (issue #13)", () => {
    const { container } = render(
      <AreaChart
        series={[
          { name: "订单", values: [1, 2, 3], color: "primary" },
          { name: "费用", values: [1, 1, 1], color: "chart-2" },
        ]}
        labels={["1月", "2月", "3月"]}
        gradient={false}
      />,
    );
    const legend = container.querySelector('[data-slot="area-chart-legend"]');
    const axis = container.querySelector('[data-slot="area-chart-axis"]');
    expect(legend).not.toBeNull();
    expect(axis).not.toBeNull();
    expect(legend?.contains(axis as Node)).toBe(false);
    expect(axis?.contains(legend as Node)).toBe(false);
  });

  it("resolves primary and chart-1 to different stroke colors (issue #14)", () => {
    const { container } = render(
      <AreaChart
        series={[
          { name: "A", values: [1, 2, 3], color: "primary" },
          { name: "B", values: [3, 2, 1], color: "chart-1" },
        ]}
        labels={["a", "b", "c"]}
        gradient={false}
      />,
    );
    const strokes = Array.from(
      container.querySelectorAll('path[stroke]:not([stroke="none"])'),
    ).map((el) => el.getAttribute("stroke"));
    expect(strokes.length).toBeGreaterThanOrEqual(2);
    expect(strokes[0]).toBeTruthy();
    expect(strokes[1]).toBeTruthy();
    expect(strokes[0]).not.toBe(strokes[1]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function mockPlotRect(plot: Element, width = 320, height = 180) {
    vi.spyOn(plot, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: height,
      right: width,
      width,
      height,
      toJSON() {
        return {};
      },
    });
  }

  it("shows multi-series tooltip and crosshair on pointer move (issue #22)", () => {
    const { container } = render(
      <AreaChart
        series={[
          { name: "订单", values: [320000, 280000, 410000], color: "primary" },
          { name: "费用", values: [45000, 38000, 52000], color: "chart-2" },
        ]}
        labels={["1月", "2月", "3月"]}
        height={180}
        gradient={false}
      />,
    );
    const plot = container.querySelector(
      '[data-slot="area-chart-plot"]',
    ) as HTMLElement;
    expect(plot).not.toBeNull();
    mockPlotRect(plot, 320, 180);

    // index 0 ≈ pad (8) in viewBox units with 1:1 mock rect
    fireEvent.pointerMove(plot, { clientX: 8, clientY: 40 });

    const tooltip = container.querySelector('[data-slot="area-chart-tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(tooltip?.textContent).toContain("1月");
    expect(tooltip?.textContent).toContain("订单");
    expect(tooltip?.textContent).toContain("费用");
    expect(tooltip?.textContent).toContain(formatNumber(320000));
    expect(tooltip?.textContent).toContain(formatNumber(45000));

    const crosshair = container.querySelector(
      '[data-slot="area-chart-crosshair"]',
    );
    expect(crosshair).not.toBeNull();
  });

  it("clears tooltip on pointer leave", () => {
    const { container } = render(
      <AreaChart
        series={[{ name: "A", values: [1, 2, 3], color: "primary" }]}
        labels={["a", "b", "c"]}
        gradient={false}
      />,
    );
    const plot = container.querySelector(
      '[data-slot="area-chart-plot"]',
    ) as HTMLElement;
    mockPlotRect(plot);
    fireEvent.pointerMove(plot, { clientX: 8, clientY: 20 });
    expect(
      container.querySelector('[data-slot="area-chart-tooltip"]'),
    ).not.toBeNull();
    fireEvent.pointerLeave(plot);
    expect(
      container.querySelector('[data-slot="area-chart-tooltip"]'),
    ).toBeNull();
  });

  it("does not show tooltip when showTooltip is false", () => {
    const { container } = render(
      <AreaChart
        series={[{ name: "A", values: [1, 2, 3], color: "primary" }]}
        labels={["a", "b", "c"]}
        showTooltip={false}
        gradient={false}
      />,
    );
    const plot = container.querySelector(
      '[data-slot="area-chart-plot"]',
    ) as HTMLElement;
    mockPlotRect(plot);
    fireEvent.pointerMove(plot, { clientX: 8, clientY: 20 });
    expect(
      container.querySelector('[data-slot="area-chart-tooltip"]'),
    ).toBeNull();
  });
});
