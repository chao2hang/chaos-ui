import type { Meta, StoryObj } from "@storybook/react";
import { MobilePageHeader } from "@/components/mobile/mobile-page-header";
import { MobileButton } from "@/components/mobile/mobile-button";

const meta = {
  title: "Mobile/MobilePageHeader",
  component: MobilePageHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobilePageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  args: {
    title: "Dashboard",
    description: "Today",
  },
};

export const WithBack: Story = {
  args: {
    title: "Order details",
    description: "ORD-001",
    onBack: noop,
  },
};

export const WithActions: Story = {
  args: {
    title: "Team",
    description: "3 members",
    onBack: noop,
    actions: <MobileButton size="sm">Invite</MobileButton>,
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: "Report",
    breadcrumbItems: [
      { label: "Dashboard", href: "#dashboard" },
      { label: "Reports", href: "#reports" },
      { label: "Q3 summary" },
    ],
  },
};
