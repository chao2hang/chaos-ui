import type { Meta, StoryObj } from "@storybook/react"
import { FormGrid, FormGridItem } from "@/components/ui/form-grid"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/FormGrid",
  component: FormGrid,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof FormGrid>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <FormGrid>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Enter email" />
      </div>
    </FormGrid>
  ),
}

export const ThreeColumns: Story = {
  render: () => (
    <FormGrid columns={3}>
      <div className="space-y-2">
        <Label htmlFor="first">First Name</Label>
        <Input id="first" placeholder="John" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="middle">Middle</Label>
        <Input id="middle" placeholder="M" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="last">Last Name</Label>
        <Input id="last" placeholder="Doe" />
      </div>
    </FormGrid>
  ),
}

export const WithSpan: Story = {
  render: () => (
    <FormGrid columns={3}>
      <div className="space-y-2">
        <Label htmlFor="name2">Name</Label>
        <Input id="name2" placeholder="Name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email2">Email</Label>
        <Input id="email2" placeholder="Email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone2">Phone</Label>
        <Input id="phone2" placeholder="Phone" />
      </div>
      <FormGridItem span={2}>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Address" />
        </div>
      </FormGridItem>
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" placeholder="City" />
      </div>
    </FormGrid>
  ),
}

