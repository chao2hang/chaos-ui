import { describe, it, expect } from "vitest";
import { UserBrowse } from "./user-browse";
import type { User, UserBrowseProps } from "./user-browse";

describe("user-browse", () => {
  it("exports UserBrowse", () => {
    expect(UserBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: User | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: UserBrowseProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
