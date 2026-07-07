import type { Meta, StoryObj } from "@storybook/react";
import { GanttChart } from "@/components/business/calendar/gantt-chart";

const meta = {
  title: "Business/GanttChart",
  component: GanttChart,
  tags: ["autodocs"],
} satisfies Meta<typeof GanttChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
