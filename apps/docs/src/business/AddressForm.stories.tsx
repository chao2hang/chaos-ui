import type { Meta, StoryObj } from "@storybook/react";
import { AddressForm } from "@/components/business/address-form";

const meta: Meta<typeof AddressForm> = {
  title: "Business/AddressForm",
  component: AddressForm,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AddressForm onChange={() => {}} country={"示例"} />,
};
export const Prefilled: Story = {
  args: {
    value: {
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "United States",
    },
  },
};

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
};
