import { describe, it, expect } from "vitest";
import { HeatmapChart } from "./heatmap-chart";
import type { HeatmapChartProps } from "./heatmap-chart";

describe("heatmap-chart", () => {
  it("exports HeatmapChart", () => {
    expect(HeatmapChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: HeatmapChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
