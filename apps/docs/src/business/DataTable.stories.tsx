import type { Meta, StoryObj } from "@storybook/react"
import { DataTable, type Column } from "@/components/business/data-table"
import { StatusTag } from "@/components/business/status-tag"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  customer: string
  email: string
  amount: number
  status: string
  date: string
}

const mockData: Order[] = [
  { id: "ORD-001", customer: "Alice Johnson", email: "alice@example.com", amount: 250.0, status: "completed", date: "2024-01-15" },
  { id: "ORD-002", customer: "Bob Smith", email: "bob@example.com", amount: 120.5, status: "pending", date: "2024-01-16" },
  { id: "ORD-003", customer: "Carol White", email: "carol@example.com", amount: 89.99, status: "approved", date: "2024-01-17" },
  { id: "ORD-004", customer: "Dave Brown", email: "dave@example.com", amount: 340.0, status: "rejected", date: "2024-01-18" },
]

const columns: Column<Order>[] = [
  { key: "id", title: "Order ID" },
  { key: "customer", title: "Customer" },
  { key: "email", title: "Email" },
  { key: "amount", title: "Amount", render: (value: unknown) => `$${(value as number).toFixed(2)}` },
  { key: "status", title: "Status", render: (value: unknown) => <StatusTag status={String(value)} size="sm" /> },
  { key: "date", title: "Date" },
]

const meta: Meta<typeof DataTable> = {
  title: "Business/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { columns: columns as any, dataSource: mockData },
}

export const WithRowClick: Story = {
  args: {
    columns: columns as any,
    dataSource: mockData,
  },
}

export const Empty: Story = {
  args: { columns: columns as any, dataSource: [] },
}
