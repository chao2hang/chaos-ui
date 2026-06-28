import type { Meta, StoryObj } from "@storybook/react"
import { Watermark } from "@/components/ui/watermark"

const meta = {
  title: "Business/Watermark",
  component: Watermark,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Watermark>

export default meta
type Story = StoryObj<typeof meta>

export const Contained: Story = {
  render: () => (
    <div className="relative h-72 overflow-hidden rounded-lg border bg-card p-6">
      <Watermark fullPage={false} text="CONFIDENTIAL" opacity={0.1} />
      <div className="relative z-10 max-w-md">
        <p className="text-sm font-medium">Quarterly performance memo</p>
        <p className="mt-2 text-sm text-muted-foreground">
          This preview demonstrates a local watermark layered over sensitive report content.
        </p>
      </div>
    </div>
  ),
}

export const CustomText: Story = {
  render: () => (
    <div className="relative h-72 overflow-hidden rounded-lg border bg-card p-6">
      <Watermark
        fullPage={false}
        text="QXY FOODS"
        color="var(--primary)"
        fontSize={20}
        opacity={0.14}
      />
      <div className="relative z-10 text-sm">Brand review document</div>
    </div>
  ),
}

