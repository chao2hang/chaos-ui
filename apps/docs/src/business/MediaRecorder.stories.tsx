import type { Meta, StoryObj } from "@storybook/react"
import { MediaRecorder } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof MediaRecorder> = {
  title: "Business/MediaRecorder",
  component: MediaRecorder,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
