import type { Meta, StoryObj } from "@storybook/react"
import { SqlEditor } from "@/components/business/sql-editor"

const meta: Meta<typeof SqlEditor> = {
  title: "Business/SqlEditor",
  component: SqlEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
