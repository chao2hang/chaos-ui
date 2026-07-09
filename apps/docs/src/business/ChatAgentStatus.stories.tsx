import type { Meta, StoryObj } from "@storybook/react";
import { ChatAgentStatus } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatAgentStatus> = {
  title: "Business/ChatAgentStatus",
  component: ChatAgentStatus,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
