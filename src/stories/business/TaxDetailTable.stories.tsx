import type { Meta, StoryObj } from "@storybook/react";
import { TaxDetailTable } from "@/components/business/tax-detail-table";

const meta = {
  title: "Business/Finance/TaxDetailTable",
  component: TaxDetailTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { rows: [] },
} satisfies Meta<typeof TaxDetailTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: [
      { id: "1", name: "Product A", amount: 1000, taxRate: 0.13, taxAmount: 130 },
      { id: "2", name: "Service B", amount: 2500, taxRate: 0.06, taxAmount: 150 },
      { id: "3", name: "License C", amount: 800, taxRate: 0.13, taxAmount: 104 },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    rows: [{ id: "1", name: "Subscription", amount: 199, taxRate: 0.20, taxAmount: 39.8 }],
  },
};

export const Empty: Story = {};
