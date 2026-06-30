import { describe, it, expect } from "vitest";
import { MobileActionSheet } from "./mobile-action-sheet";
import type { MobileActionSheetProps } from "./mobile-action-sheet";

describe("mobile-action-sheet", () => {
  it("exports MobileActionSheet", () => {
    expect(MobileActionSheet).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobileActionSheetProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
