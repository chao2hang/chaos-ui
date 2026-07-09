import type { Meta, StoryObj } from "@storybook/react";
import { ChatCommandMenu } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatCommandMenu> = {
  title: "Business/ChatCommandMenu",
  component: ChatCommandMenu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
