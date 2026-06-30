import { describe, it, expect } from "vitest";
import { FieldMask } from "./field-mask";
import type { FieldMaskProps, MaskRule } from "./field-mask";

describe("field-mask", () => {
  it("exports FieldMask", () => {
    expect(FieldMask).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FieldMaskProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: MaskRule | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
