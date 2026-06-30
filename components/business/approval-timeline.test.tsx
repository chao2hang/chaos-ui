import { describe, it, expect } from "vitest";
import { ApprovalTimeline } from "./approval-timeline";
import type {
  ApprovalStepStatus,
  ApprovalStep,
  ApprovalTimelineTexts,
  ApprovalTimelineProps,
} from "./approval-timeline";

describe("approval-timeline", () => {
  it("exports ApprovalTimeline", () => {
    expect(ApprovalTimeline).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ApprovalStepStatus | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ApprovalStep | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: ApprovalTimelineTexts | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: ApprovalTimelineProps | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });
});
