import type { Meta, StoryObj } from "@storybook/react"
import { SearchInput } from "@/components/business/search-input"

const results = [
  { id: "1", title: "用户管理", description: "管理系统用户和权限", group: "页面" },
  { id: "2", title: "用户列表", description: "查看所有用户", group: "页面" },
  { id: "3", title: "UserCreate", description: "创建用户的 API", group: "API" },
  { id: "4", title: "UserProfile", description: "用户资料组件", group: "组件" },
]

const meta: Meta<typeof SearchInput> = {
  title: "Business/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "搜索页面、组件、API...",
  },
}

export const WithResults: Story = {
  args: {
    value: "用户",
    results,
  },
}

export const Loading: Story = {
  args: {
    value: "搜索中...",
    loading: true,
  },
}

export const Dark: Story = {
  args: {
    placeholder: "暗色主题搜索",
  },
  parameters: { backgrounds: { default: "dark" } },
}
