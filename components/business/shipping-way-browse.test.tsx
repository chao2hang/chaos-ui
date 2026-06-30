import { describe, it, expect } from "vitest";
import { ShippingWayBrowse } from "./shipping-way-browse";
import type { ShippingWayBrowseProps } from "./shipping-way-browse";

describe("shipping-way-browse", () => {
  it("exports ShippingWayBrowse", () => {
    expect(ShippingWayBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ShippingWayBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
