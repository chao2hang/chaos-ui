import { describe, it, expect } from "vitest";
import { BarChart } from "./bar-chart";
import type { BarChartProps } from "./bar-chart";

describe("bar-chart", () => {
  it("exports BarChart", () => {
    expect(BarChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BarChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
