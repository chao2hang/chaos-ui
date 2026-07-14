import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BarChart } from "./bar-chart";
import type { BarChartProps } from "./bar-chart";
import { formatNumber } from "@/lib/format";

describe("BarChart", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders bar labels", () => {
    render(
      <BarChart
        data={[
          { label: "Q1", value: 30 },
          { label: "Q2", value: 60 },
        ]}
      />,
    );
    expect(screen.getByText("Q1")).toBeDefined();
    expect(screen.getByText("Q2")).toBeDefined();
  });

  it("renders horizontal orientation labels", () => {
    render(
      <BarChart
        orientation="horizontal"
        data={[{ label: "Alpha", value: 5 }]}
      />,
    );
    expect(screen.getByText("Alpha")).toBeDefined();
  });

  it("exports types", () => {
    const _t: BarChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });

  it("shows vertical tooltip on pointer move (issue #22)", () => {
    const { container } = render(
      <BarChart
        data={[
          { label: "Q1", value: 30, color: "#3b82f6" },
          { label: "Q2", value: 60, color: "#10b981" },
        ]}
      />,
    );
    const plot = container.querySelector(
      '[data-slot="bar-chart-plot"]',
    ) as HTMLElement;
    expect(plot).not.toBeNull();
    // viewWidth for 2 bars: 2*(36+16)+16 = 120
    vi.spyOn(plot, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 200,
      right: 120,
      width: 120,
      height: 200,
      toJSON() {
        return {};
      },
    });
    fireEvent.pointerMove(plot, { clientX: 34, clientY: 40 });
    const tooltip = container.querySelector('[data-slot="bar-chart-tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(tooltip?.textContent).toContain("Q1");
    expect(tooltip?.textContent).toContain(formatNumber(30));
  });

  it("does not show tooltip when showTooltip is false", () => {
    const { container } = render(
      <BarChart data={[{ label: "Q1", value: 30 }]} showTooltip={false} />,
    );
    const plot = container.querySelector(
      '[data-slot="bar-chart-plot"]',
    ) as HTMLElement;
    vi.spyOn(plot, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 200,
      right: 120,
      width: 120,
      height: 200,
      toJSON() {
        return {};
      },
    });
    fireEvent.pointerMove(plot, { clientX: 34, clientY: 40 });
    expect(
      container.querySelector('[data-slot="bar-chart-tooltip"]'),
    ).toBeNull();
  });
});
