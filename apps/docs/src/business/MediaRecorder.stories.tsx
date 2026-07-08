import type { Meta, StoryObj } from "@storybook/react"
import { MediaRecorder } from "@/components/business/media-recorder"

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
