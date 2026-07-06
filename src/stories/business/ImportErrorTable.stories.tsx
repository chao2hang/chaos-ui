import type { Meta, StoryObj } from "@storybook/react";
import { ImportErrorTable } from "@/components/business/import-error-table";

const meta = {
  title: "Business/DataDisplay/ImportErrorTable",
  component: ImportErrorTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { errors: [] },
} satisfies Meta<typeof ImportErrorTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errors: [
      { row: 3, field: "Email", value: "not-an-email", message: "Invalid email format" },
      { row: 7, field: "Age", value: "-5", message: "Must be a positive number" },
      { row: 12, message: "Duplicate record" },
    ],
  },
};

export const SingleError: Story = {
  args: {
    errors: [{ row: 5, field: "Phone", value: "abc", message: "Invalid phone number" }],
  },
};

export const WithExport: Story = {
  args: {
    errors: [{ row: 1, field: "Name", value: "", message: "Required field is empty" }],
    onExport: () => {},
  },
};
