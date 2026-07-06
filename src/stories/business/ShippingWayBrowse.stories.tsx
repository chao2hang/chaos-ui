import type { Meta, StoryObj } from "@storybook/react";
import { ShippingWayBrowse } from "@/components/business/shipping-way-browse";

const noop = () => {};
const meta = { title: "Business/Pickers/ShippingWayBrowse", component: ShippingWayBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof ShippingWayBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ id: "1", name: "Standard" }, { id: "2", name: "Express" }, { id: "3", name: "Overnight" }] } };
