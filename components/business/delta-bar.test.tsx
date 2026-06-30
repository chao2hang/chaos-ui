import { describe, it, expect } from "vitest";
import { DeltaBar } from "./delta-bar";
import type { DeltaBarProps } from "./delta-bar";

describe("delta-bar", () => {
  it("exports DeltaBar", () => {
    expect(DeltaBar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DeltaBarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
