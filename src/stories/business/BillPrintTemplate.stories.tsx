import type { Meta, StoryObj } from "@storybook/react";
import { BillPrintTemplate } from "@/components/business/bill-print-template";

const meta = {
  title: "Business/Print/BillPrintTemplate",
  component: BillPrintTemplate,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Invoice", fields: [] },
} satisfies Meta<typeof BillPrintTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fields: [
      { label: "Invoice No.", value: "INV-2024-001" },
      { label: "Date", value: "2024-06-15" },
      { label: "Customer", value: "Acme Inc." },
      { label: "Amount", value: "$1,250.00" },
    ],
  },
};

export const WithLineItems: Story = {
  args: {
    fields: [
      { label: "Order No.", value: "PO-8821" },
      { label: "Vendor", value: "Global Parts Ltd." },
    ],
    lines: [
      { description: "Widget A", qty: "10", price: "$12.00", total: "$120.00" },
      { description: "Widget B", qty: "5", price: "$45.00", total: "$225.00" },
    ],
  },
};
