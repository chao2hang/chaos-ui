import type { Meta, StoryObj } from "@storybook/react"
import { MobileCamera } from "@/components/business/mobile-camera"

const meta: Meta<typeof MobileCamera> = {
  title: "Business/MobileCamera",
  component: MobileCamera,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
