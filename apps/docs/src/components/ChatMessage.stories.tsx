import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessage } from "@/components/ui/chat-message";

const meta: Meta<typeof ChatMessage> = {
  title: "Components/ChatMessage",
  component: ChatMessage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
