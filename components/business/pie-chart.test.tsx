import { describe, it, expect } from "vitest";
import { PieChart } from "./pie-chart";
import type { PieChartProps } from "./pie-chart";

describe("pie-chart", () => {
  it("exports PieChart", () => {
    expect(PieChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PieChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
