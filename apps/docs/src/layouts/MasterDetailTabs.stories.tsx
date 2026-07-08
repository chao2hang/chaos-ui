import type { Meta, StoryObj } from "@storybook/react"
import { MasterDetailTabs } from "@/components/layout/master-detail-tabs"

const meta: Meta<typeof MasterDetailTabs> = {
  title: "Layouts/MasterDetailTabs",
  component: MasterDetailTabs,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
