import { describe, it, expect } from "vitest";
import { InvoiceManager } from "./invoice-manager";
import type { InvoiceManagerProps } from "./invoice-manager";

describe("invoice-manager", () => {
  it("exports InvoiceManager", () => {
    expect(InvoiceManager).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: InvoiceManagerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
