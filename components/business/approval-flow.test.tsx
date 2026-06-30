import { describe, it, expect } from "vitest";
import { ApprovalFlow } from "./approval-flow";
import type { ApprovalFlowProps } from "./approval-flow";

describe("approval-flow", () => {
  it("exports ApprovalFlow", () => {
    expect(ApprovalFlow).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ApprovalFlowProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
