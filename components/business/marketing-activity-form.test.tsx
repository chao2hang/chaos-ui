import { describe, it, expect } from "vitest";
import { MarketingActivityForm } from "./marketing-activity-form";
import type { MarketingActivityFormProps } from "./marketing-activity-form";

describe("marketing-activity-form", () => {
  it("exports MarketingActivityForm", () => {
    expect(MarketingActivityForm).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MarketingActivityFormProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
