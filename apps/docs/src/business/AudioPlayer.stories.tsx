import type { Meta, StoryObj } from "@storybook/react";
import { AudioPlayer } from "@/components/business/audio-player";

const meta = {
  title: "Business/AudioPlayer",
  component: AudioPlayer,
  tags: ["autodocs"],
} satisfies Meta<typeof AudioPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
