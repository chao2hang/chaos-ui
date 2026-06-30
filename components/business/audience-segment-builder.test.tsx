import { describe, it, expect } from "vitest";
import { AudienceSegmentBuilder } from "./audience-segment-builder";
import type { AudienceSegmentBuilderProps } from "./audience-segment-builder";

describe("audience-segment-builder", () => {
  it("exports AudienceSegmentBuilder", () => {
    expect(AudienceSegmentBuilder).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AudienceSegmentBuilderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
