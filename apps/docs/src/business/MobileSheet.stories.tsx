import type { Meta, StoryObj } from "@storybook/react";
import { MobileSheet } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileSheet> = {
  title: "Business/MobileSheet",
  component: MobileSheet,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
