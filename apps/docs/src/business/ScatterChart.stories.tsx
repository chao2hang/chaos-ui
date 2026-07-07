import type { Meta, StoryObj } from "@storybook/react";
import { ScatterChart } from "@/components/business/scatter-chart";

const meta = {
  title: "Business/ScatterChart",
  component: ScatterChart,
  tags: ["autodocs"],
} satisfies Meta<typeof ScatterChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
