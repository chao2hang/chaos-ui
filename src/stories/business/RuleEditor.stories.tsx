import type { Meta, StoryObj } from "@storybook/react";
import { RuleEditor } from "@/components/business/rule-editor";

const meta = { title: "Business/Forms/RuleEditor", component: RuleEditor, tags: ["autodocs"], parameters: { layout: "padded" }, args: { rules: [] } } satisfies Meta<typeof RuleEditor>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { rules: [{ id: "1", field: "amount", operator: "gt", value: 100, action: "apply 10% off" }, { id: "2", field: "qty", operator: "gte", value: 3, action: "free shipping" }] } };
export const SingleRule: Story = { args: { rules: [{ id: "1", field: "first_order", operator: "eq", value: true, action: "give 50 credits" }] } };
