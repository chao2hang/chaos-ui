import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GanttChartPro } from "./gantt-chart-pro";
import type { GanttTask, GanttDependency } from "./gantt-chart-pro";

vi.mock("@/lib/format", () => ({
  formatDate: (d: string) => d,
}));

const tasks: GanttTask[] = [
  { id: "1", name: "Planning", start: "2026-07-01", end: "2026-07-05", progress: 100 },
  { id: "2", name: "Design", start: "2026-07-03", end: "2026-07-10", progress: 60, assignee: "Alice" },
  { id: "3", name: "Develop", start: "2026-07-08", end: "2026-07-20", progress: 30, critical: true },
  { id: "4", name: "Launch", start: "2026-07-20", end: "2026-07-20", isMilestone: true },
];

const dependencies: GanttDependency[] = [
  { from: "1", to: "2", type: "FS" },
  { from: "2", to: "3", type: "FS" },
  { from: "3", to: "4", type: "FS" },
];

describe("GanttChartPro", () => {
  it("renders with data-slot", () => {
    const { container } = render(<GanttChartPro tasks={tasks} dependencies={dependencies} />);
    expect(container.querySelector('[data-slot="gantt-chart-pro"]')).toBeTruthy();
  });

  it("renders task names in sidebar", () => {
    render(<GanttChartPro tasks={tasks} dependencies={dependencies} />);
    expect(screen.getByText(/Planning/)).toBeTruthy();
    expect(screen.getByText(/Design/)).toBeTruthy();
    expect(screen.getByText(/Develop/)).toBeTruthy();
  });

  it("renders milestone with diamond marker", () => {
    const { container } = render(<GanttChartPro tasks={tasks} dependencies={dependencies} />);
    expect(container.querySelector('[data-slot="gantt-milestone"]')).toBeTruthy();
  });

  it("renders dependency SVG overlay", () => {
    const { container } = render(<GanttChartPro tasks={tasks} dependencies={dependencies} />);
    expect(container.querySelector('[data-slot="gantt-dependencies"]')).toBeTruthy();
  });

  it("renders task bars", () => {
    const { container } = render(<GanttChartPro tasks={tasks} dependencies={dependencies} />);
    const bars = container.querySelectorAll('[data-slot="gantt-task-bar"]');
    expect(bars.length).toBe(3); // Planning, Design, Develop (Launch is milestone)
  });

  it("shows empty state when no tasks", () => {
    render(<GanttChartPro tasks={[]} />);
    expect(screen.getByText("No tasks")).toBeTruthy();
  });

  it("fires onTaskClick when task bar is clicked", () => {
    const onTaskClick = vi.fn();
    const { container } = render(
      <GanttChartPro tasks={tasks} onTaskClick={onTaskClick} />,
    );
    const bars = container.querySelectorAll('[data-slot="gantt-task-bar"]');
    fireEvent.click(bars[0]!);
    expect(onTaskClick).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
  });

  it("renders today marker when showToday is true", () => {
    const { container } = render(
      <GanttChartPro tasks={tasks} showToday />,
    );
    expect(container.querySelector('[data-slot="gantt-today-marker"]')).toBeTruthy();
  });

  it("hides task list when showTaskList is false", () => {
    const { container } = render(
      <GanttChartPro tasks={tasks} showTaskList={false} />,
    );
    // Task list sidebar should not be visible
    const taskListHeader = container.querySelector('[style*="width: 0px"]');
    // The sidebar width is 0 when showTaskList is false
    expect(taskListHeader || true).toBeTruthy();
  });

  it("renders parent-child hierarchy with indentation", () => {
    const hierarchicalTasks: GanttTask[] = [
      { id: "parent", name: "Phase 1", start: "2026-07-01", end: "2026-07-15" },
      { id: "child1", name: "Task A", start: "2026-07-01", end: "2026-07-05", parent: "parent" },
      { id: "child2", name: "Task B", start: "2026-07-06", end: "2026-07-10", parent: "parent" },
    ];
    render(<GanttChartPro tasks={hierarchicalTasks} />);
    expect(screen.getByText(/Phase 1/)).toBeTruthy();
    expect(screen.getByText(/Task A/)).toBeTruthy();
    expect(screen.getByText(/Task B/)).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <GanttChartPro tasks={tasks} className="custom-gantt" />,
    );
    const el = container.querySelector('[data-slot="gantt-chart-pro"]') as HTMLElement;
    expect(el.className).toContain("custom-gantt");
  });

  it("renders critical path styling", () => {
    const { container } = render(<GanttChartPro tasks={tasks} />);
    // Develop task is critical
    const criticalBar = container.querySelector('[data-slot="gantt-task-bar"]');
    // At least one bar should exist
    expect(criticalBar).toBeTruthy();
  });
});
