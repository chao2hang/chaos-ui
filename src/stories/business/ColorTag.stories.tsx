import type { Meta, StoryObj } from "@storybook/react";
import { ColorTag } from "@/components/business/color-tag";

const meta = { title: "Business/Pickers/ColorTag", component: ColorTag, tags: ["autodocs"], parameters: { layout: "padded" }, args: { color: "blue" } } satisfies Meta<typeof ColorTag>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: "sm", children: "Small" } };
export const Large: Story = { args: { size: "lg", children: "Large" } };
export const WithDot: Story = { args: { dot: true, color: "green" } };
