import type { Meta, StoryObj } from "@storybook/react"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ThemeToggle } from "@/components/business/theme-toggle"

const meta = {
  title: "Business/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs", "a11y"],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutSystem: Story = {
  args: {
    showSystem: false,
  },
}

export const InToolbar: Story = {
  render: () => (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div>
        <p className="text-sm font-medium">Workspace appearance</p>
        <p className="text-xs text-muted-foreground">Toggle the documentation preview theme.</p>
      </div>
      <ThemeToggle />
    </div>
  ),
}

