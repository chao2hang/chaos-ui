import type { Meta, StoryObj } from "@storybook/react";
import { RadarChart } from "@/components/business/radar-chart";

const meta = {
  title: "Business/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
