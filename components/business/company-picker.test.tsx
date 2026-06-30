import { describe, it, expect } from "vitest";
import { CompanyPicker } from "./company-picker";
import type { CompanyPickerProps } from "./company-picker";

describe("company-picker", () => {
  it("exports CompanyPicker", () => {
    expect(CompanyPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CompanyPickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
