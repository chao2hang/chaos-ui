import type { Meta, StoryObj } from "@storybook/react";
import { BadgeDelta } from "@/components/business/badge-delta";

const meta = { title: "Business/Status/BadgeDelta", component: BadgeDelta, tags: ["autodocs"], parameters: { layout: "padded" }, args: { value: 0 } } satisfies Meta<typeof BadgeDelta>;
export default meta; type Story = StoryObj<typeof meta>;
export const Positive: Story = { args: { value: 12.5 } };
export const Negative: Story = { args: { value: -3.2 } };
export const WithPrefix: Story = { args: { value: 8.1, prefix: "+", suffix: "%" } };
