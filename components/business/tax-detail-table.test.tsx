import { describe, it, expect } from "vitest";
import { TaxDetailTable } from "./tax-detail-table";
import type { TaxDetailTableProps } from "./tax-detail-table";

describe("tax-detail-table", () => {
  it("exports TaxDetailTable", () => {
    expect(TaxDetailTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TaxDetailTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
