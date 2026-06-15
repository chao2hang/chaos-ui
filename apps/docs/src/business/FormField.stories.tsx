import type { Meta, StoryObj } from "@storybook/react"
import { FormField } from "@/components/business/form-field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const meta = {
  title: "Business/FormField",
  component: FormField,
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const WithInput: Story = {
  render: () => (
    <FormField label="Email" description="We'll never share your email" required>
      <Input type="email" placeholder="Enter your email" />
    </FormField>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <FormField label="Message" description="Your feedback helps us improve" required>
      <Textarea placeholder="Type your message..." />
    </FormField>
  ),
}

export const WithError: Story = {
  render: () => (
    <FormField label="Username" error="Username is already taken" required>
      <Input defaultValue="john" aria-invalid />
    </FormField>
  ),
}

export const Optional: Story = {
  render: () => (
    <FormField label="Bio" description="Tell us about yourself (optional)">
      <Textarea placeholder="A short bio..." />
    </FormField>
  ),
}
