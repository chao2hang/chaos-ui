import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "@/components/business/video-player";

const meta = {
  title: "Business/VideoPlayer",
  component: VideoPlayer,
  tags: ["autodocs"],
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
