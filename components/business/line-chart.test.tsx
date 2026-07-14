import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LineChart } from "./line-chart";
import type { LineChartProps } from "./line-chart";
import { formatNumber } from "@/lib/format";

describe("LineChart", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders series name and labels", () => {
    render(
      <LineChart
        series={[{ name: "营收", values: [10, 30, 20] }]}
        labels={["Q1", "Q2", "Q3"]}
      />,
    );
    expect(screen.getByText("营收")).toBeDefined();
    expect(screen.getByText("Q1")).toBeDefined();
    expect(screen.getByText("Q3")).toBeDefined();
  });

  it("renders default series when omitted", () => {
    render(<LineChart />);
    expect(screen.getByText("营收")).toBeDefined();
  });

  it("exports types", () => {
    const _t: LineChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });

  it("shows multi-series tooltip on pointer move (issue #22)", () => {
    const { container } = render(
      <LineChart
        series={[
          { name: "订单", values: [10, 20, 30], color: "#3b82f6" },
          { name: "费用", values: [4, 5, 6], color: "#10b981" },
        ]}
        labels={["1月", "2月", "3月"]}
      />,
    );
    const plot = container.querySelector(
      '[data-slot="line-chart-plot"]',
    ) as HTMLElement;
    expect(plot).not.toBeNull();
    vi.spyOn(plot, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 180,
      right: 320,
      width: 320,
      height: 180,
      toJSON() {
        return {};
      },
    });
    fireEvent.pointerMove(plot, { clientX: 8, clientY: 40 });
    const tooltip = container.querySelector('[data-slot="line-chart-tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(tooltip?.textContent).toContain("1月");
    expect(tooltip?.textContent).toContain("订单");
    expect(tooltip?.textContent).toContain("费用");
    expect(tooltip?.textContent).toContain(formatNumber(10));
    expect(tooltip?.textContent).toContain(formatNumber(4));
  });

  it("does not show tooltip when showTooltip is false", () => {
    const { container } = render(
      <LineChart
        series={[{ name: "A", values: [1, 2, 3] }]}
        labels={["a", "b", "c"]}
        showTooltip={false}
      />,
    );
    const plot = container.querySelector(
      '[data-slot="line-chart-plot"]',
    ) as HTMLElement;
    vi.spyOn(plot, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 180,
      right: 320,
      width: 320,
      height: 180,
      toJSON() {
        return {};
      },
    });
    fireEvent.pointerMove(plot, { clientX: 8, clientY: 20 });
    expect(
      container.querySelector('[data-slot="line-chart-tooltip"]'),
    ).toBeNull();
  });
});
