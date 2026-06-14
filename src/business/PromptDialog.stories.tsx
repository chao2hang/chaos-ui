import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PromptDialog } from "@/components/business/prompt-dialog"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Business/PromptDialog",
  component: PromptDialog,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof PromptDialog>

export default meta
type Story = StoryObj<typeof meta>
type PromptDialogProps = React.ComponentProps<typeof PromptDialog>

function PromptDialogDemo(args: PromptDialogProps) {
  const [open, setOpen] = React.useState(args.open ?? true)
  const [value, setValue] = React.useState(args.defaultValue ?? "")

  return (
    <div className="flex min-h-48 flex-col items-start gap-3">
      <Button onClick={() => setOpen(true)}>Open prompt</Button>
      {value && (
        <p className="text-sm text-muted-foreground">
          Last submitted: <span className="font-mono">{value}</span>
        </p>
      )}
      <PromptDialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        onConfirm={(nextValue) => {
          setValue(nextValue)
          args.onConfirm?.(nextValue)
        }}
      />
    </div>
  )
}

export const Default: Story = {
  args: {
    title: "Name this filter",
    description: "Use a short name so your team can quickly find it later.",
    label: "Filter name",
    placeholder: "High value customers",
    confirmText: "Save filter",
  },
  render: (args) => <PromptDialogDemo {...args} />,
}

export const WithDefaultValue: Story = {
  args: {
    title: "Rename dashboard",
    label: "Dashboard name",
    defaultValue: "Weekly growth overview",
    confirmText: "Rename",
  },
  render: (args) => <PromptDialogDemo {...args} />,
}

export const OptionalEmail: Story = {
  args: {
    title: "Invite reviewer",
    description: "Leave blank if you want to share the link manually.",
    label: "Reviewer email",
    placeholder: "reviewer@example.com",
    inputType: "email",
    required: false,
    confirmText: "Continue",
  },
  render: (args) => <PromptDialogDemo {...args} />,
}

export const RequiredValidation: Story = {
  args: {
    open: true,
    title: "Required prompt",
    description: "Click confirm without typing to see the inline validation state.",
    label: "Required value",
    placeholder: "Type something",
    required: true,
  },
}

