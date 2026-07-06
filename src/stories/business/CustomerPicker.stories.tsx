import type { Meta, StoryObj } from "@storybook/react";
import { CustomerPicker } from "@/components/business/customer-picker";

const meta = { title: "Business/Pickers/CustomerPicker", component: CustomerPicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof CustomerPicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "1", label: "Alice" }, { value: "2", label: "Bob" }, { value: "3", label: "Carol" }], placeholder: "Select customer" } };
export const Disabled: Story = { args: { options: [{ value: "1", label: "Alice" }], disabled: true } };
