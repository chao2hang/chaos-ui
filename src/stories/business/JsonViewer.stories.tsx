import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { JsonViewer } from "@/components/business/json-viewer"

const campaignPayload = {
  id: "cmp_2026_summer_launch",
  name: "Summer launch",
  status: "scheduled",
  budget: 24000,
  active: true,
  channels: ["email", "sms", "ads"],
  audience: {
    segment: "high-value",
    size: 18420,
    filters: {
      lifetimeValue: { gte: 500 },
      lastPurchaseDays: { lte: 45 },
      consent: true,
    },
  },
  schedule: {
    timezone: "Asia/Shanghai",
    startsAt: "2026-06-18T09:00:00+08:00",
    endsAt: null,
  },
}

const meta = {
  title: "Business/JsonViewer",
  component: JsonViewer,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof JsonViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: campaignPayload,
  },
}

export const Collapsed: Story = {
  args: {
    data: campaignPayload,
    defaultCollapsedDepth: 1,
  },
}

export const WithoutCopy: Story = {
  args: {
    data: campaignPayload,
    showCopy: false,
  },
}

export const ArrayData: Story = {
  args: {
    data: [
      { step: "Draft", completed: true },
      { step: "Review", completed: true },
      { step: "Schedule", completed: false },
    ],
  },
}

export const Primitive: Story = {
  args: {
    data: "scheduled",
  },
}

