import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart } from "@/components/business/area-chart";

const meta = {
  title: "Business/Chart",
  component: AreaChart,
  tags: ["autodocs"],
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
