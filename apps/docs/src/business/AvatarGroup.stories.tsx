import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AvatarGroup> = {
  title: "Business/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
