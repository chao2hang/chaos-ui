import { describe, it, expect } from "vitest";
import { FlowTracker } from "./flow-tracker";
import type { FlowTrackerProps } from "./flow-tracker";

describe("flow-tracker", () => {
  it("exports FlowTracker", () => {
    expect(FlowTracker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FlowTrackerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
