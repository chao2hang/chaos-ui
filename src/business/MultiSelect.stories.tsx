import type { Meta, StoryObj } from "@storybook/react"
import { MultiSelect } from "@/components/business/multi-select"

const options = [
  { value: "bug", label: "Bug", group: "类型" },
  { value: "feature", label: "功能", group: "类型" },
  { value: "docs", label: "文档", group: "类型" },
  { value: "high", label: "高", group: "优先级" },
  { value: "medium", label: "中", group: "优先级" },
  { value: "low", label: "低", group: "优先级" },
  { value: "frontend", label: "前端", group: "模块" },
  { value: "backend", label: "后端", group: "模块" },
]

const meta = {
  title: "Business/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options,
    placeholder: "选择标签...",
  },
}

export const WithSelection: Story = {
  args: {
    options,
    value: ["bug", "high", "frontend"],
  },
}

export const MaxSelected: Story = {
  args: {
    options,
    value: ["bug", "feature"],
    maxSelected: 3,
    placeholder: "最多选 3 个",
  },
}

export const Dark: Story = {
  args: {
    options,
    value: ["bug", "high"],
  },
  parameters: { backgrounds: { default: "dark" } },
}
