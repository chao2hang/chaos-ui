import type { Meta, StoryObj } from "@storybook/react";
import { MobileBottomNav } from "@/components/mobile/mobile-bottom-nav";
import {
  HomeIcon,
  InboxIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "@/components/ui/icons";

const meta = {
  title: "Mobile/MobileBottomNav",
  component: MobileBottomNav,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { items: [] },
} satisfies Meta<typeof MobileBottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

const baseItems = [
  { label: "Home", href: "#home", icon: <HomeIcon className="size-5" />, active: true },
  { label: "Inbox", href: "#inbox", icon: <InboxIcon className="size-5" />, badge: 3 },
  { label: "Reports", href: "#reports", icon: <LayoutDashboardIcon className="size-5" /> },
  { label: "Settings", href: "#settings", icon: <SettingsIcon className="size-5" /> },
];

export const Default: Story = {
  render: () => (
    <div className="relative h-[560px] overflow-hidden rounded-lg border bg-background">
      <div className="p-4 pb-20">
        <p className="text-sm text-muted-foreground">
          Bottom navigation remains fixed at the viewport edge.
        </p>
      </div>
      <MobileBottomNav className="absolute md:flex" items={baseItems} onChange={noop} />
    </div>
  ),
};

export const Floating: Story = {
  render: () => (
    <div className="relative h-[560px] overflow-hidden rounded-lg border bg-background">
      <div className="p-4 pb-24">
        <p className="text-sm text-muted-foreground">Floating variant lifts off the edge.</p>
      </div>
      <MobileBottomNav
        className="absolute md:flex"
        items={baseItems}
        onChange={noop}
        variant="floating"
      />
    </div>
  ),
};

export const NoBadges: Story = {
  render: () => (
    <div className="relative h-[560px] overflow-hidden rounded-lg border bg-background">
      <div className="p-4 pb-20">
        <p className="text-sm text-muted-foreground">No badge counters.</p>
      </div>
      <MobileBottomNav
        className="absolute md:flex"
        items={baseItems.map(({ badge: _b, ...rest }) => rest)}
        onChange={noop}
      />
    </div>
  ),
};
