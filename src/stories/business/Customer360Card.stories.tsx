import type { Meta, StoryObj } from "@storybook/react";
import { Customer360Card } from "@/components/business/customer-360-card";

const meta = {
  title: "Business/Customer360Card",
  component: Customer360Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Customer360Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Platinum: Story = {
  args: {
    name: "Acme Corporation",
    industry: "Manufacturing & Industrial",
    tier: "platinum",
    healthScore: 92,
    tags: ["VIP", "Enterprise", "Strategic Partner"],
    lifetimeValue: 18500000,
    currencySymbol: "¥",
    metrics: [
      { label: "Total Orders", value: 156, trend: "up", delta: "+12%" },
      { label: "Open Tickets", value: 3, trend: "down", delta: "-2" },
      { label: "Avg Order", value: "¥125K", trend: "flat", delta: "0%" },
      { label: "Satisfaction", value: "4.8/5", trend: "up", delta: "+0.3" },
    ],
    contacts: [
      { id: "c1", name: "John Smith", title: "Chief Financial Officer", phone: "+86-138-0000-0001", email: "john.smith@acme.com", isPrimary: true },
      { id: "c2", name: "Jane Doe", title: "Procurement Manager", phone: "+86-138-0000-0002", email: "jane.doe@acme.com" },
    ],
    activities: [
      { id: "a1", type: "order", title: "Order #ORD-2026-001", date: "2026-06-28", description: "¥1,280,000 annual supply contract" },
      { id: "a2", type: "meeting", title: "Q3 Planning Meeting", date: "2026-06-25", description: "Discussed expansion to 3 new product lines" },
      { id: "a3", type: "ticket", title: "Support #TK-456", date: "2026-06-20", description: "Login issue — resolved within 2 hours" },
      { id: "a4", type: "call", title: "Quarterly Review Call", date: "2026-06-15", description: "Client expressed strong satisfaction" },
    ],
  },
};

export const Gold: Story = {
  args: {
    ...Platinum.args,
    name: "Globex Industries",
    tier: "gold",
    healthScore: 74,
    tags: ["Growing Account"],
    lifetimeValue: 5600000,
  },
};

export const AtRisk: Story = {
  args: {
    name: "Initech LLC",
    industry: "IT Services",
    tier: "silver",
    healthScore: 28,
    tags: ["At Risk", "Needs Attention"],
    lifetimeValue: 890000,
    metrics: [
      { label: "Total Orders", value: 23, trend: "down", delta: "-45%" },
      { label: "Open Tickets", value: 7, trend: "up", delta: "+4" },
      { label: "Last Order", value: "82 days ago", trend: "down", delta: "Stale" },
      { label: "Satisfaction", value: "3.2/5", trend: "down", delta: "-1.1" },
    ],
    activities: [
      { id: "a1", type: "ticket", title: "Complaint #TK-789", date: "2026-06-28", description: "Delivery delay complaint — escalated" },
      { id: "a2", type: "email", title: "Contract renewal email", date: "2026-06-20", description: "Sent renewal proposal — no response" },
    ],
  },
};

export const NewCustomer: Story = {
  args: {
    name: "New Startup Inc",
    industry: "Technology",
    tier: "bronze",
  },
};
