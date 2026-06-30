import { describe, it, expect } from "vitest";
import { MobileSwipeAction } from "./mobile-swipe-action";
import type { MobileSwipeActionProps } from "./mobile-swipe-action";

describe("mobile-swipe-action", () => {
  it("exports MobileSwipeAction", () => {
    expect(MobileSwipeAction).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobileSwipeActionProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
