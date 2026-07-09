import type { Meta, StoryObj } from "@storybook/react";
import { ChatThinkingBlock } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatThinkingBlock> = {
  title: "Business/ChatThinkingBlock",
  component: ChatThinkingBlock,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
