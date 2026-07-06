import type { Meta, StoryObj } from "@storybook/react";
import { PerformanceRankTable } from "@/components/business/performance-rank-table";

const meta = {
  title: "Business/DataDisplay/PerformanceRankTable",
  component: PerformanceRankTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { rows: [] },
} satisfies Meta<typeof PerformanceRankTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: [
      { id: "1", rank: 1, name: "Alice", amount: 128000, growth: 15.2 },
      { id: "2", rank: 2, name: "Bob", amount: 112000, growth: 8.5 },
      { id: "3", rank: 3, name: "Carol", amount: 98000, growth: -2.1 },
      { id: "4", rank: 4, name: "Dave", amount: 85000 },
    ],
  },
};

export const TopThree: Story = {
  args: {
    rows: [
      { id: "1", rank: 1, name: "Alice", amount: 128000, growth: 15.2 },
      { id: "2", rank: 2, name: "Bob", amount: 112000, growth: 8.5 },
      { id: "3", rank: 3, name: "Carol", amount: 98000, growth: -2.1 },
    ],
  },
};
