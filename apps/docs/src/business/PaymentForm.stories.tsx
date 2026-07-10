import type { Meta, StoryObj } from "@storybook/react";
import { PaymentForm } from "@/components/business/payment-form";

const meta: Meta<typeof PaymentForm> = {
  title: "Business/PaymentForm",
  component: PaymentForm,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PaymentForm onSubmit={() => {}} />,
};
export const WithSubmitHandler: Story = {
  args: {
    onSubmit: (data) => {
      console.log("Payment submitted:", data);
    },
  },
};

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
};
