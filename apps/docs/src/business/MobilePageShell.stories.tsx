import type { Meta, StoryObj } from "@storybook/react"
import { MobilePageShell } from "@/components/business/mobile-page-shell"

const meta: Meta<typeof MobilePageShell> = {
  title: "Business/MobilePageShell",
  component: MobilePageShell,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
