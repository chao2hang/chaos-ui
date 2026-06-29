import type { Meta, StoryObj } from "@storybook/react"
import { DialogFormBody, FormStack } from "@/components/layout/dialog-form-body"
import { LabeledField } from "@/components/business/form-field"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

const meta = {
  title: "Layout/DialogFormBody",
  component: DialogFormBody,
  tags: ["autodocs"],
} satisfies Meta<typeof DialogFormBody>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <LabeledField label="Name" required>
          <Input placeholder="Enter name" />
        </LabeledField>
        <LabeledField label="Type">
          <Select><option value="">Select type</option></Select>
        </LabeledField>
        <LabeledField label="Description">
          <Input placeholder="Optional description" />
        </LabeledField>
      </>
    ),
  },
}

export const FormStackHorizontal: Story = {
  args: {
    children: (
      <FormStack direction="horizontal" gap={3}>
        <LabeledField label="First Name"><Input /></LabeledField>
        <LabeledField label="Last Name"><Input /></LabeledField>
      </FormStack>
    ),
  },
}
