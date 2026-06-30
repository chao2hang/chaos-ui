import { describe, it, expect } from "vitest";
import { TreemapChart } from "./treemap-chart";
import type { TreemapChartProps } from "./treemap-chart";

describe("treemap-chart", () => {
  it("exports TreemapChart", () => {
    expect(TreemapChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TreemapChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
