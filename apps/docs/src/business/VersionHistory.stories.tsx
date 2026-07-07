import type { Meta, StoryObj } from "@storybook/react";
import { VersionHistory } from "@/components/business/version-history";

const meta = {
  title: "Business/VersionHistory",
  component: VersionHistory,
  tags: ["autodocs"],
} satisfies Meta<typeof VersionHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
