import type { Meta, StoryObj } from "@storybook/react"
import { ApplicationForm } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ApplicationForm> = {
  title: "Business/ApplicationForm",
  component: ApplicationForm,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
