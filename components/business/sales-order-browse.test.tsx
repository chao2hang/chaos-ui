import { describe, it, expect } from "vitest";
import { SalesOrderBrowse } from "./sales-order-browse";
import type { SalesOrderBrowseProps } from "./sales-order-browse";

describe("sales-order-browse", () => {
  it("exports SalesOrderBrowse", () => {
    expect(SalesOrderBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SalesOrderBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
