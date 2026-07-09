import type { Meta, StoryObj } from "@storybook/react";
import { VirtualTable, type ColumnDef } from "@chaos_team/chaos-ui/ui";
import { Badge } from "@chaos_team/chaos-ui/ui";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
}

const generateData = (count: number): User[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
    status: i % 4 === 0 ? "inactive" : i % 4 === 1 ? "pending" : "active",
  }));

const columns: ColumnDef<User>[] = [
  { key: "id", header: "ID", width: 80 },
  { key: "name", header: "Name", width: 150 },
  { key: "email", header: "Email", width: 200 },
  { key: "role", header: "Role", width: 100 },
  {
    key: "status",
    header: "Status",
    width: 100,
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
        {row.status}
      </Badge>
    ),
  },
];

const meta: Meta<typeof VirtualTable> = {
  title: "Components/VirtualTable",
  component: VirtualTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: columns as any,
    data: generateData(100) as any,
    estimateRowHeight: 40,
    height: 300,
  },
};

export const LargeDataset: Story = {
  args: {
    columns: columns as any,
    data: generateData(10000) as any,
    estimateRowHeight: 40,
    height: 300,
  },
};

export const WithRowClick: Story = {
  args: {
    columns: columns as any,
    data: generateData(100) as any,
    estimateRowHeight: 40,
    height: 300,
    onRowClick: (row: any) => alert(`Clicked: ${row.name}`),
  },
};
