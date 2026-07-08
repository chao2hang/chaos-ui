import type { Meta, StoryObj } from "@storybook/react"
import { CityBrowse } from "@/components/business/city-browse"

const meta: Meta<typeof CityBrowse> = {
  title: "Business/CityBrowse",
  component: CityBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
