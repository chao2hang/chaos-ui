import type { Meta, StoryObj } from "@storybook/react";
import { PriceAdjustBrowse } from "@/components/business/price-adjust-browse";

const noop = () => {};
const meta = { title: "Business/Pickers/PriceAdjustBrowse", component: PriceAdjustBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof PriceAdjustBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ id: "1", no: "ADJ-001" }, { id: "2", no: "ADJ-002" }] } };
