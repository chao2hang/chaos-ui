import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  formatNumber,
  formatCompactNumber,
  formatPercent,
  formatCurrency,
  formatFileSize,
  formatDuration,
  truncate,
  initials,
  setFormatLocale,
} from "@/lib/format";

describe("lib/format", () => {
  it("formatDate formats a date", () => {
    expect(formatDate("2026-06-30")).toMatch(/2026/);
  });
  it("formatDate returns - for invalid", () => {
    expect(formatDate("not-a-date")).toBe("-");
  });
  it("formatTime formats time", () => {
    expect(formatTime(new Date(2026, 5, 30, 14, 30))).toMatch(/14|2/);
  });
  it("formatDateTime returns a string", () => {
    expect(typeof formatDateTime(new Date())).toBe("string");
  });
  it("formatRelativeTime returns a string for past", () => {
    const past = Date.now() - 1000 * 60 * 60; // 1h ago
    expect(typeof formatRelativeTime(past)).toBe("string");
  });
  it("formatNumber formats", () => {
    expect(formatNumber(1234567)).toMatch(/1.*234.*567/);
  });
  it("formatCompactNumber", () => {
    expect(formatCompactNumber(1500)).toMatch(/\d/);
  });
  it("formatPercent", () => {
    expect(formatPercent(0.12)).toMatch(/12/);
  });
  it("formatCurrency", () => {
    expect(formatCurrency(99.5)).toMatch(/99/);
  });
  it("formatFileSize", () => {
    expect(formatFileSize(1024)).toMatch(/KB/);
    expect(formatFileSize(0)).toBe("0 B");
    expect(formatFileSize(-1)).toBe("-");
  });
  it("formatDuration", () => {
    expect(typeof formatDuration(3661)).toBe("string");
    expect(formatDuration(-1)).toBe("-");
  });
  it("truncate", () => {
    expect(truncate("hello world", 8)).toContain("…");
    expect(truncate("hello world", 8).length).toBeLessThanOrEqual(9);
    expect(truncate("short", 50)).toBe("short");
  });
  it("initials", () => {
    expect(initials("John Doe")).toBe("JD");
    expect(initials("single")).toBe("S");
    expect(initials("")).toBe("?");
  });
  it("setFormatLocale changes locale", () => {
    setFormatLocale("en-US");
    expect(formatNumber(1234.5)).toMatch(/1,234/);
  });
});
