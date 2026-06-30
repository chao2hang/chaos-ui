import { describe, it, expect } from "vitest";
import { StatCardWithSparkline } from "./stat-card-with-sparkline";
import type { StatCardWithSparklineProps } from "./stat-card-with-sparkline";

describe("stat-card-with-sparkline", () => {
  it("exports StatCardWithSparkline", () => {
    expect(StatCardWithSparkline).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: StatCardWithSparklineProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
