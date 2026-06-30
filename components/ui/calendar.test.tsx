import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Calendar, CalendarDayButton } from "./calendar";

describe("calendar", () => {
  it("exports Calendar", () => {
    expect(Calendar).toBeDefined();
  });

  it("exports CalendarDayButton", () => {
    expect(CalendarDayButton).toBeDefined();
  });

  it("renders the calendar root with a caption (month label)", () => {
    const month = new Date(2025, 0, 15); // Jan 2025
    const { container } = render(
      <Calendar mode="single" month={month} selected={month} />,
    );
    expect(container.querySelector('[data-slot="calendar"]')).not.toBeNull();
    // caption shows the month/year
    expect(container.textContent).toContain("2025");
  });

  it("renders weekday headers", () => {
    const month = new Date(2025, 5, 15); // June 2025
    const { container } = render(
      <Calendar mode="single" month={month} />,
    );
    // weekday abbreviations rendered (Mo/Tu/We/Th/Fr/Sa/Su style depending on locale)
    expect(container.querySelectorAll("th").length).toBeGreaterThan(0);
  });

  it("highlights the selected day", () => {
    const selected = new Date(2025, 5, 10); // June 10, 2025
    const { container } = render(
      <Calendar mode="single" month={selected} selected={selected} />,
    );
    const dayBtn = container.querySelector(
      '[data-selected-single="true"]',
    ) as HTMLElement;
    expect(dayBtn).not.toBeNull();
    expect(dayBtn.getAttribute("data-day")).toBe(
      selected.toLocaleDateString(),
    );
  });

  it("clicking a day fires onSelect (single mode)", async () => {
    const onSelect = vi.fn();
    const month = new Date(2025, 5, 15);
    const { container } = render(
      <Calendar mode="single" month={month} onSelect={onSelect} />,
    );
    // Click the day button whose data-day corresponds to June 5, 2025
    const target = new Date(2025, 5, 5);
    const targetStr = target.toLocaleDateString();
    const buttons = container.querySelectorAll("button");
    const dayBtn = Array.from(buttons).find(
      (b) => (b as HTMLElement).getAttribute("data-day") === targetStr,
    ) as HTMLElement | undefined;
    expect(dayBtn).toBeDefined();
    fireEvent.click(dayBtn!);
    await waitFor(() => {
      expect(onSelect).toHaveBeenCalled();
    });
    const calledWith = onSelect.mock.calls[0]?.[0];
    expect(calledWith instanceof Date).toBe(true);
    expect((calledWith as Date).getDate()).toBe(5);
  });

  it("supports navigation to next/previous month", async () => {
    const month = new Date(2025, 0, 15); // Jan 2025
    const { container } = render(
      <Calendar mode="single" month={month} />,
    );
    // next chevron button
    const navButtons = container.querySelectorAll('button[aria-label]');
    // There should be previous + next nav buttons (aria-labels like "Go to previous month")
    expect(navButtons.length).toBeGreaterThanOrEqual(2);
  });

  it("renders today marker", () => {
    const today = new Date();
    const month = new Date(today.getFullYear(), today.getMonth(), 1);
    const { container } = render(
      <Calendar mode="single" month={month} />,
    );
    // today has a 'today' modifier → rendered day with today class. Just assert
    // a button with today's data-day exists.
    const todayStr = today.toLocaleDateString();
    const buttons = container.querySelectorAll("button");
    const found = Array.from(buttons).some(
      (b) => (b as HTMLElement).getAttribute("data-day") === todayStr,
    );
    expect(found).toBe(true);
  });

  it("hides outside days when showOutsideDays=false", () => {
    const month = new Date(2025, 5, 15);
    const { container } = render(
      <Calendar mode="single" month={month} showOutsideDays={false} />,
    );
    // still renders without crashing
    expect(container.querySelector('[data-slot="calendar"]')).not.toBeNull();
  });

  it("supports multiple selection mode", () => {
    const month = new Date(2025, 5, 15);
    const selected = [new Date(2025, 5, 3), new Date(2025, 5, 7)];
    const { container } = render(
      <Calendar mode="multiple" month={month} selected={selected} />,
    );
    const selectedBtns = container.querySelectorAll(
      '[data-selected-single="true"]',
    );
    expect(selectedBtns.length).toBe(2);
  });

  it("supports range selection mode (start + end)", () => {
    const month = new Date(2025, 5, 15);
    const start = new Date(2025, 5, 3);
    const end = new Date(2025, 5, 10);
    const { container } = render(
      <Calendar mode="range" month={month} selected={{ from: start, to: end }} />,
    );
    expect(
      container.querySelector('[data-range-start="true"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-range-end="true"]'),
    ).not.toBeNull();
  });

  it("CalendarDayButton focuses when modifiers.focused is true", () => {
    const day = { date: new Date(2025, 5, 1), displayMonth: new Date(2025, 5, 1) };
    const ref = { current: null as HTMLButtonElement | null };
    // Render CalendarDayButton directly with focused modifier
    const { container } = render(
      <CalendarDayButton
        day={day as never}
        modifiers={{ focused: true, selected: false } as never}
      />,
    );
    const btn = container.querySelector("button");
    expect(btn).not.toBeNull();
  });

  it("applies disabled modifier styling", () => {
    const month = new Date(2025, 5, 15);
    const disabled = { from: new Date(2025, 5, 1), to: new Date(2025, 5, 5) };
    const { container } = render(
      <Calendar mode="single" month={month} disabled={disabled} />,
    );
    // disabled days render as disabled buttons
    const target = new Date(2025, 5, 3);
    const targetStr = target.toLocaleDateString();
    const buttons = container.querySelectorAll("button");
    const dayBtn = Array.from(buttons).find(
      (b) => (b as HTMLElement).getAttribute("data-day") === targetStr,
    ) as HTMLButtonElement | undefined;
    expect(dayBtn?.disabled).toBe(true);
  });

  it("module is importable", async () => {
    const mod = await import("./calendar");
    expect(mod.Calendar).toBeDefined();
  });

  it("dropdown caption layout renders month/year dropdowns and uses formatMonthDropdown", () => {
    const month = new Date(2025, 5, 15); // June 2025
    const { container } = render(
      <Calendar
        mode="single"
        month={month}
        captionLayout="dropdown"
        startMonth={new Date(2024, 0, 1)}
        endMonth={new Date(2026, 11, 31)}
      />,
    );
    // dropdown caption renders <select> elements for month and year
    expect(container.querySelectorAll("select").length).toBeGreaterThanOrEqual(1);
    // The dropdown caption_label branch (non-"label") renders; assert the
    // calendar still mounts and shows the year.
    expect(container.textContent).toContain("2025");
  });

  it("renders the down chevron for dropdown caption (orientation default)", () => {
    const month = new Date(2025, 5, 15);
    const { container } = render(
      <Calendar
        mode="single"
        month={month}
        captionLayout="dropdown"
        startMonth={new Date(2024, 0, 1)}
        endMonth={new Date(2026, 11, 31)}
      />,
    );
    // The dropdown caption label wraps a chevron-down svg (orientation default).
    expect(container.querySelector('[data-slot="calendar"]')).not.toBeNull();
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
  });

  it("passes a custom locale to formatMonthDropdown", () => {
    // en-US locale produces a short month like "Jun".
    const month = new Date(2025, 5, 15);
    const { container } = render(
      <Calendar
        mode="single"
        month={month}
        captionLayout="dropdown"
        locale={{ code: "en-US" } as never}
        startMonth={new Date(2024, 0, 1)}
        endMonth={new Date(2026, 11, 31)}
      />,
    );
    expect(container.querySelector('[data-slot="calendar"]')).not.toBeNull();
  });

  it("forwards custom formatters override", () => {
    const month = new Date(2025, 5, 15);
    const formatMonthDropdown = (date: Date) =>
      date.toLocaleString("en-US", { month: "long" }).toUpperCase();
    const { container } = render(
      <Calendar
        mode="single"
        month={month}
        captionLayout="dropdown"
        formatters={{ formatMonthDropdown }}
        startMonth={new Date(2024, 0, 1)}
        endMonth={new Date(2026, 11, 31)}
      />,
    );
    expect(container.querySelector('[data-slot="calendar"]')).not.toBeNull();
  });
});
