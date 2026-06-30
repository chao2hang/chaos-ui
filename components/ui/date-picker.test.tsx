import { describe, it, expect } from "vitest";
import { DatePicker } from "./date-picker";
import type { DatePickerProps } from "./date-picker";

describe("date-picker", () => {
  it("exports DatePicker", () => {
    expect(DatePicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DatePickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
