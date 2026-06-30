import { describe, it, expect } from "vitest";
import { BarcodeDisplay } from "./barcode-display";
import type { BarcodeDisplayProps } from "./barcode-display";

describe("barcode-display", () => {
  it("exports BarcodeDisplay", () => {
    expect(BarcodeDisplay).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BarcodeDisplayProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
