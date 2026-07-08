import type { Meta, StoryObj } from "@storybook/react";
import { ChartEmpty } from "@/components/business/chart-empty";

const meta: Meta<typeof ChartEmpty> = {
  title: "Business/ChartEmpty",
  component: ChartEmpty,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
