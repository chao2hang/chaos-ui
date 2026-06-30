import { describe, it, expect } from "vitest";
import { InvoiceSummary } from "./invoice-summary";
import type { InvoiceSummaryProps } from "./invoice-summary";

describe("invoice-summary", () => {
  it("exports InvoiceSummary", () => {
    expect(InvoiceSummary).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: InvoiceSummaryProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
