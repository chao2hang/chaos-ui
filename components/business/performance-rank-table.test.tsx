import { describe, it, expect } from "vitest";
import { PerformanceRankTable } from "./performance-rank-table";
import type { PerformanceRankTableProps } from "./performance-rank-table";

describe("performance-rank-table", () => {
  it("exports PerformanceRankTable", () => {
    expect(PerformanceRankTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PerformanceRankTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
