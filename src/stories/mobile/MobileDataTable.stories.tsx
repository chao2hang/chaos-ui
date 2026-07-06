import type { Meta, StoryObj } from "@storybook/react";
import { MobileDataTable, type MobileColumn } from "@/components/mobile/mobile-data-table";

type OrderRow = {
  id: string;
  customer: string;
  amount: string;
  status: string;
};

const columns: MobileColumn<OrderRow>[] = [
  { key: "id", header: "ID", primary: true },
  { key: "customer", header: "Customer" },
  { key: "amount", header: "Amount" },
  { key: "status", header: "Status" },
];

const data: OrderRow[] = [
  { id: "ORD-001", customer: "Alice Johnson", amount: "$250.00", status: "Completed" },
  { id: "ORD-002", customer: "Bob Smith", amount: "$120.50", status: "Pending" },
  { id: "ORD-003", customer: "Carol White", amount: "$89.99", status: "Processing" },
];

const meta = {
  title: "Mobile/MobileDataTable",
  component: MobileDataTable<OrderRow>,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { columns, data },
} satisfies Meta<typeof MobileDataTable<OrderRow>>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {};

export const WithRowClick: Story = {
  args: { onRowClick: noop },
};

export const SingleRow: Story = {
  args: { data: data.slice(0, 1) },
};

export const Empty: Story = {
  args: { data: [] },
};
