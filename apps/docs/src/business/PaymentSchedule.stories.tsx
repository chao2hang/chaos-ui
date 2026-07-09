import type { Meta, StoryObj } from "@storybook/react";
import { PaymentSchedule } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof PaymentSchedule> = {
  title: "Business/PaymentSchedule",
  component: PaymentSchedule,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
