import { describe, it, expect } from "vitest";
import { FunnelChart } from "./funnel-chart";
import type { FunnelChartProps } from "./funnel-chart";

describe("funnel-chart", () => {
  it("exports FunnelChart", () => {
    expect(FunnelChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FunnelChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
