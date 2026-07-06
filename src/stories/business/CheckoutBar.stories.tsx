import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutBar } from "@/components/business/checkout-bar";

const meta = {
  title: "Business/Nav/CheckoutBar",
  component: CheckoutBar,
  tags: ["autodocs"],
  parameters: { layout: "pinned" },
  args: { total: "0" },
} satisfies Meta<typeof CheckoutBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  args: {
    total: "$168.00",
    payLabel: "Pay now",
    onPay: noop,
  },
};

export const Loading: Story = {
  args: {
    total: "¥1,299.00",
    isLoading: true,
    onPay: noop,
  },
};

export const CustomCurrency: Story = {
  args: {
    total: 89.50,
    currency: "EUR",
    payLabel: "Zahlen",
    onPay: noop,
  },
};
