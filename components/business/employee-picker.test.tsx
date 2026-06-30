import { describe, it, expect } from "vitest";
import { EmployeePicker } from "./employee-picker";
import type { EmployeePickerProps } from "./employee-picker";

describe("employee-picker", () => {
  it("exports EmployeePicker", () => {
    expect(EmployeePicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: EmployeePickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
