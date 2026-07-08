import type { Meta, StoryObj } from "@storybook/react"
import { QuickEntryGrid } from "@/components/business/quick-entry-grid"

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
