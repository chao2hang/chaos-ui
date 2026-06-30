import { describe, it, expect } from "vitest";
import { ApprovalActionBar } from "./approval-action-bar";
import type { ApprovalActionBarProps } from "./approval-action-bar";

describe("approval-action-bar", () => {
  it("exports ApprovalActionBar", () => {
    expect(ApprovalActionBar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ApprovalActionBarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
