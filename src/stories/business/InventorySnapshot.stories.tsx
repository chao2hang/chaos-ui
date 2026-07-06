import type { Meta, StoryObj } from "@storybook/react";
import { InventorySnapshot } from "@/components/business/inventory-snapshot";

const meta = { title: "Business/Inventory/InventorySnapshot", component: InventorySnapshot, tags: ["autodocs"], parameters: { layout: "padded" }, args: { items: [] } } satisfies Meta<typeof InventorySnapshot>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { items: [{ id: "1", name: "Widget A", qty: 150, status: "normal" }, { id: "2", name: "Widget B", qty: 3, status: "low" }, { id: "3", name: "Widget C", qty: 0, status: "out" }] } };
