import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  WeekPicker,
  formatWeek,
  weeksInIsoYear,
  weekStartFromValue,
} from "./week-picker";

describe("WeekPicker helpers", () => {
  it("formats week value", () => {
    expect(formatWeek({ year: 2026, week: 7 })).toBe("2026-W07");
  });

  it("returns 52 or 53 weeks", () => {
    const n = weeksInIsoYear(2026);
    expect(n === 52 || n === 53).toBe(true);
  });

  it("weekStartFromValue returns a Monday", () => {
    const d = weekStartFromValue({ year: 2026, week: 1 });
    // getDay: Mon=1 … Sun=0
    expect(d.getDay()).toBe(1);
  });
});

describe("WeekPicker", () => {
  it("renders placeholder", () => {
    render(<WeekPicker placeholder="选择周" />);
    expect(screen.getByText("选择周")).toBeDefined();
  });

  it("opens and selects a week", () => {
    const onChange = vi.fn();
    render(<WeekPicker onChange={onChange} placeholder="Week" />);
    fireEvent.click(screen.getByText("Week"));
    fireEvent.click(screen.getByText("W1"));
    expect(onChange).toHaveBeenCalled();
    const [val, start] = onChange.mock.calls[0]!;
    expect(val).toEqual(expect.objectContaining({ week: 1 }));
    expect(start).toBeInstanceOf(Date);
  });

  it("shows clear control", () => {
    render(
      <WeekPicker
        value={{ year: 2026, week: 10 }}
        onChange={() => {}}
        allowClear
      />,
    );
    expect(screen.getByLabelText("Clear week")).toBeDefined();
  });
});
