import type { Meta, StoryObj } from "@storybook/react";
import { RadialChart } from "@/components/business/radial-chart";

const meta: Meta<typeof RadialChart> = {
  title: "Business/RadialChart",
  component: RadialChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
