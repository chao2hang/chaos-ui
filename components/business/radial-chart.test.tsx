import { describe, it, expect } from "vitest";
import { RadialChart } from "./radial-chart";
import type { RadialChartProps } from "./radial-chart";

describe("radial-chart", () => {
  it("exports RadialChart", () => {
    expect(RadialChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: RadialChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
