import { describe, it, expect } from "vitest";
import { TopBar, MegaMenu } from "./top-bar";
import type { TopBarItem } from "./top-bar";

describe("top-bar", () => {
  it("exports TopBar", () => {
    expect(TopBar).toBeDefined();
  });

  it("exports MegaMenu", () => {
    expect(MegaMenu).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TopBarItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
