import type { Meta, StoryObj } from "@storybook/react";
import { LineEditor } from "@/components/business/line-editor";

const meta = { title: "Business/Forms/LineEditor", component: LineEditor, tags: ["autodocs"], parameters: { layout: "padded" }, args: { columns: [], data: [] } } satisfies Meta<typeof LineEditor>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { columns: [{ key: "name", title: "Item", type: "text" }, { key: "qty", title: "Qty", type: "number" }, { key: "price", title: "Price", type: "number" }], data: [{ name: "Widget A", qty: 10, price: 12.5 }, { name: "Widget B", qty: 5, price: 45 }] } };
export const SingleRow: Story = { args: { columns: [{ key: "desc", title: "Description", type: "text" }], data: [{ desc: "Sample item" }] } };
