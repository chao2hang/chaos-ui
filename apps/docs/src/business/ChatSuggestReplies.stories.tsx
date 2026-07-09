import type { Meta, StoryObj } from "@storybook/react";
import { ChatSuggestReplies } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatSuggestReplies> = {
  title: "Business/ChatSuggestReplies",
  component: ChatSuggestReplies,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
