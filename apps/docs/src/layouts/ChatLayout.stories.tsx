import type { Meta, StoryObj } from "@storybook/react";
import { ChatLayout } from "@/components/layout/chat-layout";

const meta: Meta<typeof ChatLayout> = {
  title: "Layouts/ChatLayout",
  component: ChatLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
