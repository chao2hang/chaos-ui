import type { Meta, StoryObj } from "@storybook/react"
import { KPIPanel, type KPIItem } from "@/components/ui/kpi-panel"
import { DollarSignIcon, UsersIcon, ShoppingCartIcon, TrendingUpIcon } from "lucide-react"

const meta = {
  title: "Components/KPIPanel",
  component: KPIPanel,
  tags: ["autodocs"],
} satisfies Meta<typeof KPIPanel>

export default meta
type Story = StoryObj<typeof meta>

const sampleItems: KPIItem[] = [
  { label: "Total Revenue", value: "$45,231.89", change: 20.1, changeLabel: "from last month", icon: <DollarSignIcon className="size-4" />, trend: "up" },
  { label: "Subscriptions", value: "+2,350", change: 180.1, changeLabel: "from last month", icon: <UsersIcon className="size-4" />, trend: "up" },
  { label: "Sales", value: "+12,234", change: 19, changeLabel: "from last month", icon: <ShoppingCartIcon className="size-4" />, trend: "up" },
  { label: "Active Now", value: "+573", change: -2.5, changeLabel: "from last hour", icon: <TrendingUpIcon className="size-4" />, trend: "down" },
]

export const Default: Story = {
  args: { items: sampleItems },
}

export const TwoColumns: Story = {
  args: { items: sampleItems.slice(0, 2), columns: 2 },
}

export const Small: Story = {
  args: { items: sampleItems, size: "sm" },
}
