import { describe, it, expect } from "vitest";
import { CustomerBrowse } from "./customer-browse";
import type { CustomerBrowseProps } from "./customer-browse";

describe("customer-browse", () => {
  it("exports CustomerBrowse", () => {
    expect(CustomerBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CustomerBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
