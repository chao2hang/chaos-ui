import type { Meta, StoryObj } from "@storybook/react";
import { SalesOrderBrowse } from "@/components/business/sales-order-browse";

const noop = () => {};
const meta = { title: "Business/Orders/SalesOrderBrowse", component: SalesOrderBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof SalesOrderBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ id: "SO-001", no: "SO-2024-001" }, { id: "SO-002", no: "SO-2024-002" }] } };
