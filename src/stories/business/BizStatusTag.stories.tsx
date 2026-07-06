import type { Meta, StoryObj } from "@storybook/react";
import { BizStatusTag } from "@/components/business/biz-status-tag";

const meta = { title: "Business/Status/BizStatusTag", component: BizStatusTag, tags: ["autodocs"], parameters: { layout: "padded" }, args: { status: "active" } } satisfies Meta<typeof BizStatusTag>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CustomLabel: Story = { args: { status: "inactive", label: "已禁用" } };
