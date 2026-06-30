import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeatmapChart } from "./heatmap-chart";
import type { HeatmapChartProps } from "./heatmap-chart";

describe("HeatmapChart", () => {
  it("renders column and row headers", () => {
    render(
      <HeatmapChart
        data={[
          { x: "周一", y: "上午", value: 8 },
          { x: "周二", y: "下午", value: 5 },
        ]}
      />,
    );
    expect(screen.getByText("周一")).toBeDefined();
    expect(screen.getByText("周二")).toBeDefined();
    expect(screen.getByText("上午")).toBeDefined();
    expect(screen.getByText("下午")).toBeDefined();
  });

  it("exports types", () => {
    const _t: HeatmapChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
