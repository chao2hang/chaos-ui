import type { Meta, StoryObj } from "@storybook/react"
import { AuditTrailDiff } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof AuditTrailDiff> = {
  title: "Business/AuditTrailDiff",
  component: AuditTrailDiff,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
