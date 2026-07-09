import type { Meta, StoryObj } from "@storybook/react";
import { MobilePageShell } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof MobilePageShell> = {
  title: "Business/MobilePageShell",
  component: MobilePageShell,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
