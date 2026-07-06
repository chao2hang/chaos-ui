import type { Meta, StoryObj } from "@storybook/react";
import { PromotionRuleCard } from "@/components/business/promotion-rule-card";

const meta = { title: "Business/Orders/PromotionRuleCard", component: PromotionRuleCard, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof PromotionRuleCard>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { name: "满200减30", type: "满减", discount: 30, threshold: 200, startDate: "2024-07-01", endDate: "2024-07-31" } };
export const Discount: Story = { args: { name: "8折特惠", type: "折扣", discount: 0.8, startDate: "2024-07-01" } };
export const Expired: Story = { args: { name: "春节促销", type: "直降", discount: 50, endDate: "2024-02-10" } };
