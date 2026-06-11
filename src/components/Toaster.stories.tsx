import type { Meta, StoryObj } from "@storybook/react"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const meta = {
  title: "Components/Toaster",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button onClick={() => toast("Event has been created")}>Show Toast</Button>
        <Button variant="secondary" onClick={() => toast.success("Successfully saved!")}>
          Success Toast
        </Button>
        <Button variant="destructive" onClick={() => toast.error("Something went wrong")}>
          Error Toast
        </Button>
        <Button variant="outline" onClick={() => toast.info("New update available")}>
          Info Toast
        </Button>
        <Button variant="outline" onClick={() => toast.warning("Storage almost full")}>
          Warning Toast
        </Button>
      </div>
    </div>
  ),
}
