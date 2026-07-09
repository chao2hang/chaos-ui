import type { Meta, StoryObj } from "@storybook/react";
import { Scheduler } from "@/components/ui/scheduler";
import type { SchedulerEvent } from "@/components/ui/scheduler";

const now = new Date(2026, 6, 8); // July 8, 2026

const sampleEvents: SchedulerEvent[] = [
  {
    id: "1",
    title: "每日站会",
    start: new Date(2026, 6, 8, 9, 0),
    end: new Date(2026, 6, 8, 9, 30),
    color: "#3b82f6",
  },
  {
    id: "2",
    title: "产品评审",
    start: new Date(2026, 6, 8, 10, 0),
    end: new Date(2026, 6, 8, 11, 30),
    color: "#10b981",
  },
  {
    id: "3",
    title: "午餐会",
    start: new Date(2026, 6, 8, 12, 0),
    end: new Date(2026, 6, 8, 13, 0),
    color: "#f59e0b",
  },
  {
    id: "4",
    title: "技术分享",
    start: new Date(2026, 6, 8, 14, 0),
    end: new Date(2026, 6, 8, 16, 0),
    color: "#8b5cf6",
  },
  {
    id: "5",
    title: "团队聚餐",
    start: new Date(2026, 6, 8, 18, 0),
    end: new Date(2026, 6, 8, 20, 0),
    color: "#ef4444",
    allDay: false,
  },
  {
    id: "6",
    title: "公司年会",
    start: new Date(2026, 6, 8, 0, 0),
    end: new Date(2026, 6, 8, 23, 59),
    allDay: true,
    color: "#ec4899",
  },
];

const meta = {
  title: "Components/Scheduler",
  component: Scheduler,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    events: sampleEvents,
    date: now,
  },
} satisfies Meta<typeof Scheduler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WeekView: Story = {
  args: {
    view: "week",
  },
};

export const DayView: Story = {
  args: {
    view: "day",
  },
};

export const EmptySchedule: Story = {
  args: {
    events: [],
    view: "week",
  },
};

export const BusinessHours: Story = {
  args: {
    view: "week",
    startHour: 8,
    endHour: 18,
  },
};

export const English: Story = {
  args: {
    view: "week",
    locale: "en",
  },
};
