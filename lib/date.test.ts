import { describe, it, expect } from "vitest";
import {
  date,
  parseDate,
  isValidDate,
  add,
  addDays,
  diff,
  startOfDay,
  endOfDay,
  isSameDay,
  isToday,
  toISODate,
} from "./date";

describe("date", () => {
  it("exports the helper bag", () => {
    expect(date().parseDate).toBe(parseDate);
  });

  it("parseDate returns undefined for invalid input", () => {
    expect(parseDate("not-a-date")).toBeUndefined();
    expect(parseDate(undefined)).toBeUndefined();
  });

  it("parseDate parses valid input", () => {
    expect(isValidDate(parseDate("2026-06-30"))).toBe(true);
    expect(isValidDate(new Date(NaN))).toBe(false);
  });

  it("add adds days/weeks/months", () => {
    const base = new Date(2026, 0, 1);
    expect(add(base, 1, "day").getDate()).toBe(2);
    expect(add(base, 1, "week").getDate()).toBe(8);
    expect(add(base, 1, "month").getMonth()).toBe(1);
  });

  it("addDays returns a new date", () => {
    const base = new Date(2026, 0, 10);
    expect(addDays(base, 5).getDate()).toBe(15);
  });

  it("diff computes day difference", () => {
    const a = new Date(2026, 0, 10);
    const b = new Date(2026, 0, 1);
    expect(diff(a, b, "day")).toBe(9);
  });

  it("startOfDay/endOfDay", () => {
    const d = new Date(2026, 5, 30, 13, 45, 9);
    expect(startOfDay(d).getHours()).toBe(0);
    expect(endOfDay(d).getHours()).toBe(23);
  });

  it("isSameDay", () => {
    const a = new Date(2026, 5, 30, 1, 0, 0);
    const b = new Date(2026, 5, 30, 23, 0, 0);
    const c = new Date(2026, 5, 29);
    expect(isSameDay(a, b)).toBe(true);
    expect(isSameDay(a, c)).toBe(false);
  });

  it("isToday", () => {
    expect(isToday(new Date())).toBe(true);
  });

  it("toISODate formats local date", () => {
    expect(toISODate(new Date(2026, 5, 30))).toBe("2026-06-30");
  });
});
