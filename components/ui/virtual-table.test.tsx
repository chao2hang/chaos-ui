import { describe, it, expect } from "vitest";
import { VirtualTable } from "./virtual-table";
import type { ColumnDef, VirtualTableProps } from "./virtual-table";

describe("virtual-table", () => {
  it("exports VirtualTable", () => {
    expect(VirtualTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ColumnDef<unknown> | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: VirtualTableProps<unknown> | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
