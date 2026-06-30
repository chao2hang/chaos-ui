import { describe, it, expect } from "vitest";
import { WaterfallChart } from "./waterfall-chart";
import type { WaterfallChartProps } from "./waterfall-chart";

describe("waterfall-chart", () => {
  it("exports WaterfallChart", () => {
    expect(WaterfallChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WaterfallChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
