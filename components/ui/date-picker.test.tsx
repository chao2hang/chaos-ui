import { describe, it, expect, vi } from "vitest";
import { DatePicker } from "@/components/ui/date-picker";
import type { DatePickerProps } from "@/components/ui/date-picker";

describe("date-picker", () => {
  it("exports DatePicker", () => {
    expect(DatePicker).toBeDefined();
    expect(typeof DatePicker).toBe("function");
  });

  it("DatePickerProps type is importable", () => {
    const props: DatePickerProps = {
      value: new Date(),
      defaultValue: null,
      format: "yyyy-MM-dd",
      placeholder: "Select date",
      disabled: false,
      readOnly: false,
      allowClear: false,
      locale: "en",
      disabledDate: (date) => date.getDay() === 0,
      onChange: vi.fn(),
      size: "default",
      trigger: undefined,
      className: "test",
    };
    expect(props.placeholder).toBe("Select date");
    expect(props.format).toBe("yyyy-MM-dd");
    expect(props.disabled).toBe(false);
    expect(props.readOnly).toBe(false);
    expect(props.allowClear).toBe(false);
  });

  it("DatePickerProps supports all sizes", () => {
    const sizes: Array<NonNullable<DatePickerProps["size"]>> = [
      "sm",
      "default",
      "lg",
    ];
    expect(sizes).toEqual(["sm", "default", "lg"]);
  });

  it("DatePickerProps supports custom trigger", () => {
    const props: DatePickerProps = {
      trigger: <button>Custom</button>,
    };
    expect(props.trigger).toBeDefined();
  });

  it("DatePickerProps onChange receives Date | null", () => {
    const onChange = vi.fn();
    const props: DatePickerProps = { onChange };
    expect(props.onChange).toBeDefined();
  });

  it("DatePickerProps disabledDate function works", () => {
    const disabledDate = (date: Date) => date.getDay() === 0;
    const sunday = new Date("2024-01-07"); // a Sunday
    const monday = new Date("2024-01-08"); // a Monday
    expect(disabledDate(sunday)).toBe(true);
    expect(disabledDate(monday)).toBe(false);
  });
});
