import type { Meta, StoryObj } from "@storybook/react";
import { DeltaBar } from "@/components/business/delta-bar";

const meta = { title: "Business/Charts/DeltaBar", component: DeltaBar, tags: ["autodocs"], parameters: { layout: "padded" }, args: { value: 0 } } satisfies Meta<typeof DeltaBar>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { value: 65, maxValue: 100, label: "Progress" } };
export const OverMax: Story = { args: { value: 120, maxValue: 100 } };
