import type { Meta, StoryObj } from "@storybook/react"
import { ErrorBoundary } from "@/components/business/error-boundary"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Business/ErrorBoundary",
  component: ErrorBoundary,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error("炸弹爆炸了")
  return <div className="p-4 text-sm">正常内容</div>
}

export const Default: Story = {
  render: () => (
    <div className="rounded-md border p-4">
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="rounded-md border p-4">
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    </div>
  ),
}

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="space-y-3 rounded-md border bg-muted/30 p-6 text-center">
          <p className="text-sm">自定义错误：{error.message}</p>
          <Button size="sm" onClick={reset}>重试</Button>
        </div>
      )}
    >
      <Bomb shouldThrow={true} />
    </ErrorBoundary>
  ),
}

export const Dark: Story = {
  ...WithError,
  parameters: { backgrounds: { default: "dark" } },
}
