import type { Meta, StoryObj } from "@storybook/react"
import { ImportMappingWizard } from "@/components/business/import-mapping-wizard"

const meta: Meta<typeof ImportMappingWizard> = {
  title: "Business/ImportMappingWizard",
  component: ImportMappingWizard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
