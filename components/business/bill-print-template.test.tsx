import { describe, it, expect } from "vitest";
import { BillPrintTemplate } from "./bill-print-template";
import type { BillPrintTemplateProps } from "./bill-print-template";

describe("bill-print-template", () => {
  it("exports BillPrintTemplate", () => {
    expect(BillPrintTemplate).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BillPrintTemplateProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
