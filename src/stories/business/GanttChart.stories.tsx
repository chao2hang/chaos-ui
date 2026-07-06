import type { Meta, StoryObj } from "@storybook/react";
import { GanttChart } from "@/components/business/gantt-chart";

const meta = {
  title: "Business/Charts/GanttChart",
  component: GanttChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof GanttChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const sprintTasks = [
  {
    id: "1",
    name: "需求评审",
    start: "2026-07-01",
    end: "2026-07-03",
    progress: 100,
  },
  {
    id: "2",
    name: "前端开发",
    start: "2026-07-04",
    end: "2026-07-12",
    progress: 60,
  },
  {
    id: "3",
    name: "后端开发",
    start: "2026-07-04",
    end: "2026-07-14",
    progress: 45,
  },
  {
    id: "4",
    name: "联调测试",
    start: "2026-07-13",
    end: "2026-07-18",
    progress: 10,
  },
  {
    id: "5",
    name: "上线发布",
    start: "2026-07-19",
    end: "2026-07-19",
    progress: 0,
  },
];

const parallelTasks = [
  {
    id: "a",
    name: "调研",
    start: "2026-07-01",
    end: "2026-07-05",
    progress: 100,
  },
  {
    id: "b",
    name: "原型设计",
    start: "2026-07-03",
    end: "2026-07-08",
    progress: 80,
  },
  {
    id: "c",
    name: "视觉设计",
    start: "2026-07-06",
    end: "2026-07-11",
    progress: 50,
  },
  {
    id: "d",
    name: "开发",
    start: "2026-07-09",
    end: "2026-07-20",
    progress: 20,
  },
  {
    id: "e",
    name: "测试",
    start: "2026-07-18",
    end: "2026-07-24",
    progress: 0,
  },
  {
    id: "f",
    name: "验收",
    start: "2026-07-23",
    end: "2026-07-25",
    progress: 0,
  },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Sprint schedule with 5 sequential tasks. */
export const Sprint: Story = {
  args: { tasks: sprintTasks },
};

/** Parallel project phases with overlapping dates. */
export const ParallelPhases: Story = {
  args: { tasks: parallelTasks },
};

/** Single milestone task. */
export const SingleMilestone: Story = {
  args: {
    tasks: [
      {
        id: "m1",
        name: "版本发布",
        start: "2026-07-15",
        end: "2026-07-15",
        progress: 0,
      },
    ],
  },
};
