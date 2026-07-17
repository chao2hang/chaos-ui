import { describe, it, expect } from "vitest";
import { DATE_PRESETS, getDateRange, type DatePresetKey } from "./date-presets";

describe("date-presets", () => {
  it("exports DATE_PRESETS covering expected keys", () => {
    const keys = DATE_PRESETS.map((p) => p.key);
    expect(keys).toEqual([
      "today",
      "yesterday",
      "thisWeek",
      "thisMonth",
      "lastMonth",
      "thisYear",
    ]);
  });

  it("getDateRange returns null for unknown keys", () => {
    expect(getDateRange("not-a-key" as DatePresetKey)).toBeNull();
  });

  it("today is a single local calendar day", () => {
    const now = new Date(2026, 6, 18, 15, 30, 0);
    const range = getDateRange("today", now);
    expect(range).not.toBeNull();
    expect(range!.start.getFullYear()).toBe(2026);
    expect(range!.start.getMonth()).toBe(6);
    expect(range!.start.getDate()).toBe(18);
    expect(range!.start.getHours()).toBe(0);
    expect(range!.end.getDate()).toBe(18);
    expect(range!.end.getHours()).toBe(23);
  });

  it("thisWeek starts on Monday (ISO/business week)", () => {
    // 2026-07-18 is a Saturday
    const saturday = new Date(2026, 6, 18, 12, 0, 0);
    const range = getDateRange("thisWeek", saturday);
    expect(range).not.toBeNull();
    // Monday 2026-07-13
    expect(range!.start.getDay()).toBe(1);
    expect(range!.start.getDate()).toBe(13);
    // Sunday end of week
    expect(range!.end.getDay()).toBe(0);
    expect(range!.end.getDate()).toBe(19);
  });

  it("thisMonth spans first to last day of month", () => {
    const now = new Date(2026, 1, 15); // Feb 2026 (non-leap)
    const range = getDateRange("thisMonth", now);
    expect(range).not.toBeNull();
    expect(range!.start.getDate()).toBe(1);
    expect(range!.end.getMonth()).toBe(1);
    expect(range!.end.getDate()).toBe(28);
  });
});
