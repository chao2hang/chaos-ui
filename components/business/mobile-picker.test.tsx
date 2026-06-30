import { describe, it, expect } from "vitest";
import { MobilePicker } from "./mobile-picker";
import type { MobilePickerProps } from "./mobile-picker";

describe("mobile-picker", () => {
  it("exports MobilePicker", () => {
    expect(MobilePicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobilePickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
