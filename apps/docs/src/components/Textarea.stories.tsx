import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: "Type your message here." },
}

export const WithValue: Story = {
  args: { defaultValue: "This is a textarea with content." },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled textarea" },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." />
    </div>
  ),
}

export const Invalid: Story = {
  args: { "aria-invalid": true, placeholder: "Invalid input" },
}

export const Comment: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Comment</Label>
      <Textarea id="comment" placeholder="Share your thoughts..." rows={5} />
      <p className="text-xs text-muted-foreground">
        Your comment will be visible to other users.
      </p>
    </div>
  ),
}
