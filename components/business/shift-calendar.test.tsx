import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ShiftCalendar } from "./shift-calendar";
import type {
  ShiftType,
  Employee,
  ShiftAssignment,
} from "./shift-calendar";

/* -------------------------------------------------------------------------- */
/*  Fixtures                                                                  */
/* -------------------------------------------------------------------------- */

const shiftTypes: ShiftType[] = [
  { id: "morning", label: "Morning", color: "bg-blue-500", hours: 8 },
  { id: "afternoon", label: "Afternoon", color: "bg-green-500", hours: 8 },
  { id: "night", label: "Night", color: "bg-purple-500", hours: 10 },
];

const employees: Employee[] = [
  { id: "emp-1", name: "Alice" },
  { id: "emp-2", name: "Bob" },
  { id: "emp-3", name: "Carol" },
];

const assignments: ShiftAssignment[] = [
  { id: "a-1", date: "2025-01-06", employeeId: "emp-1", shiftTypeId: "morning" },
  { id: "a-2", date: "2025-01-06", employeeId: "emp-2", shiftTypeId: "afternoon" },
  { id: "a-3", date: "2025-01-07", employeeId: "emp-1", shiftTypeId: "night" },
  { id: "a-4", date: "2025-01-08", employeeId: "emp-3", shiftTypeId: "morning" },
];

const fixedMonth = new Date(2025, 0, 1); // January 2025

/* -------------------------------------------------------------------------- */
/*  Tests                                                                     */
/* -------------------------------------------------------------------------- */

describe("ShiftCalendar", () => {
  it("exports ShiftCalendar", () => {
    expect(ShiftCalendar).toBeDefined();
  });

  it("renders month grid with correct days", () => {
    const { container } = render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={[]}
        initialMonth={fixedMonth}
      />,
    );
    // The calendar renders a table with day columns + 1 employee column.
    // Verify day numbers exist in the header row.
    const allThs = container.querySelectorAll("thead th");
    // Collect all day number text from th elements that have 2 divs (day-name + day-number)
    const dayNumbers = Array.from(allThs)
      .map((th) => {
        const divs = th.querySelectorAll(":scope > div");
        return divs.length > 1 ? divs[1]!.textContent!.trim() : "";
      })
      .filter(Boolean);
    expect(dayNumbers).toContain("1");
    expect(dayNumbers).toContain("15");
    expect(dayNumbers).toContain("31");
  });

  it("renders day-of-week headers", () => {
    const { container } = render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={[]}
        initialMonth={fixedMonth}
      />,
    );
    // Collect day names from th elements that have a div with day name text
    const allThs = container.querySelectorAll("thead th");
    const dayNames = Array.from(allThs)
      .map((th) => {
        const firstDiv = th.querySelector(":scope > div");
        return firstDiv?.textContent?.trim() ?? "";
      })
      .filter(Boolean);
    expect(dayNames).toContain("Mon");
    expect(dayNames).toContain("Sun");
  });

  it("renders employee rows", () => {
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={[]}
        initialMonth={fixedMonth}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
    expect(screen.getByText("Carol")).toBeDefined();
  });

  it("renders shift badges with correct labels", () => {
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={assignments}
        initialMonth={fixedMonth}
      />,
    );
    const morningBadges = screen.getAllByText("Morning");
    expect(morningBadges.length).toBeGreaterThanOrEqual(1);
    const afternoonBadges = screen.getAllByText("Afternoon");
    expect(afternoonBadges.length).toBeGreaterThanOrEqual(1);
  });

  it("navigates to previous and next month", () => {
    const onMonthChange = vi.fn();
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={[]}
        initialMonth={fixedMonth}
        onMonthChange={onMonthChange}
      />,
    );
    expect(screen.getByText("January 2025")).toBeDefined();

    fireEvent.click(screen.getByLabelText("Next month"));
    expect(onMonthChange).toHaveBeenCalledTimes(1);
    const nextMonth = onMonthChange.mock.calls[0]![0]! as Date;
    expect(nextMonth.getMonth()).toBe(1);

    fireEvent.click(screen.getByLabelText("Previous month"));
    expect(onMonthChange).toHaveBeenCalledTimes(2);
  });

  it("fires onAssign callback when shift type is selected in popover", () => {
    const onAssign = vi.fn();
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={[employees[0]!]}
        assignments={[]}
        initialMonth={fixedMonth}
        onAssign={onAssign}
      />,
    );
    const triggers = screen.getAllByRole("button", { name: /Assign shift for Alice/ });
    expect(triggers.length).toBeGreaterThan(0);
    fireEvent.click(triggers[0]!);
    const morningBtn = screen.getByRole("button", { name: /Morning/ });
    fireEvent.click(morningBtn);
    expect(onAssign).toHaveBeenCalledTimes(1);
    expect(onAssign).toHaveBeenCalledWith(
      expect.any(String),
      "emp-1",
      "morning",
    );
  });

  it("fires onRemove callback on right-click of a badge", () => {
    const onRemove = vi.fn();
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={assignments}
        initialMonth={fixedMonth}
        onRemove={onRemove}
      />,
    );
    const badge = screen.getAllByText("Morning")[0]!;
    fireEvent.contextMenu(badge);
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith("2025-01-06", "emp-1");
  });

  it("disables interaction in readOnly mode", () => {
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={assignments}
        initialMonth={fixedMonth}
        readOnly
      />,
    );
    const triggers = screen.queryAllByRole("button", {
      name: /Assign shift/,
    });
    expect(triggers.length).toBe(0);
  });

  it("shows summary row when showSummary is true", () => {
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={assignments}
        initialMonth={fixedMonth}
        showSummary
      />,
    );
    expect(screen.getByText("Total hours")).toBeDefined();
  });

  it("does not show summary row by default", () => {
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={assignments}
        initialMonth={fixedMonth}
      />,
    );
    expect(screen.queryByText("Total hours")).toBeNull();
  });

  it("filters employees by filterEmployeeIds", () => {
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={[]}
        initialMonth={fixedMonth}
        filterEmployeeIds={["emp-1"]}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.queryByText("Bob")).toBeNull();
    expect(screen.queryByText("Carol")).toBeNull();
  });

  it("shows employee filter dropdown when showFilter is true", () => {
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={[]}
        initialMonth={fixedMonth}
        showFilter
      />,
    );
    expect(screen.getByLabelText("Filter employees")).toBeDefined();
  });

  it("renders shift type legend", () => {
    render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={[]}
        initialMonth={fixedMonth}
      />,
    );
    expect(screen.getByText("Morning (8h)")).toBeDefined();
    expect(screen.getByText("Afternoon (8h)")).toBeDefined();
    expect(screen.getByText("Night (10h)")).toBeDefined();
  });

  it("applies className to root element", () => {
    const { container } = render(
      <ShiftCalendar
        shiftTypes={shiftTypes}
        employees={employees}
        assignments={[]}
        initialMonth={fixedMonth}
        className="my-custom-class"
      />,
    );
    const root = container.querySelector("[data-slot='shift-calendar']");
    expect(root).not.toBeNull();
    expect(root!.className).toContain("my-custom-class");
  });
});
