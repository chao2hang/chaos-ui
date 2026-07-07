import type { Meta, StoryObj } from "@storybook/react";
import { ChartFullscreen } from "@/components/business/chart-fullscreen";

const meta = {
  title: "Business/ChartFullscreen",
  component: ChartFullscreen,
  tags: ["autodocs"],
} satisfies Meta<typeof ChartFullscreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
