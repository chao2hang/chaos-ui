import { describe, it, expect } from "vitest";
import { DonutChart } from "./donut-chart";
import type { DonutChartProps } from "./donut-chart";

describe("donut-chart", () => {
  it("exports DonutChart", () => {
    expect(DonutChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DonutChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
