import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/components/business/error-boundary"

function BrokenWidget(): React.ReactNode {
  throw new Error("Revenue widget failed to load")
}

const meta = {
  title: "Business/ErrorBoundary",
  component: ErrorBoundary,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj

export const DefaultFallback: Story = {
  render: () => (
    <ErrorBoundary>
      <BrokenWidget />
    </ErrorBoundary>
  ),
}

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="max-w-md rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm font-medium">Dashboard section unavailable</p>
          <p className="mt-1 text-xs text-muted-foreground">{error.message}</p>
          <Button className="mt-3" size="sm" variant="outline" onClick={reset}>
            Try again
          </Button>
        </div>
      )}
    >
      <BrokenWidget />
    </ErrorBoundary>
  ),
}

