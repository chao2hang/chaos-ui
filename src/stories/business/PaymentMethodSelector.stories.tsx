import type { Meta, StoryObj } from "@storybook/react";
import { PaymentMethodSelector, type PaymentMethod } from "@/components/business/payment-method-selector";

const meta = {
  title: "Business/Finance/PaymentMethodSelector",
  component: PaymentMethodSelector,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PaymentMethodSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCallback: Story = {
  args: {
    onChange: (method: PaymentMethod) => { void method; },
  },
};
