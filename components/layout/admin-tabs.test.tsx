import { describe, it, expect } from "vitest";
import { AdminTabs } from "./admin-tabs";
import type { AdminTabsProps, TabItem } from "./admin-tabs";

describe("admin-tabs", () => {
  it("exports AdminTabs", () => {
    expect(AdminTabs).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AdminTabsProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: TabItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
