import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs", "a11y"],
  argTypes: {
    ratio: {
      control: { type: "number", min: 0.5, max: 3, step: 0.1 },
      description: "The width / height ratio to preserve",
    },
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <AspectRatio {...args} className="w-full max-w-[360px] rounded-lg border bg-muted">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-muted-foreground">16:9 preview</span>
      </div>
    </AspectRatio>
  ),
}

export const Square: Story = {
  render: () => (
    <AspectRatio ratio={1} className="w-56 rounded-lg border bg-card">
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-sm font-medium">1:1 avatar crop</span>
      </div>
    </AspectRatio>
  ),
}

export const Portrait: Story = {
  render: () => (
    <AspectRatio ratio={3 / 4} className="w-48 rounded-lg border bg-muted">
      <div className="absolute inset-0 flex items-end p-4">
        <span className="text-sm font-medium">3:4 poster</span>
      </div>
    </AspectRatio>
  ),
}

export const Gallery: Story = {
  render: () => (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
      <AspectRatio ratio={4 / 3} className="rounded-lg border bg-muted">
        <div className="absolute inset-0 grid place-items-center text-sm">4:3</div>
      </AspectRatio>
      <AspectRatio ratio={1} className="rounded-lg border bg-muted">
        <div className="absolute inset-0 grid place-items-center text-sm">1:1</div>
      </AspectRatio>
      <AspectRatio ratio={16 / 9} className="rounded-lg border bg-muted">
        <div className="absolute inset-0 grid place-items-center text-sm">16:9</div>
      </AspectRatio>
    </div>
  ),
}

