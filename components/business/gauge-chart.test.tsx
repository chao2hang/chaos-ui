import { describe, it, expect } from "vitest";
import { GaugeChart } from "./gauge-chart";
import type { GaugeChartProps } from "./gauge-chart";

describe("gauge-chart", () => {
  it("exports GaugeChart", () => {
    expect(GaugeChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: GaugeChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
