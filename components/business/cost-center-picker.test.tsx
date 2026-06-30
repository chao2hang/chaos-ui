import { describe, it, expect } from "vitest";
import { CostCenterPicker } from "./cost-center-picker";
import type { CostCenterPickerProps } from "./cost-center-picker";

describe("cost-center-picker", () => {
  it("exports CostCenterPicker", () => {
    expect(CostCenterPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CostCenterPickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
