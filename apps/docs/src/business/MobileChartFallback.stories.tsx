import type { Meta, StoryObj } from "@storybook/react";
import { MobileChartFallback } from "@/components/business/mobile-chart-fallback";

const meta: Meta<typeof MobileChartFallback> = {
  title: "Business/MobileChartFallback",
  component: MobileChartFallback,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
