import type { Meta, StoryObj } from "@storybook/react";
import { PoolTrackerTable } from "@/components/business/pool-tracker-table";

const meta = {
  title: "Business/DataDisplay/PoolTrackerTable",
  component: PoolTrackerTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { pools: [] },
} satisfies Meta<typeof PoolTrackerTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pools: [
      { id: "1", name: "Marketing fund", total: 100000, used: 65000, available: 35000 },
      { id: "2", name: "R&D fund", total: 80000, used: 30000, available: 50000 },
      { id: "3", name: "Ops reserve", total: 50000, used: 48000, available: 2000 },
    ],
  },
};

export const SinglePool: Story = {
  args: {
    pools: [{ id: "1", name: "General fund", total: 50000, used: 25000, available: 25000 }],
  },
};
