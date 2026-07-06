import type { Meta, StoryObj } from "@storybook/react";
import { AccountBalance } from "@/components/business/account-balance";

const meta = {
  title: "Business/Finance/AccountBalance",
  component: AccountBalance,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { balance: 0 },
} satisfies Meta<typeof AccountBalance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    balance: 45231.89,
    currency: "CNY",
    label: "Account balance",
  },
};

export const WithTrend: Story = {
  args: {
    balance: 12500,
    currency: "USD",
    trend: 8.5,
  },
};

export const NegativeTrend: Story = {
  args: {
    balance: 3400,
    currency: "EUR",
    trend: -3.2,
    label: "Euro account",
  },
};
