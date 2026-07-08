import type { Meta, StoryObj } from "@storybook/react";
import { MobileShareSheet } from "@/components/mobile/mobile-share-sheet";

const meta: Meta<typeof MobileShareSheet> = {
  title: "Mobile/MobileShareSheet",
  component: MobileShareSheet,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
