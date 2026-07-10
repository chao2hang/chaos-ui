import type { Meta, StoryObj } from "@storybook/react";
import { ScheduleView } from "@/components/business/schedule-view";
import type { ScheduleEvent } from "@/components/business/schedule-view";

function makeEvent(
  id: string,
  title: string,
  dayOffset: number,
  startHour: number,
  endHour: number,
  color?: string,
): ScheduleEvent {
  const base = new Date();
  const monday = new Date(base);
  const day = monday.getDay();
  monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1) + dayOffset);
  monday.setHours(0, 0, 0, 0);
  const start = new Date(monday);
  start.setHours(startHour);
  const end = new Date(monday);
  end.setHours(endHour);
  return { id, title, start, end, color };
}

const sampleEvents: ScheduleEvent[] = [
  makeEvent("1", "Team Standup", 0, 9, 9, "#3b82f6"),
  makeEvent("2", "Sprint Planning", 0, 10, 12, "#8b5cf6"),
  makeEvent("3", "Design Review", 1, 14, 15, "#f59e0b"),
  makeEvent("4", "1:1 with Manager", 2, 11, 11, "#10b981"),
  makeEvent("5", "Lunch & Learn", 3, 12, 13, "#ef4444"),
  makeEvent("6", "Demo", 4, 15, 16, "#06b6d4"),
];

const meta: Meta<typeof ScheduleView> = {
  title: "Business/ScheduleView",
  component: ScheduleView,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    events: sampleEvents,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ScheduleView events={[]} onEventClick={() => {}} />,
};

export const Empty: Story = {
  args: {
    events: [],
  },
};

export const Dark: Story = {
  args: {
    events: sampleEvents,
  },
  parameters: { backgrounds: { default: "dark" } },
};
