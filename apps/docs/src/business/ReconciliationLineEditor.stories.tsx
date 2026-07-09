import type { Meta, StoryObj } from "@storybook/react"
import { ReconciliationLineEditor } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ReconciliationLineEditor> = {
  title: "Business/ReconciliationLineEditor",
  component: ReconciliationLineEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
