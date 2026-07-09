import type { Meta, StoryObj } from "@storybook/react";
import { GanttChartPro } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof GanttChartPro> = {
  title: "Business/GanttChartPro",
  component: GanttChartPro,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
