import type { Meta, StoryObj } from "@storybook/react";
import { AudioPlayer } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof AudioPlayer> = {
  title: "Business/AudioPlayer",
  component: AudioPlayer,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
