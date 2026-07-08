import type { Meta, StoryObj } from "@storybook/react";
import { ChartExport } from "@/components/business/chart-export";

const meta: Meta<typeof ChartExport> = {
  title: "Business/ChartExport",
  component: ChartExport,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
