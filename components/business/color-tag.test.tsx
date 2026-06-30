import { describe, it, expect } from "vitest";
import { ColorTag, colorConfig } from "./color-tag";
import type { ColorTagProps, ColorTagColor } from "./color-tag";

describe("color-tag", () => {
  it("exports ColorTag", () => {
    expect(ColorTag).toBeDefined();
  });

  it("exports colorConfig", () => {
    expect(colorConfig).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ColorTagProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ColorTagColor | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
