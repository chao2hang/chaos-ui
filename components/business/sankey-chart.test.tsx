import { describe, it, expect } from "vitest";
import { SankeyChart } from "./sankey-chart";
import type { SankeyChartProps } from "./sankey-chart";

describe("sankey-chart", () => {
  it("exports SankeyChart", () => {
    expect(SankeyChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SankeyChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
