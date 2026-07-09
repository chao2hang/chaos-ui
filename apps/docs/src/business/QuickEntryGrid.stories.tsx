import type { Meta, StoryObj } from "@storybook/react"
import { QuickEntryGrid } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof QuickEntryGrid> = {
  title: "Business/QuickEntryGrid",
  component: QuickEntryGrid,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
