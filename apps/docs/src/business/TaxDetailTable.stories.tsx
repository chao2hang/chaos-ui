import type { Meta, StoryObj } from "@storybook/react"
import { TaxDetailTable } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof TaxDetailTable> = {
  title: "Business/TaxDetailTable",
  component: TaxDetailTable,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
