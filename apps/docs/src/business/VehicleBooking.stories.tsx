import type { Meta, StoryObj } from "@storybook/react"
import { VehicleBooking } from "@/components/business/vehicle-booking"

const meta: Meta<typeof VehicleBooking> = {
  title: "Business/VehicleBooking",
  component: VehicleBooking,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
