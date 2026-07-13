import type { Meta, StoryObj } from "@storybook/react";
import { PaymentMethodSelector } from "@/components/business/payment-method-selector";

const meta = {
  title: "Business/PaymentMethodSelector",
  component: PaymentMethodSelector,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PaymentMethodSelector>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Checkout: Story = {
  args: {
    value: "alipay",
    onChange: (method: string) => console.log(method),
  } as any,
};
