import { describe, it, expect } from "vitest";
import { MobileTabBar } from "./mobile-tab-bar";
import type { MobileTabBarProps } from "./mobile-tab-bar";

describe("mobile-tab-bar", () => {
  it("exports MobileTabBar", () => {
    expect(MobileTabBar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobileTabBarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
