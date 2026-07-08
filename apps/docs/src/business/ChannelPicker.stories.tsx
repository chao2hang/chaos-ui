import type { Meta, StoryObj } from "@storybook/react";
import { ChannelPicker } from "@/components/business/channel-picker";

const meta: Meta<typeof ChannelPicker> = {
  title: "Business/ChannelPicker",
  component: ChannelPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
