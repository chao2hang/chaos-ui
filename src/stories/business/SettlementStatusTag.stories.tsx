import type { Meta, StoryObj } from "@storybook/react";
import { SettlementStatusTag } from "@/components/business/settlement-status-tag";

const meta = { title: "Business/Status/SettlementStatusTag", component: SettlementStatusTag, tags: ["autodocs"], parameters: { layout: "padded" }, args: { status: "unsettled" } } satisfies Meta<typeof SettlementStatusTag>;
export default meta; type Story = StoryObj<typeof meta>;
export const Unsettled: Story = {};
export const Partial: Story = { args: { status: "partial" } };
export const Settled: Story = { args: { status: "settled" } };
export const Overdue: Story = { args: { status: "overdue" } };
