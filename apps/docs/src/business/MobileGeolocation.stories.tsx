import type { Meta, StoryObj } from "@storybook/react";
import { MobileGeolocation } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof MobileGeolocation> = {
  title: "Business/MobileGeolocation",
  component: MobileGeolocation,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
