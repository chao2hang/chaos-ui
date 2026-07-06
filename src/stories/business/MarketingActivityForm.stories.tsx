import type { Meta, StoryObj } from "@storybook/react";
import { MarketingActivityForm } from "@/components/business/marketing-activity-form";

const meta = { title: "Business/Forms/MarketingActivityForm", component: MarketingActivityForm, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof MarketingActivityForm>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithInitial: Story = { args: { initial: { name: "Summer sale", budget: 50000 } } };
export const WithSubmit: Story = { args: { onSubmit: (data) => { void data; } } };
