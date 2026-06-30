import { describe, it, expect } from "vitest";
import { ProductCategoryPicker } from "./product-category-picker";
import type { ProductCategoryPickerProps } from "./product-category-picker";

describe("product-category-picker", () => {
  it("exports ProductCategoryPicker", () => {
    expect(ProductCategoryPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ProductCategoryPickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
