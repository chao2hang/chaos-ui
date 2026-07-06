import type { Meta, StoryObj } from "@storybook/react";
import { WarehouseBrowse } from "@/components/business/warehouse-browse";

const noop = () => {};
const meta = { title: "Business/Inventory/WarehouseBrowse", component: WarehouseBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof WarehouseBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ id: "w1", name: "Main Warehouse" }, { id: "w2", name: "East Depot" }] } };
