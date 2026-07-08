import type { Meta, StoryObj } from "@storybook/react"
import { MapTrack } from "@/components/business/map-track"

const meta: Meta<typeof MapTrack> = {
  title: "Business/MapTrack",
  component: MapTrack,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
