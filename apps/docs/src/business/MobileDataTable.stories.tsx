import type { Meta, StoryObj } from "@storybook/react";
import {
  MobileDataTable,
  type MobileColumn,
} from "@/components/business/mobile-data-table";

interface Order {
  id: string;
  customer: string;
  amount: string;
  status: string;
}

const columns: MobileColumn<Order>[] = [
  { key: "id", header: "Order ID", primary: true },
  { key: "customer", header: "Customer" },
  { key: "amount", header: "Amount" },
  { key: "status", header: "Status" },
];

const mockData: Order[] = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    amount: "$250.00",
    status: "Completed",
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    amount: "$120.50",
    status: "Pending",
  },
  {
    id: "ORD-003",
    customer: "Carol White",
    amount: "$89.99",
    status: "Processing",
  },
];

const meta: Meta<typeof MobileDataTable> = {
  title: "Business/MobileDataTable",
  component: MobileDataTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { columns, data: mockData },
};

export const Empty: Story = {
  args: { columns, data: [] },
};
