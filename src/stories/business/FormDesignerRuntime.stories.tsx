import type { Meta, StoryObj } from "@storybook/react";
import { FormDesignerRuntime } from "@/components/business/form-designer-runtime";

const meta = { title: "Business/Forms/FormDesignerRuntime", component: FormDesignerRuntime, tags: ["autodocs"], parameters: { layout: "padded" }, args: { schema: {} } } satisfies Meta<typeof FormDesignerRuntime>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { schema: { fields: [{ name: "name", label: "Name", type: "text" }] } } };
export const WithValue: Story = { args: { schema: { fields: [{ name: "email", label: "Email", type: "email" }] }, value: { email: "a@b.com" } } };
