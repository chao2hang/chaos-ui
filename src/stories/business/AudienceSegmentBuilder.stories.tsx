import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AudienceSegmentBuilder } from "@/components/business/audience-segment-builder"
import type { AudienceSegmentBuilderProps } from "@/components/business/audience-segment-builder"
import type { TransferItem } from "@/components/business/transfer"

const fields = [
  { key: "lifetime_value", label: "Lifetime value" },
  { key: "last_order_days", label: "Days since last order" },
  { key: "preferred_category", label: "Preferred category" },
  { key: "region", label: "Region" },
]

const segments: TransferItem[] = [
  { key: "vip", label: "VIP customers", description: "Top 5% by annual spend" },
  { key: "at-risk", label: "At-risk repeat buyers", description: "No order in 45+ days" },
  { key: "new", label: "New subscribers", description: "Joined in the last 14 days" },
  { key: "retail", label: "Retail event attendees", description: "Scanned at offline events" },
  { key: "coupon", label: "Coupon redeemers", description: "Used promo in last campaign" },
]

function InteractiveSegmentBuilder(args: AudienceSegmentBuilderProps) {
  const [selectedKeys, setSelectedKeys] = useState(args.selectedSegmentKeys ?? ["vip"])
  const [filterSummary, setFilterSummary] = useState("No rule filters yet.")

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <AudienceSegmentBuilder
        {...args}
        selectedSegmentKeys={selectedKeys}
        onSegmentsChange={setSelectedKeys}
        onFiltersChange={(result) =>
          setFilterSummary(`${result.logic} with ${result.filters.length} rule filter(s)`)
        }
      />
      <div className="rounded-xl border bg-muted/30 p-4 text-sm">
        <div className="font-medium">Live selection</div>
        <p className="mt-2 text-muted-foreground">
          Segments: {selectedKeys.join(", ") || "none"}
        </p>
        <p className="mt-2 text-muted-foreground">{filterSummary}</p>
      </div>
    </div>
  )
}

const meta = {
  title: "Business/AudienceSegmentBuilder",
  component: AudienceSegmentBuilder,
  tags: ["autodocs", "a11y"],
  args: {
    fields,
    segments,
    selectedSegmentKeys: ["vip"],
    estimatedSize: 48200,
  },
} satisfies Meta<typeof AudienceSegmentBuilder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <InteractiveSegmentBuilder {...args} />,
}

export const Variants: Story = {
  render: (args) => (
    <InteractiveSegmentBuilder
      {...args}
      selectedSegmentKeys={["at-risk", "coupon"]}
      estimatedSize={12840}
    />
  ),
}

