import type { Meta, StoryObj } from "@storybook/react"
import { MobileInfiniteScroll } from "@/components/business/mobile-infinite-scroll"

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
