import { describe, it, expect } from "vitest";
import { CompanyBrowse } from "./company-browse";
import type { CompanyBrowseProps } from "./company-browse";

describe("company-browse", () => {
  it("exports CompanyBrowse", () => {
    expect(CompanyBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CompanyBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
