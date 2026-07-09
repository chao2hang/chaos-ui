import type { Meta, StoryObj } from "@storybook/react";
import { ChatBranch } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatBranch> = {
  title: "Business/ChatBranch",
  component: ChatBranch,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
