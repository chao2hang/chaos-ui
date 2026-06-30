import { describe, it, expect } from "vitest";
import { ChartCard } from "./chart-card";
import type { ChartCardProps } from "./chart-card";

describe("chart-card", () => {
  it("exports ChartCard", () => {
    expect(ChartCard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChartCardProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
