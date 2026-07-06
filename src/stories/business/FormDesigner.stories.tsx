import type { Meta, StoryObj } from "@storybook/react";
import { FormDesigner } from "@/components/business/form-designer";

const meta = { title: "Business/Forms/FormDesigner", component: FormDesigner, tags: ["autodocs"], parameters: { layout: "padded" }, args: { fields: [] } } satisfies Meta<typeof FormDesigner>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { fields: [{ id: "1", label: "Title", type: "text" }, { id: "2", label: "Status", type: "select" }] } };
export const WithChange: Story = { args: { fields: [{ id: "1", label: "Name", type: "text" }], onChange: (fields) => { void fields; } } };
