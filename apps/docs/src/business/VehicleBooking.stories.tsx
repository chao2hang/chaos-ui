import type { Meta, StoryObj } from "@storybook/react";
import { VehicleBooking } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof VehicleBooking> = {
  title: "Business/VehicleBooking",
  component: VehicleBooking,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
