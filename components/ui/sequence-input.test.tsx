import { describe, it, expect } from "vitest";
import { SequenceInput } from "./sequence-input";
import type { SequenceInputProps } from "./sequence-input";

describe("sequence-input", () => {
  it("exports SequenceInput", () => {
    expect(SequenceInput).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SequenceInputProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
