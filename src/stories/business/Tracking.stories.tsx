import type { Meta, StoryObj } from "@storybook/react";
import { Tracking } from "@/components/business/tracking";

const meta = { title: "Business/Misc/Tracking", component: Tracking, tags: ["autodocs"], parameters: { layout: "padded" }, args: { target: 0, actual: 0 } } satisfies Meta<typeof Tracking>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { target: 100, actual: 65, label: "Parcels delivered" } };
export const Complete: Story = { args: { target: 50, actual: 50, label: "Orders processed" } };
