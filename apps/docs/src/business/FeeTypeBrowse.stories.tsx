import type { Meta, StoryObj } from "@storybook/react"
import { FeeTypeBrowse } from "@/components/business/fee-type-browse"

const meta: Meta<typeof FeeTypeBrowse> = {
  title: "Business/FeeTypeBrowse",
  component: FeeTypeBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
