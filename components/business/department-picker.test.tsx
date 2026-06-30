import { describe, it, expect } from "vitest";
import { DepartmentPicker } from "./department-picker";
import type { DepartmentPickerProps } from "./department-picker";

describe("department-picker", () => {
  it("exports DepartmentPicker", () => {
    expect(DepartmentPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DepartmentPickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
