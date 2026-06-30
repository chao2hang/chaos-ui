import { describe, it, expect } from "vitest";
import { ProductBrowse } from "./product-browse";
import type { ProductBrowseProps } from "./product-browse";

describe("product-browse", () => {
  it("exports ProductBrowse", () => {
    expect(ProductBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ProductBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
