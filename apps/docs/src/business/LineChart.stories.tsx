import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "@/components/business/chart";

const meta = {
  title: "Business/LineChart",
  component: LineChart,
  tags: ["autodocs"],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
