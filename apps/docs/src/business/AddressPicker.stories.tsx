import type { Meta, StoryObj } from "@storybook/react";
import { AddressPicker } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AddressPicker> = {
  title: "Business/AddressPicker",
  component: AddressPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
