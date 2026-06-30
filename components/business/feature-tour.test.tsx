import { describe, it, expect } from "vitest";
import { FeatureTour } from "./feature-tour";
import type { FeatureTourProps } from "./feature-tour";

describe("feature-tour", () => {
  it("exports FeatureTour", () => {
    expect(FeatureTour).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FeatureTourProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
