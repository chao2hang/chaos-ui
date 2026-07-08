import type { Meta, StoryObj } from "@storybook/react"
import { WriteoffBrowse } from "@/components/business/writeoff-browse"

const meta: Meta<typeof WriteoffBrowse> = {
  title: "Business/WriteoffBrowse",
  component: WriteoffBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
