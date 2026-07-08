import type { Meta, StoryObj } from "@storybook/react"
import { ImportErrorTable } from "@/components/business/import-error-table"

const meta: Meta<typeof ImportErrorTable> = {
  title: "Business/ImportErrorTable",
  component: ImportErrorTable,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
