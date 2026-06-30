import { describe, it, expect } from "vitest";
import { FeeTypeBrowse } from "./fee-type-browse";
import type { FeeTypeBrowseProps } from "./fee-type-browse";

describe("fee-type-browse", () => {
  it("exports FeeTypeBrowse", () => {
    expect(FeeTypeBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FeeTypeBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
