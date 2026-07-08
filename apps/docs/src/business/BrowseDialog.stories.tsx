import type { Meta, StoryObj } from "@storybook/react"
import { BrowseDialog } from "@/components/business/browse-dialog"

const meta: Meta<typeof BrowseDialog> = {
  title: "Business/BrowseDialog",
  component: BrowseDialog,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
