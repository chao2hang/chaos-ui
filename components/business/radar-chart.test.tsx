import { describe, it, expect } from "vitest";
import { RadarChart } from "./radar-chart";
import type { RadarChartProps } from "./radar-chart";

describe("radar-chart", () => {
  it("exports RadarChart", () => {
    expect(RadarChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: RadarChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
