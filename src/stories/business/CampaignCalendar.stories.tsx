import type { Meta, StoryObj } from "@storybook/react";
import { CampaignCalendar } from "@/components/business/campaign-calendar";
import type { CampaignCalendarEvent } from "@/components/business/campaign-calendar";

const june2026 = new Date(2026, 5, 1);

const events: CampaignCalendarEvent[] = [
  {
    id: "brief",
    name: "Creative brief due",
    date: "2026-06-02",
    status: "scheduled",
    channel: "email",
  },
  {
    id: "vip",
    name: "VIP early access",
    date: "2026-06-05",
    status: "active",
    channel: "sms",
  },
  {
    id: "social",
    name: "Social teaser",
    date: "2026-06-08",
    status: "active",
    channel: "social",
  },
  {
    id: "push",
    name: "Push reminder",
    date: "2026-06-10",
    status: "paused",
    channel: "push",
  },
  {
    id: "ads",
    name: "Search ads ramp",
    date: "2026-06-16",
    status: "scheduled",
    channel: "ads",
  },
  {
    id: "wrap",
    name: "Wrap-up report",
    date: "2026-06-26",
    status: "completed",
    channel: "email",
  },
];

const denseEvents: CampaignCalendarEvent[] = [
  ...events,
  {
    id: "d1",
    name: "Homepage hero",
    date: "2026-06-10",
    status: "active",
    channel: "email",
  },
  {
    id: "d2",
    name: "Influencer post",
    date: "2026-06-10",
    status: "scheduled",
    channel: "social",
  },
  {
    id: "d3",
    name: "Cart abandoner",
    date: "2026-06-10",
    status: "draft",
    channel: "email",
  },
  {
    id: "d4",
    name: "Store demo kit",
    date: "2026-06-10",
    status: "archived",
    channel: "offline",
  },
];

const meta = {
  title: "Business/CampaignCalendar",
  component: CampaignCalendar,
  tags: ["autodocs", "a11y"],
  args: {
    month: june2026,
    events,
  },
} satisfies Meta<typeof CampaignCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  args: {
    month: june2026,
    events: denseEvents,
  },
};
