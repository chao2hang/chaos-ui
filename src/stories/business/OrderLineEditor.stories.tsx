import type { Meta, StoryObj } from "@storybook/react";
import { OrderLineEditor } from "@/components/business/order-line-editor";

const meta = { title: "Business/Orders/OrderLineEditor", component: OrderLineEditor, tags: ["autodocs"], parameters: { layout: "padded" }, args: { data: [] } } satisfies Meta<typeof OrderLineEditor>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { data: [{ sku: "SKU-001", skuLabel: "Widget A", price: 12.5, qty: 10, subtotal: 125 }, { sku: "SKU-002", skuLabel: "Widget B", price: 45, qty: 2, subtotal: 90 }] } };
export const ReadOnly: Story = { args: { data: [{ sku: "SKU-003", skuLabel: "Widget C", price: 8, qty: 5, subtotal: 40 }], readOnly: true } };
export const WithCurrency: Story = { args: { data: [{ sku: "SKU-004", skuLabel: "Widget D", price: 99, qty: 1, subtotal: 99 }], currency: "€" } };
