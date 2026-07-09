import type { Meta, StoryObj } from "@storybook/react";
import { MobileEmptyState } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileEmptyState> = {
  title: "Business/MobileEmptyState",
  component: MobileEmptyState,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
