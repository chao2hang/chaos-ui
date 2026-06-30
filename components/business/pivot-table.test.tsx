import { describe, it, expect } from "vitest";
import { PivotTable } from "./pivot-table";
import type { Aggregation } from "./pivot-table";

describe("pivot-table", () => {
  it("exports PivotTable", () => {
    expect(PivotTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: Aggregation | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
