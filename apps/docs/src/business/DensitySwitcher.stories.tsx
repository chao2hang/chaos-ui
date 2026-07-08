import type { Meta, StoryObj } from "@storybook/react"
import { DensitySwitcher } from "@/components/business/density-switcher"
import { useState } from "react"

const meta: Meta<typeof DensitySwitcher> = {
  title: "Business/DensitySwitcher",
  component: DensitySwitcher,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

type Density = "compact" | "default" | "comfortable"

const options: { id: Density; label: string }[] = [
  { id: "compact", label: "紧凑" },
  { id: "default", label: "默认" },
  { id: "comfortable", label: "舒适" },
]

export const Default: Story = {
  render: () => {
    const [d, setD] = useState<Density>("default")
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          {options.map(({ id, label }) => (
            <DensitySwitcher
              key={id}
              density={id}
              open={d === id}
              onChange={(open) => {
                if (open) setD(id)
              }}
            >
              {label}
            </DensitySwitcher>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">当前：{d}</p>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <DensitySwitcher open size="sm">小</DensitySwitcher>
      <DensitySwitcher open size="default">默认</DensitySwitcher>
      <DensitySwitcher open size="lg">大</DensitySwitcher>
    </div>
  ),
}

export const Uncontrolled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <DensitySwitcher density="compact">紧凑</DensitySwitcher>
      <DensitySwitcher density="default">默认</DensitySwitcher>
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
