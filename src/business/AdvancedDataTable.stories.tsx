import type { Meta, StoryObj } from "@storybook/react"
import { AdvancedDataTable, type ColumnDef } from "@/components/business/advanced-data-table"
import { Badge } from "@/components/ui/badge"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
}

const generateData = (count: number): User[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
    status: i % 4 === 0 ? "inactive" : i % 4 === 1 ? "pending" : "active",
  }))

const columns: ColumnDef[] = [
  { key: "id", header: "ID", width: 80 },
  { key: "name", header: "Name", width: 150 },
  { key: "email", header: "Email", width: 200 },
  { key: "role", header: "Role", width: 100 },
  {
    key: "status",
    header: "Status",
    width: 100,
    render: (row) => (
      <Badge variant={row.status === "active" ? "default" : row.status === "pending" ? "secondary" : "outline"}>
        {row.status}
      </Badge>
    ),
  },
]

const meta = {
  title: "Business/AdvancedDataTable",
  component: AdvancedDataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof AdvancedDataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { columns, data: generateData(20), pageSize: 10 },
}

export const LargeDataset: Story = {
  args: { columns, data: generateData(100), pageSize: 10 },
}

export const WithRowClick: Story = {
  args: {
    columns,
    data: generateData(20),
    pageSize: 10,
    onRowClick: (row) => alert(`Clicked: ${row.name}`),
  },
}
