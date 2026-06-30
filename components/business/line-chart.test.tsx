import { describe, it, expect } from "vitest";
import { LineChart } from "./line-chart";
import type { LineChartProps } from "./line-chart";

describe("line-chart", () => {
  it("exports LineChart", () => {
    expect(LineChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: LineChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
