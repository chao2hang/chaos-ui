import type { Meta, StoryObj } from "@storybook/react";
import { TargetProgress } from "@/components/business/target-progress";

const meta = { title: "Business/Misc/TargetProgress", component: TargetProgress, tags: ["autodocs"], parameters: { layout: "padded" }, args: { target: 0, actual: 0 } } satisfies Meta<typeof TargetProgress>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { target: 100000, actual: 75000, period: "Q3 2024" } };
export const Exceeded: Story = { args: { target: 50000, actual: 62000 } };
