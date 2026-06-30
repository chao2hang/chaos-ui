import { describe, it, expect } from "vitest";
import { ScatterChart } from "./scatter-chart";
import type { ScatterChartProps } from "./scatter-chart";

describe("scatter-chart", () => {
  it("exports ScatterChart", () => {
    expect(ScatterChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ScatterChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
