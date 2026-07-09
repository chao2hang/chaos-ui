import type { Meta, StoryObj } from "@storybook/react";
import { ChatVoiceMessage } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatVoiceMessage> = {
  title: "Business/ChatVoiceMessage",
  component: ChatVoiceMessage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
