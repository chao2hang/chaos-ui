import type { Meta, StoryObj } from "@storybook/react"
import { ComplianceChecklist } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ComplianceChecklist> = {
  title: "Business/ComplianceChecklist",
  component: ComplianceChecklist,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
