import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof VideoPlayer> = {
  title: "Business/VideoPlayer",
  component: VideoPlayer,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <VideoPlayer
      src={"https://placehold.co/400x300/e2e8f0/64748b?text=Image"}
      poster={"示例"}
      autoPlay={false}
      onEnded={() => {}}
      onPlay={() => {}}
      onPause={() => {}}
    />
  ),
};
