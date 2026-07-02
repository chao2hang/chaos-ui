import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AttendanceCalendar } from "./attendance-calendar";
import type { AttendanceRecord } from "./attendance-calendar";

vi.mock("@/components/ui/icons", () => ({
  ChevronLeftIcon: (p: Record<string, unknown>) => <svg data-testid="chev-left" {...p} />,
  ChevronRightIcon: (p: Record<string, unknown>) => <svg data-testid="chev-right" {...p} />,
}));

const records: AttendanceRecord[] = [
  { date: "2026-07-01", status: "present", checkIn: "08:55", checkOut: "18:02", workHours: 9 },
  { date: "2026-07-02", status: "late", checkIn: "09:30", checkOut: "18:00", note: "Traffic" },
  { date: "2026-07-03", status: "present", checkIn: "08:50", checkOut: "18:10" },
  { date: "2026-07-06", status: "absent", note: "No show" },
  { date: "2026-07-07", status: "leave", note: "Annual leave" },
  { date: "2026-07-08", status: "present", checkIn: "08:45", checkOut: "18:00" },
];

describe("AttendanceCalendar", () => {
  it("renders with data-slot", () => {
    const { container } = render(<AttendanceCalendar records={records} year={2026} month={6} />);
    expect(container.querySelector('[data-slot="attendance-calendar"]')).toBeTruthy();
  });

  it("renders month name", () => {
    render(<AttendanceCalendar records={records} year={2026} month={6} />);
    expect(screen.getByText("July 2026")).toBeTruthy();
  });

  it("renders day numbers", () => {
    render(<AttendanceCalendar records={records} year={2026} month={6} />);
    expect(screen.getByText("1")).toBeTruthy();
    expect(screen.getByText("15")).toBeTruthy();
  });

  it("shows check-in/out times for recorded days", () => {
    render(<AttendanceCalendar records={records} year={2026} month={6} />);
    expect(screen.getByText(/In: 08:55/)).toBeTruthy();
    expect(screen.getByText(/Out: 18:02/)).toBeTruthy();
  });

  it("shows status stats", () => {
    render(<AttendanceCalendar records={records} year={2026} month={6} />);
    expect(screen.getByText("Present")).toBeTruthy();
    expect(screen.getByText("Late")).toBeTruthy();
    expect(screen.getByText("Absent")).toBeTruthy();
  });

  it("fires onDayClick when a day with record is clicked", () => {
    const onDayClick = vi.fn();
    const { container } = render(
      <AttendanceCalendar records={records} year={2026} month={6} onDayClick={onDayClick} />,
    );
    const days = container.querySelectorAll('[data-slot="attendance-day"]');
    // Click day 1 (index 4 for July 2026 - Wed is offset 3, so day 1 is at index 4)
    const recordedDays = Array.from(days).filter(d => d.getAttribute("data-status") === "present" || d.getAttribute("data-status") === "late");
    fireEvent.click(recordedDays[0]!);
    expect(onDayClick).toHaveBeenCalledTimes(1);
  });

  it("fires onMonthChange when navigating", () => {
    const onMonthChange = vi.fn();
    render(<AttendanceCalendar records={records} year={2026} month={6} onMonthChange={onMonthChange} />);
    fireEvent.click(screen.getByLabelText("Previous month"));
    expect(onMonthChange).toHaveBeenCalledWith(2026, 5);
    fireEvent.click(screen.getByLabelText("Next month"));
    expect(onMonthChange).toHaveBeenCalledWith(2026, 7);
  });

  it("applies custom className", () => {
    const { container } = render(
      <AttendanceCalendar records={records} year={2026} month={6} className="custom-cal" />,
    );
    const el = container.querySelector('[data-slot="attendance-calendar"]') as HTMLElement;
    expect(el.className).toContain("custom-cal");
  });
});
