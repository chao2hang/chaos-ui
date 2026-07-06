import type { Meta, StoryObj } from "@storybook/react";
import { FeeTypeBrowse } from "@/components/business/fee-type-browse";

const noop = () => {};
const meta = { title: "Business/Pickers/FeeTypeBrowse", component: FeeTypeBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof FeeTypeBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ id: "1", name: "Shipping" }, { id: "2", name: "Handling" }, { id: "3", name: "Insurance" }] } };
