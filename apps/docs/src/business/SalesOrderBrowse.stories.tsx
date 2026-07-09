import type { Meta, StoryObj } from "@storybook/react"
import { SalesOrderBrowse } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof SalesOrderBrowse> = {
  title: "Business/SalesOrderBrowse",
  component: SalesOrderBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
