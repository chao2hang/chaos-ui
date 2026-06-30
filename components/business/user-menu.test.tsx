import { describe, it, expect } from "vitest";
import { UserMenu } from "./user-menu";
import type { UserMenuUser, UserMenuAction } from "./user-menu";

describe("user-menu", () => {
  it("exports UserMenu", () => {
    expect(UserMenu).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: UserMenuUser | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: UserMenuAction | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
