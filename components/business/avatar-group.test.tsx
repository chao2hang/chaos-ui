import { describe, it, expect } from "vitest";
import { AvatarGroup } from "./avatar-group";
import type { AvatarUser } from "./avatar-group";

describe("avatar-group", () => {
  it("exports AvatarGroup", () => {
    expect(AvatarGroup).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AvatarUser | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
