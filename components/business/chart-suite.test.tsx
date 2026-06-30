import { describe, it, expect } from "vitest";
import { ChartSuite } from "./chart-suite";
import type { ChartSuiteProps } from "./chart-suite";

describe("chart-suite", () => {
  it("exports ChartSuite", () => {
    expect(ChartSuite).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChartSuiteProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
