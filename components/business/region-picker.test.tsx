import { describe, it, expect } from "vitest";
import { RegionPicker } from "./region-picker";
import type { RegionPickerProps } from "./region-picker";

describe("region-picker", () => {
  it("exports RegionPicker", () => {
    expect(RegionPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: RegionPickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
