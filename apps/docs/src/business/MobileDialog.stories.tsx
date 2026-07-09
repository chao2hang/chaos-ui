import type { Meta, StoryObj } from "@storybook/react";
import { MobileDialog } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileDialog> = {
  title: "Business/MobileDialog",
  component: MobileDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
