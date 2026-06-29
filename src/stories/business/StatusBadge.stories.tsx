import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "@/components/business/status-badge";

const meta = {
  title: "Business/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs", "a11y"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj;

export const BizPreset: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge value="draft" preset="biz" />
      <StatusBadge value="pending" preset="biz" />
      <StatusBadge value="approved" preset="biz" />
      <StatusBadge value="rejected" preset="biz" />
      <StatusBadge value="inactive" preset="biz" />
    </div>
  ),
};

export const ActiveInactive: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge value={1} preset="active-inactive" />
      <StatusBadge value={0} preset="active-inactive" />
      <StatusBadge value="active" preset="active-inactive" />
      <StatusBadge value="inactive" preset="active-inactive" />
    </div>
  ),
};

export const OpenClosed: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge value="open" preset="open-closed" />
      <StatusBadge value="closed" preset="open-closed" />
      <StatusBadge value="done" preset="open-closed" />
      <StatusBadge value="todo" preset="open-closed" />
    </div>
  ),
};

export const CustomMapping: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge
        value={1}
        mapping={{ 1: ["激活", "success"], 0: ["停用", "default"] }}
      />
      <StatusBadge
        value={0}
        mapping={{ 1: ["激活", "success"], 0: ["停用", "default"] }}
      />
      <StatusBadge
        value="vip"
        mapping={{ vip: ["VIP", "gold"], normal: ["普通", "cyan"] }}
      />
    </div>
  ),
};

export const PresetWithOverride: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge value="draft" preset="biz" />
      <StatusBadge
        value="archived"
        preset="biz"
        mapping={{ archived: ["归档", "gold"] }}
      />
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge value="approved" preset="biz" dot />
      <StatusBadge value="pending" preset="biz" dot />
    </div>
  ),
};

export const UnknownValue: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge value="some-unknown-status" preset="biz" />
    </div>
  ),
};
