import type { Meta, StoryObj } from "@storybook/react";
import { MobileActionSheet } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof MobileActionSheet> = {
  title: "Business/MobileActionSheet",
  component: MobileActionSheet,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
