import type { Meta, StoryObj } from "@storybook/react";
import { CustomerPicker } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CustomerPicker> = {
  title: "Business/CustomerPicker",
  component: CustomerPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
