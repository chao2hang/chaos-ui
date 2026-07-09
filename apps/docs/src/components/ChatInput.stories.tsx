import type { Meta, StoryObj } from "@storybook/react";
import { ChatInput } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof ChatInput> = {
  title: "Components/ChatInput",
  component: ChatInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
