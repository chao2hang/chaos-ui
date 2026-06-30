import { describe, it, expect } from "vitest";
import { CustomerPicker } from "./customer-picker";
import type { CustomerPickerProps } from "./customer-picker";

describe("customer-picker", () => {
  it("exports CustomerPicker", () => {
    expect(CustomerPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CustomerPickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
