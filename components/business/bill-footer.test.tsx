import { describe, it, expect } from "vitest";
import { BillFooter } from "./bill-footer";
import type { BillFooterProps } from "./bill-footer";

describe("bill-footer", () => {
  it("exports BillFooter", () => {
    expect(BillFooter).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BillFooterProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
