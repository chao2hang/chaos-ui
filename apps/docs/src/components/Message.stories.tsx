import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof Message> = {
  title: "Components/Message",
  component: Message,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
