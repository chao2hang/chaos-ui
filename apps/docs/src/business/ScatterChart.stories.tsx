import type { Meta, StoryObj } from "@storybook/react";
import { ScatterChart } from "@/components/business/scatter-chart";

const meta: Meta<typeof ScatterChart> = {
  title: "Business/ScatterChart",
  component: ScatterChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
