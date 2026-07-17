import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DateTimePicker } from "./date-time-picker";
import { PeriodPicker, resolvePeriod } from "./period-picker";
import { DATE_PRESETS, getDateRange } from "./date-presets";

describe("date-presets", () => {
  it("exports 6 presets", () => {
    expect(DATE_PRESETS).toHaveLength(6);
    expect(DATE_PRESETS.map((p) => p.key)).toEqual([
      "today",
      "yesterday",
      "thisWeek",
      "thisMonth",
      "lastMonth",
      "thisYear",
    ]);
  });

  it("today range covers a single day", () => {
    const now = new Date(2026, 6, 17, 10, 30);
    const r = getDateRange("today", now)!;
    expect(r.start.getDate()).toBe(17);
    expect(r.end.getDate()).toBe(17);
    expect(r.start.getHours()).toBe(0);
    expect(r.end.getHours()).toBe(23);
  });

  it("thisMonth range starts at day 1", () => {
    const now = new Date(2026, 6, 17);
    const r = getDateRange("thisMonth", now)!;
    expect(r.start.getDate()).toBe(1);
    expect(r.start.getMonth()).toBe(6);
  });

  it("returns null for unknown key", () => {
    expect(getDateRange("unknown" as never)).toBeNull();
  });
});

describe("resolvePeriod", () => {
  it("year range spans full year", () => {
    const r = resolvePeriod({ granularity: "year", year: 2026 });
    expect(r.periodKey).toBe("2026");
    expect(r.start.getMonth()).toBe(0);
    expect(r.end.getMonth()).toBe(11);
  });

  it("quarter range", () => {
    const r = resolvePeriod({ granularity: "quarter", year: 2026, index: 2 });
    expect(r.periodKey).toBe("2026-Q2");
    expect(r.start.getMonth()).toBe(3);
    expect(r.end.getMonth()).toBe(5);
  });

  it("month range", () => {
    const r = resolvePeriod({ granularity: "month", year: 2026, index: 7 });
    expect(r.periodKey).toBe("2026-07");
    expect(r.start.getMonth()).toBe(6);
    expect(r.end.getDate()).toBe(31);
  });
});

describe("DateTimePicker", () => {
  it("renders placeholder when empty", () => {
    render(<DateTimePicker placeholder="选择日期时间" />);
    expect(screen.getByText("选择日期时间")).toBeInTheDocument();
  });

  it("renders controlled date value", () => {
    render(<DateTimePicker value={new Date(2026, 6, 17, 9, 30)} />);
    expect(screen.getByText("2026-07-17 09:30")).toBeInTheDocument();
  });

  it("renders string value", () => {
    render(<DateTimePicker valueAsString value="2026-07-17 14:00" />);
    expect(screen.getByText("2026-07-17 14:00")).toBeInTheDocument();
  });
});

describe("PeriodPicker", () => {
  it("renders placeholder when empty", () => {
    render(<PeriodPicker placeholder="选择期间" />);
    expect(screen.getByText("选择期间")).toBeInTheDocument();
  });

  it("renders controlled value label", () => {
    render(
      <PeriodPicker value={{ granularity: "month", year: 2026, index: 7 }} />,
    );
    expect(screen.getByText("2026年7月")).toBeInTheDocument();
  });
});
