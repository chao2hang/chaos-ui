import type { Meta, StoryObj } from "@storybook/react";
import { SocialShare } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof SocialShare> = {
  title: "Business/SocialShare",
  component: SocialShare,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
