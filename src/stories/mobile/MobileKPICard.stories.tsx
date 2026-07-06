import type { Meta, StoryObj } from "@storybook/react";
import { MobileKPICard } from "@/components/mobile/mobile-kpi-card";
import { DollarSignIcon, UsersIcon, ShoppingCartIcon } from "@/components/ui/icons";

const meta = {
  title: "Mobile/MobileKPICard",
  component: MobileKPICard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Revenue",
    value: "$45,231",
    change: "+20.1%",
    changeType: "positive",
    icon: DollarSignIcon,
  },
} satisfies Meta<typeof MobileKPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {};

export const Negative: Story = {
  args: {
    title: "Sales",
    value: "+12,234",
    change: "-2.5%",
    changeType: "negative",
    icon: ShoppingCartIcon,
  },
};

export const Neutral: Story = {
  args: {
    title: "Users",
    value: "2,350",
    change: "0%",
    changeType: "neutral",
    icon: UsersIcon,
  },
};

export const NoChange: Story = {
  args: {
    title: "Signups",
    value: "284",
    icon: UsersIcon,
  },
};

export const Stack: Story = {
  render: () => (
    <div className="max-w-sm space-y-4 p-4">
      <MobileKPICard
        title="Revenue"
        value="$45,231"
        change="+20.1%"
        changeType="positive"
        icon={DollarSignIcon}
      />
      <MobileKPICard
        title="Users"
        value="2,350"
        change="+12.5%"
        changeType="positive"
        icon={UsersIcon}
      />
      <MobileKPICard
        title="Sales"
        value="+12,234"
        change="-2.5%"
        changeType="negative"
        icon={ShoppingCartIcon}
      />
    </div>
  ),
};
