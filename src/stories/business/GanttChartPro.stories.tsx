import type { Meta, StoryObj } from "@storybook/react";
import { GanttChartPro } from "@/components/business/gantt-chart-pro";
import type { GanttTask, GanttDependency } from "@/components/business/gantt-chart-pro";

const meta = {
  title: "Business/GanttChartPro",
  component: GanttChartPro,
  tags: ["autodocs"],
} satisfies Meta<typeof GanttChartPro>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const projectTasks: GanttTask[] = [
  { id: "1", name: "Project Kickoff", start: "2026-07-01", end: "2026-07-03", progress: 100, assignee: "PM" },
  { id: "2", name: "Requirements", start: "2026-07-01", end: "2026-07-07", progress: 100, assignee: "Alice" },
  { id: "3", name: "UI Design", start: "2026-07-05", end: "2026-07-14", progress: 80, assignee: "Bob" },
  { id: "3-1", name: "Wireframes", start: "2026-07-05", end: "2026-07-09", progress: 100, parent: "3", assignee: "Bob" },
  { id: "3-2", name: "Hi-fi Mockups", start: "2026-07-09", end: "2026-07-14", progress: 60, parent: "3", assignee: "Carol" },
  { id: "4", name: "Backend API", start: "2026-07-07", end: "2026-07-21", progress: 45, critical: true, assignee: "Dave" },
  { id: "5", name: "Frontend Dev", start: "2026-07-14", end: "2026-07-28", progress: 20, critical: true, assignee: "Eve" },
  { id: "6", name: "Testing", start: "2026-07-21", end: "2026-07-30", progress: 0, assignee: "Frank" },
  { id: "7", name: "Deployment", start: "2026-07-30", end: "2026-07-30", isMilestone: true },
];

const projectDeps: GanttDependency[] = [
  { from: "1", to: "2", type: "SS" },
  { from: "2", to: "3", type: "FS" },
  { from: "3", to: "3-1", type: "SS" },
  { from: "3-1", to: "3-2", type: "FS" },
  { from: "2", to: "4", type: "FS" },
  { from: "4", to: "5", type: "FS" },
  { from: "5", to: "6", type: "FS" },
  { from: "6", to: "7", type: "FS" },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default Gantt chart with tasks, dependencies, and milestones. */
export const Default: Story = {
  args: {
    tasks: projectTasks,
    dependencies: projectDeps,
    zoom: "day",
  },
};

/** Week-level zoom for a broader timeline view. */
export const WeekZoom: Story = {
  args: {
    tasks: projectTasks,
    dependencies: projectDeps,
    zoom: "week",
  },
};

/** Month-level zoom for long-range planning. */
export const MonthZoom: Story = {
  args: {
    tasks: projectTasks,
    dependencies: projectDeps,
    zoom: "month",
  },
};

/** Hide the task list sidebar to maximize timeline space. */
export const NoTaskList: Story = {
  args: {
    tasks: projectTasks,
    dependencies: projectDeps,
    showTaskList: false,
  },
};

/** Simple schedule without dependencies. */
export const SimpleSchedule: Story = {
  args: {
    tasks: [
      { id: "1", name: "Task A", start: "2026-07-01", end: "2026-07-05", progress: 50 },
      { id: "2", name: "Task B", start: "2026-07-06", end: "2026-07-12", progress: 0 },
      { id: "3", name: "Task C", start: "2026-07-10", end: "2026-07-18", progress: 0, critical: true },
    ],
    zoom: "day",
  },
};
