import type { Meta, StoryObj } from "@storybook/react";
import { DynamicFormBuilder } from "@/components/business/dynamic-form-builder";

const schema = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "role", label: "Role", type: "select", options: ["Admin", "Editor", "Viewer"] },
];

const meta = { title: "Business/Forms/DynamicFormBuilder", component: DynamicFormBuilder, tags: ["autodocs"], parameters: { layout: "padded" }, args: { schema: [] } } satisfies Meta<typeof DynamicFormBuilder>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { schema } };
export const WithValue: Story = { args: { schema, value: { name: "Alice", email: "alice@example.com", role: "Admin" } } };
export const WithChangeCallback: Story = { args: { schema, onChange: (val) => { void val; } } };
