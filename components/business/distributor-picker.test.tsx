import { describe, it, expect } from "vitest";
import { DistributorPicker } from "./distributor-picker";
import type { DistributorPickerProps } from "./distributor-picker";

describe("distributor-picker", () => {
  it("exports DistributorPicker", () => {
    expect(DistributorPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DistributorPickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
