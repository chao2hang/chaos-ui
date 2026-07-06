import type { Meta, StoryObj } from "@storybook/react";
import { MobileDashboardLayout } from "@/components/mobile/mobile-dashboard-layout";
import { MobileKPICard } from "@/components/mobile/mobile-kpi-card";
import { MobileButton } from "@/components/mobile/mobile-button";
import { DollarSignIcon, UsersIcon } from "@/components/ui/icons";

const meta = {
  title: "Mobile/MobileDashboardLayout",
  component: MobileDashboardLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MobileDashboardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  args: {
    title: "Dashboard",
    description: "Welcome back",
    children: (
      <div className="space-y-4">
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
      </div>
    ),
  },
};

export const WithBack: Story = {
  args: {
    title: "Reports",
    description: "Q3 highlights",
    onBack: noop,
    children: <p className="p-4 text-sm text-muted-foreground">Report body</p>,
  },
};

export const WithActions: Story = {
  args: {
    title: "Team",
    description: "3 members",
    onMenu: noop,
    actions: <MobileButton size="sm">Invite</MobileButton>,
    children: <p className="p-4 text-sm text-muted-foreground">Team list</p>,
  },
};
