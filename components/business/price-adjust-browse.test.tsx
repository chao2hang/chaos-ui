import { describe, it, expect } from "vitest";
import { PriceAdjustBrowse } from "./price-adjust-browse";
import type { PriceAdjustBrowseProps } from "./price-adjust-browse";

describe("price-adjust-browse", () => {
  it("exports PriceAdjustBrowse", () => {
    expect(PriceAdjustBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PriceAdjustBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
