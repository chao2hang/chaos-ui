import type { Meta, StoryObj } from "@storybook/react"
import { CompanyBrowse } from "@/components/business/company-browse"

const meta: Meta<typeof CompanyBrowse> = {
  title: "Business/CompanyBrowse",
  component: CompanyBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
