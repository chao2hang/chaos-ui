import type { Meta, StoryObj } from "@storybook/react";
import { TreemapChart } from "@/components/business/charts/treemap-chart";

const meta = {
  title: "Business/TreemapChart",
  component: TreemapChart,
  tags: ["autodocs"],
} satisfies Meta<typeof TreemapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
