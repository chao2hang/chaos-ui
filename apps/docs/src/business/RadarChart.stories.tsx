import type { Meta, StoryObj } from "@storybook/react";
import { RadarChart } from "@/components/business/radar-chart";

const meta: Meta<typeof RadarChart> = {
  title: "Business/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
