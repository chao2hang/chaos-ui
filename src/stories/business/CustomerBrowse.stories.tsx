import type { Meta, StoryObj } from "@storybook/react";
import { CustomerBrowse } from "@/components/business/customer-browse";

const noop = () => {};
const meta = { title: "Business/Pickers/CustomerBrowse", component: CustomerBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof CustomerBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }, { id: "3", name: "Carol" }] } };
export const MultiSelect: Story = { args: { multiple: true, items: [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }] } };
