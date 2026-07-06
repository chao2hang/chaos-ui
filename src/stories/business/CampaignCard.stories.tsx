import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/business/campaign-card";
import type { CampaignCardProps } from "@/components/business/campaign-card";

const metrics = [
  { label: "Revenue", value: "$82.4K", helper: "+18% vs target" },
  { label: "CTR", value: "4.8%", helper: "Top quartile" },
  { label: "Audience", value: "124K", helper: "Qualified users" },
];

const defaultCampaign: CampaignCardProps = {
  name: "Spring pantry launch",
  description: "Lifecycle push for replenishment bundles and seasonal offers.",
  status: "active",
  channels: ["email", "push", "ads"],
  dateRange: "Jun 3 - Jun 24, 2026",
  budget: 42000,
  spent: 23800,
  metrics,
};

const meta = {
  title: "Business/CampaignCard",
  component: CampaignCard,
  tags: ["autodocs", "a11y"],
  args: defaultCampaign,
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        "draft",
        "scheduled",
        "active",
        "paused",
        "completed",
        "failed",
        "archived",
      ],
    },
  },
} satisfies Meta<typeof CampaignCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 lg:grid-cols-2">
      <CampaignCard
        {...defaultCampaign}
        name="Scheduled winback"
        status="scheduled"
        spent={0}
        channels={["email", "sms"]}
      />
      <CampaignCard
        {...defaultCampaign}
        name="Paid social scale-up"
        status="paused"
        spent={36800}
        channels={["social", "ads"]}
      />
      <CampaignCard
        {...defaultCampaign}
        name="Retail tasting recap"
        status="completed"
        spent={42000}
        channels={["offline", "email"]}
      />
      <CampaignCard
        {...defaultCampaign}
        name="Expired coupon cleanup"
        status="failed"
        spent={3100}
        channels={["push"]}
      />
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    ...defaultCampaign,
    actions: (
      <>
        <Button variant="outline">Pause</Button>
        <Button>Open report</Button>
      </>
    ),
  },
};
