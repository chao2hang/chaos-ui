import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof VideoPlayer> = {
  title: "Business/VideoPlayer",
  component: VideoPlayer,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
