import { describe, it, expect } from "vitest";
import { SkuPicker } from "./sku-picker";
import type { SkuPickerProps } from "./sku-picker";

describe("sku-picker", () => {
  it("exports SkuPicker", () => {
    expect(SkuPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SkuPickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
