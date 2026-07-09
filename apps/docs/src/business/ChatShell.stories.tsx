import type { Meta, StoryObj } from "@storybook/react";
import { ChatShell } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatShell> = {
  title: "Business/ChatShell",
  component: ChatShell,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
