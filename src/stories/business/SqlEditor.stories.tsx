import type { Meta, StoryObj } from "@storybook/react";
import { SqlEditor } from "@/components/business/sql-editor";

const meta = { title: "Business/Forms/SqlEditor", component: SqlEditor, tags: ["autodocs"], parameters: { layout: "padded" }, args: { value: "" } } satisfies Meta<typeof SqlEditor>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { value: "SELECT * FROM users WHERE active = 1", placeholder: "Write SQL..." } };
export const ReadOnly: Story = { args: { value: "SELECT id, name FROM orders", readOnly: true } };
