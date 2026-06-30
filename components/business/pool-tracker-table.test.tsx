import { describe, it, expect } from "vitest";
import { PoolTrackerTable } from "./pool-tracker-table";
import type { PoolTrackerTableProps } from "./pool-tracker-table";

describe("pool-tracker-table", () => {
  it("exports PoolTrackerTable", () => {
    expect(PoolTrackerTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PoolTrackerTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
