import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart } from "@/components/business/area-chart";

const meta: Meta<typeof AreaChart> = {
  title: "Business/Chart",
  component: AreaChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
