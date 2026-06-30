import { describe, it, expect } from "vitest";
import { Descriptions, DescriptionsItem } from "./descriptions";
import type { DescriptionsProps, DescriptionItem } from "./descriptions";

describe("descriptions", () => {
  it("exports Descriptions", () => {
    expect(Descriptions).toBeDefined();
  });

  it("exports DescriptionsItem", () => {
    expect(DescriptionsItem).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DescriptionsProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: DescriptionItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
