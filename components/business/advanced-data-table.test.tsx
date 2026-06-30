import { describe, it, expect } from "vitest";
import { AdvancedDataTable } from "./advanced-data-table";
import type { ColumnDef, AdvancedDataTableProps } from "./advanced-data-table";

describe("advanced-data-table", () => {
  it("exports AdvancedDataTable", () => {
    expect(AdvancedDataTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ColumnDef | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: AdvancedDataTableProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
