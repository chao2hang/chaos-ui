import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessage } from "@chaos_team/chaos-ui/ui";

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
