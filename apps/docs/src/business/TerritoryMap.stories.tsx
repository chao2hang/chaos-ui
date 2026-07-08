import type { Meta, StoryObj } from "@storybook/react"
import { TerritoryMap } from "@/components/business/territory-map"

const meta: Meta<typeof TerritoryMap> = {
  title: "Business/TerritoryMap",
  component: TerritoryMap,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
