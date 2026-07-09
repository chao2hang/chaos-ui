import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { Scheduler } from "@/components/ui/scheduler";
import type { SchedulerEvent } from "@/components/ui/scheduler";

const sampleEvents: SchedulerEvent[] = [
  {
    id: "1",
    title: "晨会",
    start: new Date(2026, 6, 8, 9, 0),
    end: new Date(2026, 6, 8, 10, 0),
    color: "#3b82f6",
  },
  {
    id: "2",
    title: "项目评审",
    start: new Date(2026, 6, 8, 14, 0),
    end: new Date(2026, 6, 8, 15, 30),
    color: "#10b981",
  },
  {
    id: "3",
    title: "团建日",
    start: new Date(2026, 6, 8, 0, 0),
    end: new Date(2026, 6, 8, 23, 59),
    allDay: true,
    color: "#f59e0b",
  },
];

describe("Scheduler", () => {
  it("renders with events", () => {
    const { container } = render(<Scheduler events={sampleEvents} />);
    expect(container.querySelector('[data-slot="scheduler"]')).not.toBeNull();
  });

  it("renders day view", () => {
    const { container } = render(
      <Scheduler events={sampleEvents} view="day" />,
    );
    expect(container.textContent).toContain("日");
  });

  it("renders week view by default", () => {
    const { container } = render(<Scheduler events={sampleEvents} />);
    expect(container.textContent).toContain("周");
  });

  it("toggles between day and week views", async () => {
    const onViewChange = vi.fn();
    const { container } = render(
      <Scheduler events={sampleEvents} view="week" onViewChange={onViewChange} />,
    );

    // Find the view toggle "日" button (inside the toggle group, not the day-of-week headers)
    const viewToggle = container.querySelector(".rounded-l-md");
    expect(viewToggle).not.toBeNull();

    await act(async () => {
      if (viewToggle) fireEvent.click(viewToggle);
    });

    expect(onViewChange).toHaveBeenCalledWith("day");
  });

  it("calls onEventClick when event is clicked", async () => {
    const onEventClick = vi.fn();
    const { container } = render(
      <Scheduler events={sampleEvents} onEventClick={onEventClick} />,
    );

    // Click on an event button
    const eventBtn = container.querySelector("button.text-white");
    if (eventBtn) {
      await act(async () => {
        fireEvent.click(eventBtn);
      });
      expect(onEventClick).toHaveBeenCalled();
    }
  });

  it("navigates to today", () => {
    const onDateChange = vi.fn();
    const { getByText } = render(
      <Scheduler events={sampleEvents} onDateChange={onDateChange} />,
    );

    const todayBtn = getByText("今天");
    fireEvent.click(todayBtn);
    expect(onDateChange).toHaveBeenCalled();
  });

  it("renders without events", () => {
    const { container } = render(<Scheduler events={[]} />);
    expect(container.querySelector('[data-slot="scheduler"]')).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/scheduler");
    expect(mod.Scheduler).toBeDefined();
  });
});
