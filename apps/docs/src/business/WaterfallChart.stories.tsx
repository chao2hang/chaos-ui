import type { Meta, StoryObj } from "@storybook/react";
import { WaterfallChart } from "@/components/business/charts/waterfall-chart";

const meta = {
  title: "Business/WaterfallChart",
  component: WaterfallChart,
  tags: ["autodocs"],
} satisfies Meta<typeof WaterfallChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
