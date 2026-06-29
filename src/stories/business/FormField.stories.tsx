import type { Meta, StoryObj } from "@storybook/react"
import { LabeledField } from "@/components/business/form-field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const meta = {
  title: "Business/FormField",
  component: LabeledField,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof LabeledField>

export default meta
type Story = StoryObj

export const WithInput: Story = {
  render: () => (
    <LabeledField label="Email" description="We'll never share your email" required>
      <Input type="email" placeholder="Enter your email" />
    </LabeledField>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <LabeledField label="Message" description="Your feedback helps us improve" required>
      <Textarea placeholder="Type your message..." />
    </LabeledField>
  ),
}

export const WithError: Story = {
  render: () => (
    <LabeledField label="Username" error="Username is already taken" required>
      <Input defaultValue="john" aria-invalid />
    </LabeledField>
  ),
}

export const Optional: Story = {
  render: () => (
    <LabeledField label="Bio" description="Tell us about yourself (optional)">
      <Textarea placeholder="A short bio..." />
    </LabeledField>
  ),
}

