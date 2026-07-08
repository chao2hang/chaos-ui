import type { Meta, StoryObj } from "@storybook/react"
import { FormSection } from "@/components/ui/form-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof FormSection> = {
  title: "Components/FormSection",
  component: FormSection,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FormSection title="Basic Information" description="Enter your details">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter email" />
        </div>
      </div>
    </FormSection>
  ),
}

export const Collapsible: Story = {
  render: () => (
    <FormSection title="Advanced Settings" description="Configure options" collapsible>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input id="api-key" placeholder="Enter API key" />
        </div>
      </div>
    </FormSection>
  ),
}

export const Required: Story = {
  render: () => (
    <FormSection title="Required Fields" description="These fields are required" required>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Enter username" />
        </div>
      </div>
    </FormSection>
  ),
}
