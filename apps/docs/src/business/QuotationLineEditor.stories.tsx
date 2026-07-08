import type { Meta, StoryObj } from "@storybook/react"
import { QuotationLineEditor } from "@/components/business/quotation-line-editor"

const meta: Meta<typeof QuotationLineEditor> = {
  title: "Business/QuotationLineEditor",
  component: QuotationLineEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
