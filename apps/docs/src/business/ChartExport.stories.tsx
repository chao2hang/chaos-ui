import type { Meta, StoryObj } from "@storybook/react";
import { ChartExport } from "@/components/business/chart-export";

const meta = {
  title: "Business/ChartExport",
  component: ChartExport,
  tags: ["autodocs"],
} satisfies Meta<typeof ChartExport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
