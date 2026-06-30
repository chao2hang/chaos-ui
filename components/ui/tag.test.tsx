import { describe, it, expect } from "vitest";
import { Tag, TagGroup } from "./tag";
import type { TagProps, TagColor } from "./tag";

describe("tag", () => {
  it("exports Tag", () => {
    expect(Tag).toBeDefined();
  });

  it("exports TagGroup", () => {
    expect(TagGroup).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TagProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: TagColor | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
