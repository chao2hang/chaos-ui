import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PeriodPicker, resolvePeriod } from "./period-picker";

describe("period-picker", () => {
  it("exports PeriodPicker and resolvePeriod", () => {
    expect(PeriodPicker).toBeDefined();
    expect(resolvePeriod({ granularity: "year", year: 2026 }).periodKey).toBe(
      "2026",
    );
    expect(
      resolvePeriod({ granularity: "month", year: 2026, index: 7 }).periodKey,
    ).toBe("2026-07");
  });

  it("shows controlled value on the trigger", () => {
    render(
      <PeriodPicker
        value={{ granularity: "month", year: 2026, index: 7 }}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("button").textContent).toMatch(/2026年7月/);
  });

  it("shows placeholder when uncontrolled and empty", () => {
    render(<PeriodPicker onChange={vi.fn()} />);
    expect(screen.getByRole("button").textContent).toMatch(/选择期间/);
  });
});
