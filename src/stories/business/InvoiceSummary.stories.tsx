import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceSummary } from "@/components/business/invoice-summary";

const meta = {
  title: "Business/Finance/InvoiceSummary",
  component: InvoiceSummary,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { total: 0, issued: 0, pending: 0, amount: 0 },
} satisfies Meta<typeof InvoiceSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    total: 48,
    issued: 35,
    pending: 13,
    amount: 124500,
  },
};

export const AllIssued: Story = {
  args: {
    total: 12,
    issued: 12,
    pending: 0,
    amount: 37800,
  },
};
