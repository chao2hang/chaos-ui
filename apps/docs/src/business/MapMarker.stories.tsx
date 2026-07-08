import type { Meta, StoryObj } from "@storybook/react"
import { MapMarker } from "@/components/business/map-marker"

const meta: Meta<typeof MapMarker> = {
  title: "Business/MapMarker",
  component: MapMarker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
