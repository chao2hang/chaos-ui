import type { Meta, StoryObj } from "@storybook/react";
import { AddressPicker } from "@/components/business/address-picker";

const meta = {
  title: "Business/AddressPicker",
  component: AddressPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof AddressPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
