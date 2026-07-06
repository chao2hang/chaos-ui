import type { Meta, StoryObj } from "@storybook/react";
import { CrudPage } from "@/components/business/crud-page";

const noopSearch = (values: Record<string, unknown>) => { void values; };
const noopPagination = {
  current: 1,
  pageSize: 10,
  total: 30,
  onChange: (_page: number, _ps: number) => {},
};

const meta = {
  title: "Business/CRUD/CrudPage",
  component: CrudPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: "Users",
    filterFields: [],
    columns: [],
    dataSource: [],
    onSearch: noopSearch,
    pagination: noopPagination,
  },
} satisfies Meta<typeof CrudPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filterFields: [
      { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }] },
      { key: "keyword", label: "Search", type: "input" },
    ],
    columns: [
      { key: "id", title: "ID" },
      { key: "name", title: "Name" },
      { key: "email", title: "Email" },
    ],
    dataSource: [
      { id: "1", name: "Alice", email: "alice@example.com" },
      { id: "2", name: "Bob", email: "bob@example.com" },
    ],
  },
};

export const Loading: Story = {
  args: {
    filterFields: [{ key: "q", label: "Search", type: "input" }],
    columns: [{ key: "name", title: "Name" }],
    dataSource: [],
    loading: true,
  },
};
