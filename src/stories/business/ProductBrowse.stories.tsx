import type { Meta, StoryObj } from "@storybook/react";
import { ProductBrowse } from "@/components/business/product-browse";

const noop = () => {};
const meta = { title: "Business/Pickers/ProductBrowse", component: ProductBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof ProductBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ id: "1", name: "Widget A", sku: "W-001" }, { id: "2", name: "Widget B", sku: "W-002" }] } };
export const MultiSelect: Story = { args: { multiple: true, items: [{ id: "1", name: "Widget A" }, { id: "2", name: "Widget B" }] } };
