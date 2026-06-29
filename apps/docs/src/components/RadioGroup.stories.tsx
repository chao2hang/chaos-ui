import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" disabled>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className="grid gap-4">
      <Label className="flex items-start gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
        <RadioGroupItem value="card" id="card" className="mt-1" />
        <div>
          <div className="font-medium">Credit Card</div>
          <div className="text-sm text-muted-foreground">Pay with your credit card</div>
        </div>
      </Label>
      <Label className="flex items-start gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
        <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
        <div>
          <div className="font-medium">PayPal</div>
          <div className="text-sm text-muted-foreground">Pay with your PayPal account</div>
        </div>
      </Label>
    </RadioGroup>
  ),
}
