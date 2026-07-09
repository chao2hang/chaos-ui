import type { Meta, StoryObj } from "@storybook/react"
import { MobileInfiniteScroll } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof MobileInfiniteScroll> = {
  title: "Business/MobileInfiniteScroll",
  component: MobileInfiniteScroll,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
