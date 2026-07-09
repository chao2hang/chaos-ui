import type { Meta, StoryObj } from "@storybook/react";
import { ExportButton } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ExportButton> = {
  title: "Business/ExportButton",
  component: ExportButton,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

const sample = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "User" },
  { id: 3, name: "Carol", role: "Editor" },
];

export const Default: Story = {
  args: {
    data: sample,
    filename: "users",
  },
};

export const CustomColumns: Story = {
  args: {
    data: sample,
    filename: "users-custom",
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "姓名" },
      { key: "role", header: "角色" },
    ],
  },
};

export const WithAllFormats: Story = {
  args: {
    data: sample,
    filename: "users-full",
    formats: ["csv", "xlsx", "json", "print"],
  },
};

export const SingleFormat: Story = {
  args: {
    data: sample,
    filename: "users-json",
    formats: ["json"],
    label: "导出 JSON",
  },
};

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
};
