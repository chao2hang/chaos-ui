import type { Meta, StoryObj } from "@storybook/react"
import { SegmentedControl } from "@chaos_team/chaos-ui/ui"
import { useState } from "react"
import { GridIcon, ListIcon, LayoutGridIcon } from "lucide-react"

const meta: Meta<typeof SegmentedControl> = {
  title: "Business/SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

type View = "list" | "grid" | "card"

export const Default: Story = {
  render: () => {
    const [v, setV] = useState<View>("grid")
    return (
      <div className="space-y-3">
        <SegmentedControl<View>
          value={v}
          onChange={setV}
          options={[
            { value: "list", label: "列表" },
            { value: "grid", label: "网格" },
            { value: "card", label: "卡片" },
          ]}
        />
        <p className="text-xs text-muted-foreground">当前：{v}</p>
      </div>
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const [v, setV] = useState<"list" | "grid">("list")
    return (
      <SegmentedControl
        value={v}
        onChange={setV}
        options={[
          { value: "list", label: "列表", icon: <ListIcon /> },
          { value: "grid", label: "网格", icon: <LayoutGridIcon /> },
        ]}
      />
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      <SegmentedControl
        size="sm"
        defaultValue="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
        ]}
      />
      <SegmentedControl
        size="default"
        defaultValue="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
        ]}
      />
      <SegmentedControl
        size="lg"
        defaultValue="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
        ]}
      />
    </div>
  ),
}

export const WithDisabled: Story = {
  render: () => (
    <SegmentedControl
      defaultValue="a"
      options={[
        { value: "a", label: "启用" },
        { value: "b", label: "禁用", disabled: true },
        { value: "c", label: "启用" },
      ]}
    />
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
