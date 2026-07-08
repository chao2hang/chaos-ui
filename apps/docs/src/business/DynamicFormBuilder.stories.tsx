import type { Meta, StoryObj } from "@storybook/react"
import { DynamicFormBuilder } from "@/components/business/dynamic-form-builder"

const meta: Meta<typeof DynamicFormBuilder> = {
  title: "Business/DynamicFormBuilder",
  component: DynamicFormBuilder,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
