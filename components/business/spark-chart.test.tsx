import { describe, it, expect } from "vitest";
import { SparkChart } from "./spark-chart";
import type { SparkChartProps } from "./spark-chart";

describe("spark-chart", () => {
  it("exports SparkChart", () => {
    expect(SparkChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SparkChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
