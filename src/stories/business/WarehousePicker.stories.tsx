import type { Meta, StoryObj } from "@storybook/react";
import { WarehousePicker } from "@/components/business/warehouse-picker";

const meta = { title: "Business/Inventory/WarehousePicker", component: WarehousePicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof WarehousePicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "w1", label: "Main Warehouse" }, { value: "w2", label: "East Depot" }], placeholder: "Select warehouse" } };
export const WithValue: Story = { args: { options: [{ value: "w1", label: "Main Warehouse" }], value: "w1" } };
