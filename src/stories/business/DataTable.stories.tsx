import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "@/components/business/data-table";

interface Order {
  id: string;
  name: string;
  amount: number;
  status: string;
  date: string;
}

const sampleData: Order[] = [
  { id: "1", name: "Order A", amount: 1200, status: "pending", date: "2024-01-15" },
  { id: "2", name: "Order B", amount: 3400, status: "completed", date: "2024-01-14" },
  { id: "3", name: "Order C", amount: 560, status: "cancelled", date: "2024-01-13" },
];

const meta: Meta<typeof DataTable> = {
  title: "Business/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    columns: [
      { key: "name", title: "Name" },
      { key: "amount", title: "Amount" },
      { key: "status", title: "Status" },
      { key: "date", title: "Date" },
    ],
    dataSource: sampleData,
      },
};

export const Empty: Story = {
  args: {
    columns: [
      { key: "name", title: "Name" },
      { key: "amount", title: "Amount" },
    ],
    dataSource: [],
  },
};

export const Sortable: Story = {
  args: {
    columns: [
      { key: "name", title: "Name", sortable: true },
      { key: "amount", title: "Amount", sortable: true },
      { key: "status", title: "Status" },
      { key: "date", title: "Date", sortable: true },
    ],
    dataSource: sampleData,
        sortable: true,
  },
};
