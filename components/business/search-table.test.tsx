import { describe, it, expect } from "vitest";
import { SearchTable } from "./search-table";
import type { SearchTableProps, ColumnDef } from "./search-table";

describe("search-table", () => {
  it("exports SearchTable", () => {
    expect(SearchTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SearchTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ColumnDef<unknown> | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
