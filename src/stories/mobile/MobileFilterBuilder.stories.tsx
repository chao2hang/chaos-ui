import type { Meta, StoryObj } from "@storybook/react";
import { MobileFilterBuilder } from "@/components/mobile/mobile-filter-builder";

const meta = {
  title: "Mobile/MobileFilterBuilder",
  component: MobileFilterBuilder,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileFilterBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fields: [
      { key: "status", label: "Status" },
      { key: "owner", label: "Owner" },
      { key: "budget", label: "Budget" },
    ],
  },
};

export const ManyFields: Story = {
  args: {
    fields: [
      { key: "campaign", label: "Campaign" },
      { key: "channel", label: "Channel" },
      { key: "audience", label: "Audience" },
      { key: "spend", label: "Spend" },
      { key: "roas", label: "ROAS" },
    ],
  },
};

export const SingleField: Story = {
  args: {
    fields: [{ key: "status", label: "Status" }],
  },
};
