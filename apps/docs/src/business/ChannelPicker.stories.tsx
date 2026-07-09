import type { Meta, StoryObj } from "@storybook/react";
import { ChannelPicker } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChannelPicker> = {
  title: "Business/ChannelPicker",
  component: ChannelPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
