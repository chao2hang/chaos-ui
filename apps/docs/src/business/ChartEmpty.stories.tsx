import type { Meta, StoryObj } from "@storybook/react";
import { ChartEmpty } from "@/components/business/chart-empty";

const meta = {
  title: "Business/ChartEmpty",
  component: ChartEmpty,
  tags: ["autodocs"],
} satisfies Meta<typeof ChartEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
