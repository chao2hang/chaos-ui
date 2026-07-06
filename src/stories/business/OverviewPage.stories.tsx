import type { Meta, StoryObj } from "@storybook/react";
import { OverviewPage } from "@/components/business/overview-page";

const meta = {
  title: "Business/Nav/OverviewPage",
  component: OverviewPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof OverviewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Dashboard",
    subtitle: "Welcome back",
    kpis: [
      { label: "Revenue", value: 45231, delta: 12.5, unit: "USD" },
      { label: "Users", value: 2350, delta: 8.3 },
      { label: "Orders", value: 482, delta: -3.1, unit: "orders" },
    ],
    activities: [
      { id: "1", text: "Alice submitted an expense report.", time: "10 min ago" },
      { id: "2", text: "Bob approved invoice INV-001.", time: "1 hr ago" },
      { id: "3", text: "System update completed.", time: "3 hrs ago" },
    ],
    children: <div className="p-4 text-sm text-muted-foreground">Additional content area</div>,
  },
};

export const Minimal: Story = {
  args: { title: "Overview" },
};
