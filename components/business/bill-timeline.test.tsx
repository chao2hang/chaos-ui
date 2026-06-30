import { describe, it, expect } from "vitest";
import { BillTimeline } from "./bill-timeline";
import type { BillTimelineProps } from "./bill-timeline";

describe("bill-timeline", () => {
  it("exports BillTimeline", () => {
    expect(BillTimeline).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BillTimelineProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
