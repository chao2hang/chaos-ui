import type { Meta, StoryObj } from "@storybook/react";
import { ChatConversationSearch } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatConversationSearch> = {
  title: "Business/ChatConversationSearch",
  component: ChatConversationSearch,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
