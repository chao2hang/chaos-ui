import type { Meta, StoryObj } from "@storybook/react";
import { PromotionRuleEditor } from "@/components/business/promotion-rule-editor";

const meta = { title: "Business/Orders/PromotionRuleEditor", component: PromotionRuleEditor, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof PromotionRuleEditor>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithChange: Story = { args: { onChange: (rules) => { void rules; } } };
