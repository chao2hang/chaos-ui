import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceManager } from "@/components/business/invoice-manager";

const invoices = [
  { id: "1", number: "INV-2024-001", amount: 1250, status: "issued" },
  { id: "2", number: "INV-2024-002", amount: 3400, status: "pending" },
  { id: "3", number: "INV-2024-003", amount: 890, status: "paid" },
];

const meta = {
  title: "Business/Finance/InvoiceManager",
  component: InvoiceManager,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { invoices: [] },
} satisfies Meta<typeof InvoiceManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { invoices },
};

export const Empty: Story = {};

export const WithIssueHandler: Story = {
  args: {
    invoices,
    onIssue: (id) => { void id; },
  },
};
