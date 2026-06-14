import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CampaignStatusTag } from "@/components/business/campaign-status-tag"
import type { CampaignStatus } from "@/components/business/campaign-status-tag"

const statuses: CampaignStatus[] = [
  "draft",
  "scheduled",
  "active",
  "paused",
  "completed",
  "failed",
  "archived",
]

const meta = {
  title: "Business/CampaignStatusTag",
  component: CampaignStatusTag,
  tags: ["autodocs", "a11y"],
  argTypes: {
    status: {
      control: { type: "select" },
      options: statuses,
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default"],
    },
  },
} satisfies Meta<typeof CampaignStatusTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: "active",
  },
}

export const Variants: Story = {
  args: {
    status: "active",
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <CampaignStatusTag key={status} status={status} />
      ))}
    </div>
  ),
}

export const Compact: Story = {
  args: {
    status: "active",
    size: "sm",
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <CampaignStatusTag key={status} status={status} size="sm" />
      ))}
    </div>
  ),
}

