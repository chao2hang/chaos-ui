import type { Meta, StoryObj } from "@storybook/react";
import { CouponCard } from "@/components/business/coupon-card";

const meta = { title: "Business/Status/CouponCard", component: CouponCard, tags: ["autodocs"], parameters: { layout: "padded" }, args: { value: "" } } satisfies Meta<typeof CouponCard>;
export default meta; type Story = StoryObj<typeof meta>;
const noop = () => {};
export const Default: Story = { args: { value: "¥50", description: "Orders over ¥200", expiresAt: "2024-12-31", onUse: noop } };
export const Used: Story = { args: { value: "20% OFF", used: true } };
export const ExpiringSoon: Story = { args: { value: "$10", expiresAt: "2024-07-15", description: "No minimum" } };
