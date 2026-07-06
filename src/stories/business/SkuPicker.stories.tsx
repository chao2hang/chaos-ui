import type { Meta, StoryObj } from "@storybook/react";
import { SkuPicker } from "@/components/business/sku-picker";

const meta = { title: "Business/Pickers/SkuPicker", component: SkuPicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof SkuPicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "SKU-001", label: "Widget A (Red)" }, { value: "SKU-002", label: "Widget A (Blue)" }, { value: "SKU-003", label: "Widget B" }], placeholder: "Select SKU" } };
export const WithValue: Story = { args: { options: [{ value: "SKU-001", label: "Widget A (Red)" }], value: "SKU-001" } };
