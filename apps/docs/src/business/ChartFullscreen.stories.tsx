import type { Meta, StoryObj } from "@storybook/react";
import { ChartFullscreen } from "@/components/business/chart-fullscreen";

const meta: Meta<typeof ChartFullscreen> = {
  title: "Business/ChartFullscreen",
  component: ChartFullscreen,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
