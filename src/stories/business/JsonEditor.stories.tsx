import type { Meta, StoryObj } from "@storybook/react";
import { JsonEditor } from "@/components/business/json-editor";

const meta = { title: "Business/Forms/JsonEditor", component: JsonEditor, tags: ["autodocs"], parameters: { layout: "padded" }, args: { value: "" } } satisfies Meta<typeof JsonEditor>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { value: '{"name": "Alice", "age": 30}', placeholder: "Enter JSON..." } };
export const ReadOnly: Story = { args: { value: '{"status": "ok"}', readOnly: true } };
export const AutoFormat: Story = { args: { value: '{"items":[1,2,3]}', autoFormat: true } };
