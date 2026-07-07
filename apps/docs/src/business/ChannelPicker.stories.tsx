import type { Meta, StoryObj } from "@storybook/react";
import { ChannelPicker } from "@/components/business/channel-picker";

const meta = {
  title: "Business/ChannelPicker",
  component: ChannelPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof ChannelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
