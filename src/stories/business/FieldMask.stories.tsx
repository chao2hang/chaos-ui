import type { Meta, StoryObj } from "@storybook/react";
import { FieldMask } from "@/components/business/field-mask";

const meta = { title: "Business/Forms/FieldMask", component: FieldMask, tags: ["autodocs"], parameters: { layout: "padded" }, args: { value: "" } } satisfies Meta<typeof FieldMask>;
export default meta; type Story = StoryObj<typeof meta>;
export const Masked: Story = { args: { value: "13800138000" } };
export const FullView: Story = { args: { value: "13800138000", canView: true } };
export const CustomMask: Story = { args: { value: "admin@example.com", mask: (val: string) => val.replace(/(.{3}).*(@.*)/, "$1***$2") } };
