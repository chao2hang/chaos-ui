import type { Meta, StoryObj } from "@storybook/react"
import { DataTable, type Column } from "@/components/business/data-table"
import { StatusTag } from "@/components/business/status-tag"

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
  { key: "id", header: "Order ID" },
  { key: "customer", header: "Customer" },
  { key: "email", header: "Email" },
  { key: "amount", header: "Amount", render: (row) => `$${row.amount.toFixed(2)}` },
  { key: "status", header: "Status", render: (row) => <StatusTag status={row.status} size="sm" /> },
  { key: "date", header: "Date" },
]

const meta = {
  title: "Business/DataTable",
  component: DataTable,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <DataTable<Order> columns={columns} data={mockData} />,
}

export const WithRowClick: Story = {
  render: () => <DataTable<Order> columns={columns} data={mockData} onRowClick={(row) => alert(`Clicked: ${row.id}`)} />,
}

export const Empty: Story = {
  render: () => <DataTable<Order> columns={columns} data={[]} />,
}

