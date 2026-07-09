import type { Meta, StoryObj } from "@storybook/react"
import { StatCard } from "@chaos_team/chaos-ui/business"
import { TrendingUpIcon, TrendingDownIcon, UsersIcon } from "lucide-react"

const meta: Meta<typeof StatCard> = {
  title: "Business/StatCard",
  component: StatCard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Total Sales",
    value: "$125,430",
    icon: TrendingUpIcon,
    changeType: "positive",
    change: "+12.5%",
  },
}

export const DownTrend: Story = {
  args: {
    title: "Refunds",
    value: "$3,200",
    icon: TrendingDownIcon,
    changeType: "negative",
    change: "-5.2%",
  },
}

export const NoIcon: Story = {
  args: {
    title: "Customers",
    value: "1,234",
    icon: UsersIcon,
    changeType: "neutral",
  },
}
