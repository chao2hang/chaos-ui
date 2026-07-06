import type { Meta, StoryObj } from "@storybook/react";
import { PullToRefresh as MobilePullToRefresh } from "@/components/mobile/mobile-pull-to-refresh";
import { MobilePageHeader } from "@/components/mobile/mobile-page-header";
import { MobileCard } from "@/components/mobile/mobile-card";

const noop = () => Promise.resolve();

const meta = {
  title: "Mobile/MobilePullToRefresh",
  component: MobilePullToRefresh,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onRefresh: noop },
} satisfies Meta<typeof MobilePullToRefresh>;

export default meta;
type Story = StoryObj<typeof meta>;

const activityItems = [
  "Creative approved",
  "Budget updated",
  "Segment synced",
  "Report exported",
];

export const Default: Story = {
  render: () => (
    <MobilePullToRefresh
      className="h-[520px] rounded-lg border"
      onRefresh={() => new Promise((resolve) => setTimeout(resolve, 600))}
    >
      <MobilePageHeader title="Activity" description="Pull down on touch devices" />
      <div className="space-y-2 p-4">
        {activityItems.map((item) => (
          <MobileCard key={item} title={item} description="Just now">
            <p className="text-sm text-muted-foreground">
              Activity item synced successfully.
            </p>
          </MobileCard>
        ))}
      </div>
    </MobilePullToRefresh>
  ),
};

export const Instant: Story = {
  render: () => (
    <MobilePullToRefresh className="h-[480px] rounded-lg border" onRefresh={noop}>
      <div className="p-4 space-y-2">
        {activityItems.map((item) => (
          <MobileCard key={item} title={item} description="Instant refresh">
            <p className="text-sm">Item body</p>
          </MobileCard>
        ))}
      </div>
    </MobilePullToRefresh>
  ),
};

export const Disabled: Story = {
  render: () => (
    <MobilePullToRefresh
      className="h-[440px] rounded-lg border"
      onRefresh={noop}
      disabled
    >
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          Refresh is disabled — pulling does nothing.
        </p>
      </div>
    </MobilePullToRefresh>
  ),
};

export const CustomTexts: Story = {
  render: () => (
    <MobilePullToRefresh
      className="h-[460px] rounded-lg border"
      onRefresh={() => new Promise((r) => setTimeout(r, 800))}
      pullText="Drag to refresh"
      releaseText="Release now"
      refreshingText="Updating..."
    >
      <div className="p-4 space-y-2">
        {activityItems.map((item) => (
          <MobileCard key={item} title={item}>
            <p className="text-sm">Item body</p>
          </MobileCard>
        ))}
      </div>
    </MobilePullToRefresh>
  ),
};
