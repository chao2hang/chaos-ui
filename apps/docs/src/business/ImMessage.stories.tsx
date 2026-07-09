import type { Meta, StoryObj } from "@storybook/react";
import { ImMessage } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ImMessage> = {
  title: "Business/ImMessage",
  component: ImMessage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
