import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { CampaignCalendar } from "./campaign-calendar";
import type {
  CampaignCalendarProps,
  CampaignCalendarEvent,
} from "./campaign-calendar";

describe("CampaignCalendar", () => {
  it("exports CampaignCalendar", () => {
    expect(CampaignCalendar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CampaignCalendarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CampaignCalendarEvent | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders weekday headers", () => {
    render(<CampaignCalendar month={new Date(2026, 5, 15)} events={[]} />);
    for (const day of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) {
      expect(screen.getByText(day)).toBeDefined();
    }
  });

  it("renders all days of the month", () => {
    // June 2026 has 30 days; June 1 2026 is a Monday.
    render(<CampaignCalendar month={new Date(2026, 5, 1)} events={[]} />);
    for (let d = 1; d <= 30; d++) {
      expect(screen.getByText(String(d))).toBeDefined();
    }
  });

  it("renders an event on its matching day with its channel", () => {
    const events: CampaignCalendarEvent[] = [
      {
        id: "e1",
        name: "Summer Sale",
        date: new Date(2026, 5, 10),
        status: "active",
        channel: "email",
      },
    ];
    render(<CampaignCalendar month={new Date(2026, 5, 1)} events={events} />);
    expect(screen.getByText("Summer Sale")).toBeDefined();
    expect(screen.getByText("email")).toBeDefined();
  });

  it("accepts a string date for an event", () => {
    const events: CampaignCalendarEvent[] = [
      {
        id: "e2",
        name: "Winter Promo",
        date: "2026-06-12T00:00:00",
        status: "scheduled",
      },
    ];
    render(<CampaignCalendar month={new Date(2026, 5, 1)} events={events} />);
    expect(screen.getByText("Winter Promo")).toBeDefined();
  });

  it("shows a +N more indicator when a day has more than 3 events", () => {
    const events: CampaignCalendarEvent[] = Array.from({ length: 5 }, (_, i) => ({
      id: `e${i}`,
      name: `Event ${i}`,
      date: new Date(2026, 5, 15),
      status: "draft" as const,
    }));
    render(<CampaignCalendar month={new Date(2026, 5, 1)} events={events} />);
    expect(screen.getByText("+2 more")).toBeDefined();
    expect(screen.getByText("Event 0")).toBeDefined();
    expect(screen.getByText("Event 2")).toBeDefined();
    expect(screen.queryByText("Event 3")).toBeNull();
  });

  it("renders leading empty cells for a month that does not start on Sunday", () => {
    const { container } = render(
      <CampaignCalendar month={new Date(2026, 5, 1)} events={[]} />,
    );
    const grids = container.querySelectorAll(".grid.grid-cols-7");
    expect(grids.length).toBeGreaterThanOrEqual(2);
    const dayGrid = grids[1];
    // leading + daysInMonth = 1 + 30 = 31 cells
    expect(dayGrid.children.length).toBe(31);
  });

  it("renders weekday text inside the header grid", () => {
    const { container } = render(
      <CampaignCalendar month={new Date(2026, 5, 1)} events={[]} />,
    );
    const header = container.querySelector(".grid.grid-cols-7");
    expect(within(header as HTMLElement).getByText("Mon")).toBeDefined();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <CampaignCalendar
        month={new Date(2026, 5, 1)}
        events={[]}
        className="cal-cls"
      />,
    );
    const root = container.querySelector('[data-slot="campaign-calendar"]');
    expect(root?.className).toContain("cal-cls");
  });
});
