import type { Meta, StoryObj } from "@storybook/react";
import { PaymentResult } from "@/components/business/payment-result";

const meta = {
  title: "Business/Finance/PaymentResult",
  component: PaymentResult,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { status: "success" },
} satisfies Meta<typeof PaymentResult>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Success: Story = {
  args: {
    orderId: "TXN-8821",
    amount: "$450.00",
    primaryLabel: "View order",
    onPrimary: noop,
    secondaryLabel: "Back to home",
    onSecondary: noop,
  },
};

export const Fail: Story = {
  args: {
    status: "fail",
    orderId: "TXN-9912",
    primaryLabel: "Try again",
    onPrimary: noop,
  },
};

export const Minimal: Story = {
  args: { status: "success" },
};
