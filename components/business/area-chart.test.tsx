import { describe, it, expect } from "vitest";
import { AreaChart } from "./area-chart";
import type { AreaChartProps } from "./area-chart";

describe("area-chart", () => {
  it("exports AreaChart", () => {
    expect(AreaChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AreaChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
