import { describe, it, expect } from "vitest";
import { TargetProgress } from "./target-progress";
import type { TargetProgressProps } from "./target-progress";

describe("target-progress", () => {
  it("exports TargetProgress", () => {
    expect(TargetProgress).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TargetProgressProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
