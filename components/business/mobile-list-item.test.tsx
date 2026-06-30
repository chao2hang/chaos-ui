import { describe, it, expect } from "vitest";
import { MobileListItem } from "./mobile-list-item";
import type { MobileListItemProps } from "./mobile-list-item";

describe("mobile-list-item", () => {
  it("exports MobileListItem", () => {
    expect(MobileListItem).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobileListItemProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
