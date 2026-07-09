import type { Meta, StoryObj } from "@storybook/react";
import { ChatSidebar } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatSidebar> = {
  title: "Business/ChatSidebar",
  component: ChatSidebar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
