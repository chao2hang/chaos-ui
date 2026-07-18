import type { Meta, StoryObj } from "@storybook/react";
import {
  AdvancedDataTable,
  type ColumnDef,
} from "@/components/business/advanced-data-table";
import { Badge } from "@/components/ui/badge";

type User = Record<string, unknown> & {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
};

const generateData = (count: number): User[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
    status: i % 4 === 0 ? "inactive" : i % 4 === 1 ? "pending" : "active",
  }));

const columns: ColumnDef[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge
        variant={
          row.status === "active"
            ? "default"
            : row.status === "pending"
              ? "secondary"
              : "outline"
        }
      >
        {String(row.status)}
      </Badge>
    ),
  },
];

const meta = {
  title: "Deprecated/AdvancedDataTable",
  component: AdvancedDataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "**Deprecated.** Prefer SearchTable / DataTable / ProTable / ReportTable. Kept for 1.x compatibility only.",
      },
    },
  },
} satisfies Meta<typeof AdvancedDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { columns, data: generateData(20), pageSize: 10 },
};

export const LargeDataset: Story = {
  args: { columns, data: generateData(100), pageSize: 10 },
};

export const WithRowClick: Story = {
  args: {
    columns,
    data: generateData(20),
    pageSize: 10,
    onRowClick: (row) => alert(`Clicked: ${String(row.name)}`),
  },
};
