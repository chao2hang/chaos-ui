import type { Meta, StoryObj } from "@storybook/react";
import { SankeyChart } from "@/components/business/charts/sankey-chart";

const meta = {
  title: "Business/SankeyChart",
  component: SankeyChart,
  tags: ["autodocs"],
} satisfies Meta<typeof SankeyChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
