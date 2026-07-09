import type { Meta, StoryObj } from "@storybook/react";
import { MobileButton } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileButton> = {
  title: "Business/MobileButton",
  component: MobileButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
