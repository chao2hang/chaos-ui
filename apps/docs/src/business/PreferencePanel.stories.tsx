import type { Meta, StoryObj } from "@storybook/react"
import { PreferencePanel } from "@/components/business/preference-panel"

const meta: Meta<typeof PreferencePanel> = {
  title: "Business/PreferencePanel",
  component: PreferencePanel,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
