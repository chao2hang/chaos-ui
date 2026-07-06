import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessage } from "@/components/ui/chat-message";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const meta = {
  title: "Components/ChatMessage",
  component: ChatMessage,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

const userAvatar = (
  <Avatar className="size-8">
    <AvatarFallback>AC</AvatarFallback>
  </Avatar>
);
const assistantAvatar = (
  <Avatar className="size-8">
    <AvatarFallback>AI</AvatarFallback>
  </Avatar>
);

export const UserMessage: Story = {
  args: {
    role: "user",
    name: "Alice Chen",
    time: "10:24 AM",
    avatar: userAvatar,
    content: "How do I set up the Chaos UI package in a Next.js project?",
  },
};

export const AssistantMessage: Story = {
  args: {
    role: "assistant",
    name: "Chaos Assistant",
    time: "10:24 AM",
    avatar: assistantAvatar,
    content:
      "Install `@chaos_team/chaos-ui`, mount `<MessageProvider />` and `<ModalProvider />` in your root layout, and you're set.",
  },
};

export const SystemMessage: Story = {
  args: {
    role: "system",
    content: "The assistant switched to reasoning mode.",
  },
};

export const NoTimestamp: Story = {
  args: {
    role: "user",
    name: "Alice Chen",
    avatar: userAvatar,
    content: "Quick question — no time shown.",
  },
};
