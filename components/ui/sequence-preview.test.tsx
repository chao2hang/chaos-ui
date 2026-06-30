import { describe, it, expect } from "vitest";
import { SequencePreview } from "./sequence-preview";
import type { SequencePreviewProps } from "./sequence-preview";

describe("sequence-preview", () => {
  it("exports SequencePreview", () => {
    expect(SequencePreview).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SequencePreviewProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
