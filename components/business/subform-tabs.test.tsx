import { describe, it, expect } from "vitest";
import { SubformTabs } from "./subform-tabs";
import type { SubformTabsProps } from "./subform-tabs";

describe("subform-tabs", () => {
  it("exports SubformTabs", () => {
    expect(SubformTabs).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SubformTabsProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
