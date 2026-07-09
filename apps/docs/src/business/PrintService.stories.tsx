import type { Meta, StoryObj } from "@storybook/react"
import { PrintService } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof PrintService> = {
  title: "Business/PrintService",
  component: PrintService,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
