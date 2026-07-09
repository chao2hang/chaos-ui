import type { Meta, StoryObj } from "@storybook/react";
import { ChatFeedback } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatFeedback> = {
  title: "Business/ChatFeedback",
  component: ChatFeedback,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
