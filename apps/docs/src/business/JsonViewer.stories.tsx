import type { Meta, StoryObj } from "@storybook/react"
import { JsonViewer } from "@/components/business/json-viewer"

const sampleData = {
  name: "张三",
  age: 28,
  active: true,
  address: {
    city: "北京",
    district: "朝阳区",
    zip: "100000",
  },
  tags: ["developer", "frontend"],
  score: null,
}

const meta = {
  title: "Business/JsonViewer",
  component: JsonViewer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof JsonViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: sampleData,
  },
}

export const Collapsed: Story = {
  args: {
    data: sampleData,
    defaultCollapsedDepth: 1,
  },
}

export const ArrayData: Story = {
  args: {
    data: [1, 2, 3, { key: "value" }, [4, 5]],
  },
}

export const Dark: Story = {
  args: {
    data: sampleData,
  },
  parameters: { backgrounds: { default: "dark" } },
}
