import type { Meta, StoryObj } from "@storybook/react";
import { WriteoffBrowse } from "@/components/business/writeoff-browse";

const noop = () => {};
const meta = { title: "Business/Inventory/WriteoffBrowse", component: WriteoffBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof WriteoffBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ id: "wo1", no: "WO-2024-001", amount: 5000 }, { id: "wo2", no: "WO-2024-002", amount: 3200 }] } };
