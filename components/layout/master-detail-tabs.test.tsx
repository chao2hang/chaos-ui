import { describe, it, expect } from "vitest";
import { MasterDetailTabs } from "./master-detail-tabs";
import type { MasterDetailTabsProps } from "./master-detail-tabs";

describe("master-detail-tabs", () => {
  it("exports MasterDetailTabs", () => {
    expect(MasterDetailTabs).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MasterDetailTabsProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
