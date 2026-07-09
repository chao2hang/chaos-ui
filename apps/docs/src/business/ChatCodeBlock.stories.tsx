import type { Meta, StoryObj } from "@storybook/react";
import { ChatCodeBlock } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatCodeBlock> = {
  title: "Business/ChatCodeBlock",
  component: ChatCodeBlock,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
