import type { Meta, StoryObj } from "@storybook/react"
import { Transfer } from "@chaos_team/chaos-ui/ui"
import { useState } from "react"

const meta: Meta<typeof Transfer> = {
  title: "Business/Transfer",
  component: Transfer,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

const dataSource = [
  { key: "1", label: "用户管理", description: "管理员可访问" },
  { key: "2", label: "订单管理" },
  { key: "3", label: "财务对账" },
  { key: "4", label: "数据看板" },
  { key: "5", label: "系统设置" },
  { key: "6", label: "角色权限" },
  { key: "7", label: "日志审计" },
  { key: "8", label: "API 密钥" },
]

export const Default: Story = {
  render: () => {
    const [keys, setKeys] = useState<string[]>(["1", "3"])
    return (
      <div className="max-w-3xl">
        <Transfer
          dataSource={dataSource}
          targetKeys={keys}
          onChange={setKeys}
          titles={["可选权限", "已分配权限"]}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <Transfer
      dataSource={dataSource}
      targetKeys={["2"]}
      disabled
      titles={["源", "目标"]}
    />
  ),
}

export const NoSearch: Story = {
  render: () => (
    <Transfer
      dataSource={dataSource.slice(0, 5)}
      targetKeys={["1"]}
      searchable={false}
    />
  ),
}

export const OneWay: Story = {
  render: () => (
    <Transfer
      dataSource={dataSource}
      targetKeys={["1"]}
      oneWay
      titles={["全部", "已选"]}
    />
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
