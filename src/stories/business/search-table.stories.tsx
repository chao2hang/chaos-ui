import type { Meta, StoryObj } from "@storybook/react";
import { SearchTable } from "@/components/business/search-table";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const columns = [
  { key: "id", title: "ID", width: 80 },
  { key: "name", title: "Name" },
  { key: "email", title: "Email", ellipsis: true },
  { key: "role", title: "Role", width: 120 },
  {
    key: "status",
    title: "Status",
    width: 100,
    render: (value: unknown) => (
      <span
        className={
          value === "active"
            ? "font-medium text-green-600"
            : "text-muted-foreground"
        }
      >
        {String(value)}
      </span>
    ),
  },
];

const mockUsers: UserRecord[] = Array.from({ length: 28 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
  status: i % 5 === 0 ? "inactive" : "active",
}));

const meta = {
  title: "Business/DataDisplay/SearchTable",
  component: SearchTable,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: columns as any,
    dataSource: mockUsers.slice(0, 10) as any,
  },
};

export const WithPagination: Story = {
  args: {
    columns: columns as any,
    dataSource: mockUsers as any,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 28,
      onChange: () => {},
    },
  },
};

export const Loading: Story = {
  args: {
    columns: columns as any,
    dataSource: [] as any,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: columns as any,
    dataSource: [] as any,
    emptyText: "No users found",
  },
};

export const WithRowClick: Story = {
  args: {
    columns: columns as any,
    dataSource: mockUsers.slice(0, 5) as any,
    onRow: (record: any) => ({
      onClick: () => alert(`Clicked user: ${record.name}`),
    }),
  },
};
