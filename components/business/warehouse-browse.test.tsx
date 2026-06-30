import { describe, it, expect } from "vitest";
import { WarehouseBrowse } from "./warehouse-browse";
import type { WarehouseBrowseProps } from "./warehouse-browse";

describe("warehouse-browse", () => {
  it("exports WarehouseBrowse", () => {
    expect(WarehouseBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WarehouseBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
