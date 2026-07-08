import type { Meta, StoryObj } from "@storybook/react"
import { DialogFormBody } from "@/components/layout/dialog-form-body"

const meta: Meta<typeof DialogFormBody> = {
  title: "Layouts/DialogFormBody",
  component: DialogFormBody,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
