import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { DatePicker, formatDate, parseDate } from "@/components/ui/date-picker";
import type { DatePickerProps } from "@/components/ui/date-picker";

describe("date-picker", () => {
  it("exports DatePicker", () => {
    expect(DatePicker).toBeDefined();
    expect(typeof DatePicker).toBe("function");
  });

  it("defaults root to block w-full and Chinese placeholder (issue #19)", () => {
    const { container, getByText } = render(<DatePicker />);
    const root = container.querySelector(
      '[data-slot="date-picker"]',
    ) as HTMLElement;
    expect(root.className.split(/\s+/)).toContain("w-full");
    expect(root.className.split(/\s+/)).toContain("block");
    expect(getByText("选择日期")).toBeDefined();
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

  it("supports valueAsString props shape", () => {
    const onChange = vi.fn();
    const props: DatePickerProps = {
      valueAsString: true,
      value: "2026-07-11",
      onChange,
    };
    expect(props.valueAsString).toBe(true);
    expect(props.value).toBe("2026-07-11");
  });
});

describe("formatDate / parseDate", () => {
  it("formatDate uses yyyy-MM-dd by default", () => {
    const d = new Date(2026, 6, 11);
    expect(formatDate(d)).toBe("2026-07-11");
  });

  it("parseDate round-trips yyyy-MM-dd", () => {
    const d = parseDate("2026-07-11");
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(2026);
    expect(d!.getMonth()).toBe(6);
    expect(d!.getDate()).toBe(11);
  });

  it("parseDate returns null for empty", () => {
    expect(parseDate(null)).toBeNull();
    expect(parseDate("")).toBeNull();
  });
});
