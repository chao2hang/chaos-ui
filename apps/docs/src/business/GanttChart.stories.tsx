import type { Meta, StoryObj } from "@storybook/react";
import { GanttChart } from "@/components/business/calendar/gantt-chart";

const meta: Meta<typeof GanttChart> = {
  title: "Business/GanttChart",
  component: GanttChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <GanttChart tasks={[]} onTaskClick={() => {}} />,
};
