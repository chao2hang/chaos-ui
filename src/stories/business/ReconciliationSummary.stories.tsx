import type { Meta, StoryObj } from "@storybook/react";
import { ReconciliationSummary } from "@/components/business/reconciliation-summary";

const meta = {
  title: "Business/Finance/ReconciliationSummary",
  component: ReconciliationSummary,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { totalAmount: 0, matchedAmount: 0, unmatchedAmount: 0, matchedCount: 0, unmatchedCount: 0 },
} satisfies Meta<typeof ReconciliationSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalAmount: 50000,
    matchedAmount: 42500,
    unmatchedAmount: 7500,
    matchedCount: 42,
    unmatchedCount: 8,
  },
};

export const FullyMatched: Story = {
  args: {
    totalAmount: 12000,
    matchedAmount: 12000,
    unmatchedAmount: 0,
    matchedCount: 15,
    unmatchedCount: 0,
  },
};
