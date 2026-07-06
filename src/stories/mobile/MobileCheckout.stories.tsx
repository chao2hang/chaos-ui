import type { Meta, StoryObj } from "@storybook/react";
import { MobileCheckout } from "@/components/mobile/mobile-checkout";

const meta = {
  title: "Mobile/MobileCheckout",
  component: MobileCheckout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MobileCheckout>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  args: {
    total: "¥168.00",
    itemCount: 3,
    onPay: noop,
    onBack: noop,
  },
};

export const CustomLabel: Story = {
  args: {
    total: "$42.90",
    itemCount: 1,
    payLabel: "Complete order",
    onPay: noop,
    onBack: noop,
  },
};

export const Loading: Story = {
  args: {
    total: "¥1,299.00",
    itemCount: 5,
    isLoading: true,
    onPay: noop,
    onBack: noop,
  },
};

export const TotalOnly: Story = {
  args: {
    total: "€89.50",
    onPay: noop,
  },
};
