import { describe, it, expect } from "vitest";
import { BillHeader } from "./bill-header";
import type { BillHeaderProps, BillHeaderField } from "./bill-header";

describe("bill-header", () => {
  it("exports BillHeader", () => {
    expect(BillHeader).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BillHeaderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: BillHeaderField | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
