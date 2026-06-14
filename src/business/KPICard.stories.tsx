import type { Meta, StoryObj } from "@storybook/react";
import { KPICard } from "@/components/business/kpi-card";
import {
  DollarSignIcon,
  UsersIcon,
  TrendingUpIcon,
} from "@/components/ui/icons";

const meta = {
  title: "Business/KPICard",
  component: KPICard,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof KPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Revenue: Story = {
  args: {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeLabel: "from last month",
    icon: DollarSignIcon,
  },
};

export const Users: Story = {
  args: {
    title: "Active Users",
    value: "2,350",
    change: "+12.5%",
    changeLabel: "from last month",
    icon: UsersIcon,
  },
};

export const Growth: Story = {
  args: {
    title: "Growth Rate",
    value: "+12.3%",
    change: "-2.1%",
    changeLabel: "vs last quarter",
    icon: TrendingUpIcon,
  },
};

export const NoChange: Story = {
  args: {
    title: "Conversion Rate",
    value: "3.2%",
    change: "0%",
    changeType: "neutral",
  },
};

export const WithSparkline: Story = {
  args: {
    title: "Revenue Trend",
    value: "$45,231",
    change: "+20.1%",
    changeType: "positive",
    icon: DollarSignIcon,
    sparkline: [
      { value: 30 },
      { value: 40 },
      { value: 35 },
      { value: 50 },
      { value: 45 },
      { value: 60 },
      { value: 55 },
    ],
  },
};

export const WithTarget: Story = {
  args: {
    title: "Monthly Goal",
    value: "$50,000",
    change: "+15%",
    changeType: "positive",
    icon: DollarSignIcon,
    target: 75,
    targetLabel: "Goal Progress",
  },
};
